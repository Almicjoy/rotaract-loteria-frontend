import React, { useEffect } from "react";

const ClearCards = ({ onClear }) => {
  useEffect(() => {
    const socket = new WebSocket("wss://rotaract-loteria-backend-3c90567e12a3.herokuapp.com");

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === "CLEAR_CARDS") {
        window.location.reload(); // Reload the page when notified
      }
    };

    return () => socket.close();
  }, []);

  const handleClearCards = async () => {
    try {
      const response = await fetch("https://rotaract-loteria-backend-3c90567e12a3.herokuapp.com/api/clear-cards", {
        method: "DELETE",
      });
      const data = await response.json();
      if (data.success) {
        alert("All cards have been cleared!");
        onClear(); // Notify parent component if needed
        window.location.reload();
      }
    } catch (error) {
      console.error("Error clearing the cards:", error);
    }
  };

  return (
    <button
      onClick={handleClearCards}
      style={{
        marginTop: "20px",
        padding: "10px 20px",
        background: "red",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
      }}
    >
      Clear All Cards
    </button>
  );
};

export default ClearCards;
