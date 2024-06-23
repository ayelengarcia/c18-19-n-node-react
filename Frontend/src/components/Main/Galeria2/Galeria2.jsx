import styles from "./Galeria.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
// import data from "./data.json";

const Galeria = () => {

  return (
    <div className={styles.main_container}>
      <div id="carouselExampleFade" className="carousel slide carousel-fade">
        <div className="carousel-inner">

          <div className="carousel-item">
            <img src="/eventos/evento3.png" className="d-block w-100" alt="Sala 3" />
          </div>

          <div className="carousel-item active">
            <img src="/salas/sala1.png" className="d-block w-100" alt="Sala 1" />
          </div>

          <div className="carousel-item">
            <img src="/salas/sala2.png" className="d-block w-100" alt="Sala 2" />
          </div>

          <div className="carousel-item">
            <img src="/salas/sala3.png" className="d-block w-100" alt="Sala 3" />
          </div>

          <div className="carousel-item">
            <img src="/eventos/evento2.png" className="d-block w-100" alt="Sala 3" />
          </div>

          <div className="carousel-item">
            <img src="/eventos/evento5.png" className="d-block w-100" alt="Sala 3" />
          </div>
        </div>

        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>

        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default Galeria;



// import React, { useRef, useState, useEffect } from "react";
// import styles from "./Galeria.module.css";
// import data from "./data.json";

// const Galeria = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const listRef = useRef();

//   const scrollToImage = (direction) => {
//     const totalItems = data.length;
//     if (direction === "next") {
//       setCurrentIndex((currentIndex + 1) % totalItems);
//     } else if (direction === "prev") {
//       setCurrentIndex((currentIndex - 1 + totalItems) % totalItems);
//     }
//   };

//   const goToSlide = (index) => {
//     setCurrentIndex(index);
//   };

//   /*   useEffect(() => {
//       const autoScroll = setInterval(() => {
//         scrollToImage("next");
//       }, 5000); // Auto-scroll every 5 seconds
//       return () => clearInterval(autoScroll);
//     }, [currentIndex]); */

//   return (
//     <div className={styles.main_container}>
//       <h2 className={styles.carousel_title}>ConocÃ© algunas de nuestras oficinas:</h2>
//       <div className={styles.slider_container}>
//         <div className={styles.leftArrow} onClick={() => scrollToImage("prev")}>
//           &#10094;
//         </div>
//         <div className={styles.rightArrow} onClick={() => scrollToImage("next")}>
//           &#10095;
//         </div>
//         <div className={styles.container_images}>
//           <ul ref={listRef} className={styles.image_list} style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
//             {data.map((item, idx) => (
//               <li key={item.id} className={styles.carousel_item}>
//                 <div className={styles.image_container}>
//                   <img src={item.imgUrl} className={styles.image_border} alt={`Slide ${item.id}`} />
//                   <div className={styles.dots_container}>
//                     {data.map((_, dotIdx) => (
//                       <div
//                         key={dotIdx}
//                         className={`${styles.dots_container_item} ${dotIdx === currentIndex ? styles.active : ""}`}
//                         onClick={() => goToSlide(dotIdx)}
//                       >
//                         &#9865;
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Galeria;
