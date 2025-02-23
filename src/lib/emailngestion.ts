import { ImapFlow } from 'imapflow';
import fs from 'fs';
import path from 'path';
import prisma from './prisma';

const client = new ImapFlow({
  host: 'imap.example.com', // Replace with your email host
  port: 993,
  secure: true,
  auth: {
    user: 'your-email@example.com', // Replace with your email
    pass: 'your-password', // Replace with your password
  },
});

export async function checkEmails() {
  try {
    await client.connect();

    // Open the inbox
    const lock = await client.getMailboxLock('INBOX');
    try {
      // Fetch unseen emails
      for await (const message of client.fetch('1:*', { envelope: true, bodyStructure: true })) {
        const { subject, from, date } = message.envelope;
        const attachments = message.attachments;

        // Check for PDF attachments
        for (const attachment of attachments) {
          if (attachment.filename?.endsWith('.pdf')) {
            // Download the PDF
            const pdfStream = await client.download(attachment.part);
            const pdfPath = path.join(__dirname, '../pdfs', attachment.filename);
            const writeStream = fs.createWriteStream(pdfPath);
            pdfStream.pipe(writeStream);

            // Save metadata to the database
            await prisma.pDFMetadata.create({
              data: {
                fromAddress: from[0].address,
                dateReceived: new Date(date),
                subject: subject || 'No Subject',
                attachmentFileName: attachment.filename,
              },
            });

            console.log(Downloaded and saved: ${attachment.filename});
          }
        }
      }
    } finally {
      lock.release();
    }
  } catch (error) {
    console.error('Error checking emails:', error);
  } finally {
    await client.logout();
  }
}