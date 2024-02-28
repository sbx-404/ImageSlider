import { useEffect, useState } from "react";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import "./ImageSlider.css"

export default function ImageSlider() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [currentSlide , setCurrentSlide] = useState(0)  

  const url = "https://picsum.photos/v2/list";

  async function FetchImages() {
    try {
      setLoading(true);

      const response = await fetch(`${url}?page=1&limit=6`);
      const data = await response.json();
      console.log(data);
      if (data) {
        setImages(data);
        setLoading(false);
      }
    } catch (e) {
      setErrorMsg(e.message);
      setLoading(false);
    }
  }
  useEffect(() => {
    if (url !== "") FetchImages();
  }, [url]);

  if (loading) {
    return <div className="text-center">Loading Please Wait...</div>;
  }

  if (errorMsg !== null) {
    return <div className="text-center">Error occured{errorMsg}</div>;
  }

function handleArrowRightclick(){
setCurrentSlide(currentSlide === images.length -1 ? 0 : currentSlide +1)
}

function handleArrowLeftclick(){
    setCurrentSlide(currentSlide === 0 ? images.length -1 : currentSlide -1)
    }  

  return (
    <div className="container">
      <BsArrowRightCircleFill 
      onClick={handleArrowRightclick}
      className="arrow arrow-right" />
      
      {images.length ? images.map((items,index) => (
        <img 
        key={index}
        src={items.download_url} 
        alt={items.download_url}
        className={ currentSlide !== index ? "current-image hide-current-image" : "current-image "}
        />
      )) : null}

      <span className="circle-div">
      {images.length ? images.map((_,index)=> (
          <button
          key={index}
          onClick={() => setCurrentSlide(index)}
          className={currentSlide === index ? "circle-indicator" : "circle-indicator inactive-circle-indicator"}
          >
    </button>        
      ) ) : null}
      </span>
      <BsArrowLeftCircleFill 
      onClick={handleArrowLeftclick}
      className="arrow arrow-left"/>
    </div>
  );
}

