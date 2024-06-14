import styles from './Footer.module.css'
import { Link } from 'react-router-dom'
import { PiInstagramLogoLight } from "react-icons/pi";
import { SlSocialFacebook } from "react-icons/sl";
import { RiTwitterXLine } from "react-icons/ri";

const Footer = () => {
  return (
    <div className={styles.container}>
      <Link className={styles.container_logo} to={'/'}><img src="/logo-footer.png" alt="" className={styles.logo} /></Link>
      <div className={styles.div}>
        <Link className={styles.links} to={'/'}>Inicio</Link>
        <Link className={styles.links} to={'/servicios'}> Servicios</Link>
        <Link className={styles.links} to={'/contacto'}>Contacto</Link>
      </div>
      <div className={styles.div}>
        <Link className={styles.links} to={'/*'}>Oficinas</Link>
        <Link className={styles.links} to={'/*'}>Sala de reuniones</Link>
        <Link className={styles.links} to={'/*'}>Eventos</Link>
      </div>
      <div className={styles.div_icons}>
        <Link
          className={`${styles.links} ${styles.icons}`}
          to={'https://www.instagram.com/'} target='_blank'
          rel="noopener noreferrer">
          <PiInstagramLogoLight />
        </Link>
        <Link
          className={`${styles.links} ${styles.icons}`}
          to={'https://x.com/'}
          target='_blank'
          rel="noopener noreferrer">
          <RiTwitterXLine />
        </Link>
        <Link
          className={`${styles.links} ${styles.icons}`}
          to={'https://www.facebook.com/'}
          target='_blank'
          rel="noopener noreferrer">
          <SlSocialFacebook />
        </Link>
      </div>
    </div>
  )
}

export default Footer