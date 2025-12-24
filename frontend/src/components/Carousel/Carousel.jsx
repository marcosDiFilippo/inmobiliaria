import { useEffect, useState } from "react"
import styles from "./Carousel.module.css"

export function Carousel () {
    const [dataId, setDataId] = useState(0)

    const [imgs, setImgs] = useState(<div className={styles.div_img}><img data-id={0} src="https://images.pexels.com/photos/20588811/pexels-photo-20588811.jpeg" alt="" />
                <img data-id={1} src="https://images.pexels.com/photos/33944537/pexels-photo-33944537.jpeg" alt="" />
                <img data-id={2} src="https://images.pexels.com/photos/19042899/pexels-photo-19042899.jpeg" alt="" /></div>)

    useEffect(() => {
        document.querySelectorAll("img").forEach(img => {
            if (img.dataset.id == dataId) {
                img.style.display = "block"
            }
            else {
                img.style.display = "none"
            }
        })
    }, [dataId])

    function handleClickLeft (e) {
        setDataId(dataId - 1)
    }
    function handleClickRight (e) {
        setDataId(dataId + 1)
    }
    
    return (
        <>  
            {dataId == 0 ? <></> : <button onClick={handleClickLeft}>Atras</button>}
                {imgs}
            {dataId == document.querySelectorAll("img").length - 1 ? <></> : <button onClick={handleClickRight}>Adelante</button>}
        </>
    )
}