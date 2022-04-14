import logo from './logo.svg';
import './App.css';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import 'tw-elements';
import Home from './views/Home';
import About from './views/About';
function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      {/* <Home></Home> */}
      <About></About>
      
      <Footer></Footer>
    </div>
  );
}

export default App;
