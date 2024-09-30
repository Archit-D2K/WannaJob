import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';

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
