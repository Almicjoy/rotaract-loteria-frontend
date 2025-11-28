import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import axios from 'axios';
import './QRCodePage.css';
import logo from '../assets/logo.png';
import ClearCards from './ClearCards';

const QRCodePage = () => {
  const [cardUrl, setCardUrl] = useState('');
  const [cardCount, setCardCount] = useState(1); // Default to 1 card

  const generateQRCode = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/generate?count=${cardCount}`);
      setCardUrl(response.data.cardUrl); // Store the generated URL
    } catch (error) {
      console.error('Error generating cards:', error);
    }
  };

  return (
    <div className="qr-code-page">
      <header className="header">
        <img src={logo} alt="Logo" className="logo" />
      </header>
      <main className="main-content">
        <h1>Generate Lotería Card QR Code</h1>
        <div className="card-options">
          <label htmlFor="card-count">Number of Cards:</label>
          <select
            id="card-count"
            value={cardCount}
            onChange={(e) => setCardCount(Number(e.target.value))}
            className="card-count-select"
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
          </select>
        </div>
        <button className="generate-btn" onClick={generateQRCode}>
          Generate QR Code
        </button>
        {cardUrl && (
          <div className="qr-container">
            <p className="qr-text">Scan the QR Code to view your cards:</p>
            <QRCodeCanvas value={cardUrl} size={256} className="qr-code" />
            <p className="qr-link">
              Or visit: <a href={cardUrl} target="_blank" rel="noopener noreferrer">{cardUrl}</a>
            </p>
          </div>
        )}
      </main>
      <ClearCards />
    </div>
  );
};

export default QRCodePage;
