import './App.css';
// import style from './style.module.css';
import NavBar from './components/navbar/navbar';
import { Outlet } from 'react-router-dom';
import Footer from './components/footer/footer';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
