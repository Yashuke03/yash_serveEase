import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Categories from './components/Categories'
import WhyChooseUs from './components/WhyChoseUs'
import CallToAction from './components/CallToAction'
import Footer from './components/Footer'

const App =() => {
 return (
    <div>
      <Navbar />
      <Hero />
      <Categories />
      <WhyChooseUs />
      <CallToAction />
      <Footer />
    </div>
  )
}
export default App