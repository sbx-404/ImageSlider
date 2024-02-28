import ImageSlider from "../Components/ImageSlider"

function App() {

  return (

  <div>  
  <h1 className="text-center">Image Slider </h1>
  <ImageSlider 
    url={"https://picsum.photos/v2/list"}
    page={"1"}
    limit={"5"}

  />
  </div>
  
  )
}

export default App
