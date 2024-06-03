import styles from './Inicio.module.css'

const Inicio = () => {
  return (
    <div className={styles.container}>
      <div className={styles.container_portada}>
        <div>
          <h1 className={styles.title}>Nuestro espacio</h1>
          <h1 className={styles.title}>para vos</h1>
        </div>
      </div>
    </div>

  )
}

export default Inicio