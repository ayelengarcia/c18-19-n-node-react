import styles from "./Gale.module.css"
import { useEffect, useRef, useState } from "react"
import data from "./data"

const Galeria = () => {
  const listRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const listNode = listRef.current;
    const imgNode = listNode.querySelectorAll("li > img")[currentIndex];

    if (imgNode) {
      imgNode.scrollIntoView({
        behavior: "smooth"
      });
    }

  }, [currentIndex]);
  const scrollToImage = (direction) => {
    if (direction === 'prev') {
      setCurrentIndex(curr => {
        const isFirstSlide = currentIndex === 0;
        return isFirstSlide ? 0 : curr - 1;
      })
    } else {
      const isLastSlide = currentIndex === data.length - 1;
      if (!isLastSlide) {
        setCurrentIndex(curr => curr + 1);
      }
    }
  }

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  }

  return (
    <div className={styles.container}>
      
      <div className={styles.main_container}>
        <div className={styles.slider_container}>
          <div className={styles.leftArrow} onClick={() => scrollToImage('prev')}>&#10092;</div>
          <div className={styles.rightArrow} onClick={() => scrollToImage('next')}>&#10093;</div>
          <div className={styles.container_images}>
            <ul ref={listRef}>
              {
                data.map((item) => {
                  return <li key={item.id}>
                    <img src={item.imgUrl} width={600} height={280} />
                  </li>
                })
              }
            </ul>
          </div>
          <div className={styles.dots_container}>
            {
              data.map((_, idx) => (
                <div key={idx}
                  className={` ${styles.dots_container_item} ${idx === currentIndex ? "active" : ""}`}
                  onClick={() => goToSlide(idx)}>
                  &#9865;
                </div>))
            }
          </div>
        </div>
      </div >

    </div>

  )
}

export default Galeria