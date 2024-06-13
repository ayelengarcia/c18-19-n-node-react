import { useRef, useContext, useState } from "react";
import axios from 'axios';
import Context from "../../../../context/context.jsx";
import styles from "../panel.module.css"

const ImageUploader = () => {
  const { authToken, usuarioId, usuario } = useContext(Context);
  const [imageUrl, setImageUrl] = useState(usuario.imagenUrl);
  const inputFile = useRef(null);

  if (!usuario) {
    return <div>Loading...</div>;
  }

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
      setImageUrl(response.data.imagenUrl);
      console.log('Respuesta:', response.data);
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
    }
  };

  return (
    <>
      {imageUrl ? (
        <>
          <img src={imageUrl} alt="Uploaded avatar" className={styles.img_user} />
        </>
      ) : (
        <>
          <img src="/user-profile-unloggin.png" alt="Null avatar" className={styles.img_user} />
        </>
      )}

      <form id="uploadForm" onSubmit={handleSubmit}>
        <input type="file" ref={inputFile} name="avatar" />
        <br />
        <br />
        <input type="submit" value="Cargar imagen" />
      </form>
    </>
  );
};

export default ImageUploader;



/* MÉTODO SIN MULTER PASANDO A BASE64 LAS IMAGENES:

const [postImage, setPostImage] = useState({
  myFile: "",
});

const url = "http://localhost:3000/uploads";

const createImage = (newImage) => axios.post(url, newImage);

const createPost = async (post) => {
  try {
    await createImage(post);
  } catch (error) {
    console.log(error.message);
  }
};

const handleSubmit = (e) => {
  e.preventDefault();
  createPost(postImage);
};

const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};
const handleFileUpload = async (e) => {
  const file = e.target.files[0];
  const base64 = await convertToBase64(file);
  setPostImage({ ...postImage, myFile: base64 });
};

<div>
  <form onSubmit={handleSubmit}>
    <input type="file" label="Image" name="myFile" accept=".jpeg, .png, .jpg" onChange={(e) => handleFileUpload(e)} />

    <button>Submit</button>
  </form>
</div>; */
