import logo from './logo.svg';
import './App.css';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import 'tw-elements';
import Home from './views/Home';
import About from './views/About';
import Join from './views/Join';
import { Routes, Route, Link, useLocation } from "react-router-dom"
import Price from './views/Price';
function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={
          <Home></Home>
        }>
        
        </Route>
        <Route path='about' element={
          <About></About>
        }>
        
        </Route>
        <Route path='join' element={
          <Join></Join>
        }>
        </Route>

        <Route path='price' element={
          <Price></Price>
        }>
        </Route>
      </Routes>
      
      
     
      <Footer></Footer>
    </div>
  );
}

export default App;
