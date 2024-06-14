import React, { useRef, useState, useEffect } from "react";
import styles from "./Galeria.module.css";
import data from "./data.json";

const Galeria = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const listRef = useRef();

  const scrollToImage = (direction) => {
    const totalItems = data.length;
    if (direction === "next") {
      setCurrentIndex((currentIndex + 1) % totalItems);
    } else if (direction === "prev") {
      setCurrentIndex((currentIndex - 1 + totalItems) % totalItems);
    }
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

/*   useEffect(() => {
    const autoScroll = setInterval(() => {
      scrollToImage("next");
    }, 5000); // Auto-scroll every 5 seconds
    return () => clearInterval(autoScroll);
  }, [currentIndex]); */

  return (
    <div className={styles.main_container}>
      <h2 className={styles.carousel_title}>Conocé algunas de nuestras oficinas:</h2>
      <div className={styles.slider_container}>
        <div className={styles.leftArrow} onClick={() => scrollToImage("prev")}>
          &#10094;
        </div>
        <div className={styles.rightArrow} onClick={() => scrollToImage("next")}>
          &#10095;
        </div>
        <div className={styles.container_images}>
          <ul ref={listRef} className={styles.image_list} style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
            {data.map((item, idx) => (
              <li key={item.id} className={styles.carousel_item}>
                <div className={styles.image_container}>
                  <img src={item.imgUrl} className={styles.image_border} alt={`Slide ${item.id}`} />
                  <div className={styles.dots_container}>
                    {data.map((_, dotIdx) => (
                      <div
                        key={dotIdx}
                        className={`${styles.dots_container_item} ${dotIdx === currentIndex ? styles.active : ""}`}
                        onClick={() => goToSlide(dotIdx)}
                      >
                        &#9865;
                      </div>
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Galeria;
