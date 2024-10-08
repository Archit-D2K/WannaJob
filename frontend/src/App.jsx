import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import { Button } from './Components/ui/button';
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from './Components/ui/carousel';

const App = () => {
  return (
         <div>
        <Navbar />
       
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/jobs" element={<Jobs />} /> */}
        </Routes>
        <Footer />
       
        
        </div>
    
  );
};

export default App;
