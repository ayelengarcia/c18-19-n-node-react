import React from 'react'
import styles from './ServicioDetail.module.css'
import { TiArrowBack } from "react-icons/ti";
import { useNavigate } from 'react-router-dom';

export const BtnBack = () => {
    const navigate = useNavigate();

    const handleClickBack = () => {
        navigate(-1)
    }
    return (
        <button
            onClick={handleClickBack}
            className={styles.volver}>
            <TiArrowBack size={22} style={{ marginRight: '.2rem' }}
            />
            Volver
        </button>
    )
}
