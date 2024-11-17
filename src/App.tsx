import ImageSlider from "./components/ImageSlider";
import cRonaldo from '../public/assets/c-ronaldo.jpg'
import berkampHandry from '../public/assets/berkamp-hanry.jpg'
import messi from '../public/assets/messi.jpg'
import ronaldinho from '../public/assets/ronaldinho.jpg'
import ronaldo from '../public/assets/ronaldo.jpg'
import salah from '../public/assets/salah.jpg'
import zidan from '../public/assets/zidan.jpg'
import nestaMaldini from '../public/assets/nesta-maldini.jpg'
import carlos from '../public/assets/carlos.jpg'
import solCampbell from '../public/assets/sol-campbell.png'
import vidicFerdinand from '../public/assets/vidic-ferdinand.jpg'
import './App.css'

export interface ImageInfo {
  image: string,
  title: string
}

function App() {
  const data: ImageInfo[] = [
    { image: berkampHandry, title: 'Denis Berkamp and Thierry Henry' },
    { image: vidicFerdinand, title: 'Nemanja Vidic and Rio Ferdinand' },
    { image: zidan, title: 'Zinedine Zidane' },
    { image: carlos, title: 'Roberto Carlos' },
    { image: ronaldinho, title: 'Ronaldinho Gaúcho' },
    { image: ronaldo, title: 'Ronaldo Luís Nazário de Lima' },
    { image: messi, title: 'Leo Messi' },
    { image: nestaMaldini, title: 'Alessandro Nesta and Paolo Maldini' },
    { image: solCampbell, title: 'Sol Campbell' },
    { image: cRonaldo, title: 'Cristiano Ronaldo' },
    { image: salah, title: 'Muhamed Salah' },
  ]

  const containerStyles = {
    width: "400px",
    height: "750px",
    margin: "0 auto",
  };

  return (
    <main>
      <h1>Image Slider</h1>
      <div style={containerStyles}>
        <ImageSlider data={data} parentWidth={400} />
      </div>
    </main>
  )
}

export default App
