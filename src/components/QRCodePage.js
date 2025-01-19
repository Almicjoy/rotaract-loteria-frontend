import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import axios from 'axios';
import './QRCodePage.css'; // External CSS for styling
import logo from '../assets/logo.png'

const QRCodePage = () => {
  const [cardUrl, setCardUrl] = useState('');

  const generateQRCode = async () => {
    try {
      const response = await axios.get('https://rotaract-loteria-backend-3c90567e12a3.herokuapp.com/api/generate');
      setCardUrl(response.data.cardUrl);
    } catch (error) {
      console.error('Error generating card:', error);
    }
  };

  return (
    <div className="qr-code-page">
      <header className="header">
        <img src={logo} alt="Logo" className="logo" /> {/* Use the imported logo */}
      </header>
      <main className="main-content">
        <h1>Generate Lotería Card QR Code</h1>
        <button className="generate-btn" onClick={generateQRCode}>
          Generate QR Code
        </button>
        {cardUrl && (
          <div className="qr-container">
            <p className="qr-text">Scan the QR Code to view your card:</p>
            <QRCodeCanvas value={cardUrl} size={256} className="qr-code" />
            <p className="qr-link">
              Or visit: <a href={cardUrl} target="_blank" rel="noopener noreferrer">{cardUrl}</a>
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default QRCodePage;
