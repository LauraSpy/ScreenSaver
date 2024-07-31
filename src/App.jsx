import './App.css';
// import style from './style.module.css';
import Header from './components/header/header';
import { Outlet } from 'react-router-dom';
import Footer from './components/footer/footer';

function App() {
  return (
    <div className="App">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
