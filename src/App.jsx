import './App.css';
import s from './style.module.css';
import Header from './components/header/header';
import { Outlet } from 'react-router-dom';
import Footer from './components/footer/footer';

function App() {
  return (
    <div className={s.App}>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
