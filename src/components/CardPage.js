import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CardPage = () => {
  const { id } = useParams(); // Capture the card ID from the URL
  const [cards, setCards] = useState([]); // Store multiple cards
  const [loading, setLoading] = useState(true);
  const [selectedImages, setSelectedImages] = useState({}); // Track selected images

  // Fetch the cards from the backend
  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch(`https://rotaract-loteria-backend-3c90567e12a3.herokuapp.com/api/card/${id}`);
        const data = await response.json();
        if (data.images) {
          console.log(data.images);
          setCards(data.images); // Store the card arrays
        } else {
          throw new Error("Cards not found");
        }
      } catch (error) {
        console.error("Error fetching the cards:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, [id]); // Fetch new cards if the ID changes

  // Handle image click to toggle selection
  const handleImageClick = (cardIndex, imageUrl) => {
    setSelectedImages((prevSelected) => ({
      ...prevSelected,
      [cardIndex]: {
        ...prevSelected[cardIndex],
        [imageUrl]: !prevSelected[cardIndex]?.[imageUrl], // Toggle the selection
      },
    }));
  };

  return (
    <div>
      <h1>Ready to Play?</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {cards.length > 0 ? (
            cards.map((cardImages, cardIndex) => (
              <div key={cardIndex} style={{ marginBottom: "20px" }}>
                <h3>Card {cardIndex + 1}</h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px" }}>
                  {cardImages.map((image, imageIndex) => (
                    <div
                      key={imageIndex}
                      style={{
                        position: "relative",
                        cursor: "pointer",
                        opacity: selectedImages[cardIndex]?.[image] ? 0.5 : 1, // Apply greyed-out effect
                      }}
                      onClick={() => handleImageClick(cardIndex, image)} // Toggle image selection
                    >
                      <img
                        src={image}
                        alt={`Card ${cardIndex} Image ${imageIndex}`}
                        style={{
                          width: "100%",
                          filter: selectedImages[cardIndex]?.[image] ? "grayscale(100%)" : "none", // Apply grayscale on selected images
                        }}
                      />
                      {selectedImages[cardIndex]?.[image] && (
                        <div
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: "rgba(0, 0, 0, 0.5)", // Overlay effect when selected
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            color: "white",
                            fontWeight: "bold",
                          }}
                        >
                          Selected
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p>No cards available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CardPage;
