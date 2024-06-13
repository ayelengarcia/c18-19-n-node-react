import React from "react";
import { useEffect, useState } from "react";
import ImageUploader from "../../FileInput/ImageUploader";

export const Usuario = ({ userId }) => {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    // Obtener la URL de la imagen del usuario desde el backend
    const fetchImage = async () => {
      try {
        const response = await fetch(`http://localhost:3000/user/${userId}`);
        const data = await response.json();
        setImageUrl(data.imageUrl);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    fetchImage();
  }, [userId]);

  return (
    <>
      <ImageUploader userId={userId} />
      <div>{imageUrl ? <img src={imageUrl} alt="User Avatar" /> : <p>No image uploaded</p>}</div>
    </>
  );
};
