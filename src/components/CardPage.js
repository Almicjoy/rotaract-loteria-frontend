import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CardPage = () => {
  const { id } = useParams(); // Capture the card ID from the URL
  const [cardImages, setCardImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImages, setSelectedImages] = useState({}); // Track selected images

  // Fetch the card images from the backend
  useEffect(() => {
    const fetchCardImages = async () => {
      try {
        const response = await fetch(`https://rotaract-loteria-backend-3c90567e12a3.herokuapp.com/api/card/${id}`);
        const data = await response.json();
        if (data.images) {
          console.log(data.images)
          setCardImages(data.images); // Store the images
        } else {
          throw new Error("Card images not found");
        }
      } catch (error) {
        console.error("Error fetching the card images:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCardImages();
  }, [id]); // Fetch new images if the ID changes

  // Handle image click to toggle selection
  const handleImageClick = (imageUrl) => {
    setSelectedImages((prevSelected) => ({
      ...prevSelected,
      [imageUrl]: !prevSelected[imageUrl], // Toggle the selection
    }));
  };

  

  return (
    <div>
      <h1>Ready to Play?</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {cardImages.length > 0 ? (
            <div>
              <h3>Your Generated Card</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px" }}>
                {cardImages.map((image, index) => (
                  <div
                    key={index}
                    style={{
                      position: "relative",
                      cursor: "pointer",
                      opacity: selectedImages[image] ? 0.5 : 1, // Apply greyed-out effect
                    }}
                    onClick={() => handleImageClick(image)} // Toggle image selection
                  >
                    <img
                      src={image}
                      alt={`Card Image ${index}`}
                      style={{
                        width: "100%",
                        filter: selectedImages[image] ? "grayscale(100%)" : "none", // Apply grayscale on selected images
                      }}
                    />
                    {selectedImages[image] && (
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
          ) : (
            <p>No images available for this card.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CardPage;
