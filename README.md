# *Email & PDF Ingestion Project*

This project is a *Next.js application* that allows users to:
1. Configure email accounts (IMAP, POP3, Gmail API, etc.).
2. Automatically check for incoming emails with PDF attachments.
3. Download PDFs to a local folder (./pdfs/).
4. Store PDF metadata (sender, subject, date received, filename) in a PostgreSQL database.

---

## *Features*
- *Email Configuration*: Add, edit, and remove email accounts.
- *PDF Ingestion*: Automatically download PDF attachments from emails.
- *Metadata Storage*: Save PDF metadata in a database.
- *Simple UI*: View configured email accounts and downloaded PDFs.

---

## *Tech Stack*
- *Frontend*: Next.js (TypeScript)
- *Backend*: Node.js, Prisma (PostgreSQL)
- *Libraries*: imap, pdf-lib, node-cron
- *Database*: PostgreSQL

---

## *Prerequisites*
Before running the project, ensure you have the following installed:
1. *Node.js* (v18 or higher)
2. *PostgreSQL* (v14 or higher)
3. *Git* (optional, for version control)

---

## *Setup Instructions*

### *1. Clone the Repository*
bash
git clone https://github.com/your-username/email-pdf-ingestion.git
cd email-pdf-ingestion


### *2. Install Dependencies*
bash
npm install


### *3. Set Up PostgreSQL*
1. Create a new database:
   sql
   CREATE DATABASE email_pdf_ingestion;
   
2. Update the .env file with your database credentials:
   env
   DATABASE_URL="postgresql://your-username:your-password@localhost:5432/email_pdf_ingestion"
   

### *4. Run Prisma Migrations*
bash
npx prisma migrate dev --name init


### *5. Configure Email Accounts*
1. Open the application in your browser:
   
   http://localhost:3000/email-config
   
2. Add your email account details (e.g., Gmail, Outlook).

---

## *Running the Application*
1. Start the development server:
   bash
   npm run dev
   
2. Open your browser and go to:
   
   http://localhost:3000
   

---

## *Testing PDF Ingestion*
1. Send an email with a PDF attachment to the configured email account.
2. The app will automatically:
   - Download the PDF to the ./pdfs/ folder.
   - Save the PDF metadata in the database.
3. Verify the PDF and its metadata in the UI:
   
   http://localhost:3000/email-config
   

---

## *Project Structure*

email-pdf-ingestion/
├── .env
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── email-config/
│   │   │   │   └── route.ts
│   │   │   └── pdf-metadata/
│   │   │       └── route.ts
│   │   ├── email-config/
│   │   │   └── page.tsx
│   │   └── globals.css
│   ├── lib/
│   │   ├── emailIngestion.ts
│   │   └── prisma.ts
│   └── pdfs/
└── package.json


---

## *Environment Variables*
Create a .env file in the root of your project with the following variables:
env
DATABASE_URL="postgresql://your-username:your-password@localhost:5432/email_pdf_ingestion"


---

## *API Endpoints*
- **POST /api/email-config**: Save email configurations.
- **GET /api/email-config**: Fetch saved email configurations.
- **GET /api/pdf-metadata**: Fetch PDF metadata.

---

## *Dependencies*
- *Frontend*: Next.js, React
- *Backend*: Prisma, Node.js
- *Email Handling*: imap, nodemailer
- *PDF Handling*: pdf-lib

---

## *Contact*
For questions or feedback, please contact:
- *Gmail*: shivangchaudhary592@gmail.com
- *GitHub*: [shivang674](https://github.com/shivang674)

---
