// ServicioForm.js
import React from 'react';
import { useContext } from 'react';
import styles from '../panel.module.css'
import axios from 'axios';
import Context from "../../../../context/context.jsx";

const ServicioForm = () => {

    const { authToken, usuario } = useContext(Context);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = new FormData(e.target);
        const formData = {
            titulo: form.get('titulo'),
            descripcion: form.get('descripcion'),
            imagen: form.get('imagen'),
            disponible: true,
            fecha: form.get('fecha'),
            hora: form.get('hora'),
            categoria: form.get('categoria'),
        };

        try {
            const response = await axios.post('http://127.0.0.1:3000/servicios', formData,
                {
                    headers: {
                        authorization: 'Bearer ' + authToken
                    }
                }
            );
            console.log('Servicio creado:', response.data);
            console.log(usuario.listaServicios)
        } catch (error) {
            console.error('Error al crear el servicio:', error);
        }
    };

    return (
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.card_info}>
                    <div className={styles.img_servicio}>
                        <input type="text" name="imagen" placeholder='Imágen' required className={styles.input_img} />
                    </div>
                    <div className={styles.inputs_textContainer}>
                        <div className={styles.inputs_conjunto}>
                            <div className={styles.div_inputs}> 
                                <input type="text" name="titulo" placeholder='Título' required className={styles.inputs} />
                            </div>
                            <div  className={styles.div_inputs}>
                                <input type="text" name="fecha" placeholder='Fecha (DD/MM/AAAA)' required className={styles.inputs} />
                            </div>
                            <div  className={styles.div_inputs}>
                                <input type="text" name="hora" placeholder='Hora (HH:MM-HH:MM)' required className={styles.inputs} />
                            </div>

                        </div>
                        <div>
                            <input type="text" name="descripcion" placeholder='Descripción' required className={styles.inputs} />
                        </div>
                        <div>
                            <select name="categoria" className={styles.inputs}>
                                <option value='' selected disabled>Categoría</option>
                                <option value="Oficinas">Oficinas</option>
                                <option value="Salas">Salas</option>
                                <option value="Eventos">Eventos</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className={styles.btn_container}>
                    <button type="submit" className={styles.btn}>Crear</button>
                </div>
            </form>
    );
};

export default ServicioForm;
