import ImageUploader from "./ImageUploader";
import { useContext, useState } from "react";
import Context from "../../../../context/context";
import styles from "../panel.module.css"
import { LiaUserEditSolid } from "react-icons/lia";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { Button, Stack } from '@chakra-ui/react'


const NavVertical = () => {
  const { usuario, authToken } = useContext(Context);

  const [show, setShow] = useState(false);

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false)


  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    edad: ''
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.nombre || !formData.apellido || !formData.edad) {
      setError('Todos los campos son obligatorios');
      return;
    }
    setIsLoading(true)

    try {
      const response = await axios.put(`http://127.0.0.1:3000/user/${usuario._id}`, formData,{
        headers: {
          authorization: 'Bearer ' + authToken
        }
      });
      console.log('Usuario actualizado:', response.data);
      console.log(response);
      handleClose();
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
    } finally {
      setIsLoading(false)
    }
  };

  return (
    <div className={styles.container_nav}>
      <LiaUserEditSolid size={25} className={styles.edit} onClick={handleShow} />

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Editar datos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className={styles.text_left}>Nuevo nombre</Form.Label>
              <Form.Control
                name="nombre"
                value={formData.nombre}
                type="text"
                placeholder={usuario.nombre}
                autoFocus
                onChange={handleChange} 
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label className={styles.text_left}>Nuevo apellido</Form.Label>
              <Form.Control
                name="apellido"
                value={formData.apellido}
                type="text"
                placeholder={usuario.apellido ? usuario.apellido : 'Apellido'}
                onChange={handleChange} 
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
              <Form.Label className={styles.text_left}>Nueva edad</Form.Label>
              <Form.Control
                name="edad"
                value={formData.edad}
                type="number"
                placeholder={usuario.edad ? usuario.edad : 'Edad'}
                onChange={handleChange} 
              />
            </Form.Group>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <Stack>
                <Button
                  isLoading={isLoading}
                  loadingText='Cargando datos'
                  colorScheme='teal'
                  variant='outline'
                  spinnerPlacement='end'
                  type='submit'
                  className={styles.btn_put_data}
                >
                  Confirmar reserva
                </Button>
              </Stack>
          </Form>
        </Modal.Body>
      </Modal>
      <ImageUploader />

      <div className={styles.container_more_info}>
        <div className={styles.more_info}>
          <div><b>Email:</b> {usuario.email}</div>
          <div><b>Edad:</b> {usuario.edad}</div>
          <div><b>Teléfono:</b> {usuario.telefono}</div>
        </div>
      </div>
    </div>
  );
};

export default NavVertical;