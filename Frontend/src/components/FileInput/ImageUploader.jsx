import { useRef, useContext } from "react";
import axios from 'axios';
import Context from "../../context/context.jsx";

const ImageUploader = () => {
  const { authToken, usuarioId } = useContext(Context);
  const inputFile = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const file = inputFile.current.files[0];

    const data = {
      avatar: file,
      token: authToken,
      usuarioId: usuarioId
    }

    try {
      const response = await axios.post("http://localhost:3000/upload", data, {
        headers: {
          'Authorization': 'Bearer ' + authToken,
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Respuesta:', response.data);
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
    }
  };

  return (
    <>
      <p id="feedback-message"></p>

      <form id="uploadForm" onSubmit={handleSubmit}>
        <label htmlFor="File">File: </label>

        <input type="file" ref={inputFile} name="avatar" />
        <br />
        <br />
        <input type="submit" value="Upload File" />
      </form>
    </>
  );
};

export default ImageUploader;