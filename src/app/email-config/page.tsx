'use client';

import { useState, useEffect } from 'react';

export default function EmailConfigPage() {
  const [formData, setFormData] = useState({
    emailAddress: '',
    connectionType: 'IMAP',
    username: '',
    password: '',
    host: '',
  });
  const [configs, setConfigs] = useState([]);
  const [pdfs, setPdfs] = useState([]);

  // Fetch email configurations
  useEffect(() => {
    fetch('/api/email-config')
      .then((response) => response.json())
      .then((data) => setConfigs(data));
  }, []);

  // Fetch PDF metadata
  useEffect(() => {
    fetch('/api/pdf-metadata')
      .then((response) => response.json())
      .then((data) => setPdfs(data));
  }, []);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/email-config', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert('Configuration saved successfully!');
        window.location.reload(); // Refresh the page to show the new configuration
      } else {
        alert('Failed to save configuration.');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred.');
    }
  };

  return (
    <div>
      <h1>Email Configuration</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email Address"
          value={formData.emailAddress}
          onChange={(e) => setFormData({ ...formData, emailAddress: e.target.value })}
          required
        />
        <select
          value={formData.connectionType}
          onChange={(e) => setFormData({ ...formData, connectionType: e.target.value })}
        >
          <option value="IMAP">IMAP</option>
          <option value="POP3">POP3</option>
          <option value="Gmail API">Gmail API</option>
        </select>
        <input
          type="text"
          placeholder="Username"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Host (optional)"
          value={formData.host}
          onChange={(e) => setFormData({ ...formData, host: e.target.value })}
        />
        <button type="submit">Save</button>
      </form>

      <h2>Saved Email Configurations</h2>
      <ul>
        {configs.map((config) => (
          <li key={config.id}>
            {config.emailAddress} - {config.connectionType}
          </li>
        ))}
      </ul>

      <h2>Downloaded PDFs</h2>
      <ul>
        {pdfs.map((pdf) => (
          <li key={pdf.id}>
            <strong>{pdf.attachmentFileName}</strong> - {pdf.fromAddress} ({pdf.dateReceived})
          </li>
        ))}
      </ul>
    </div>
  );
}