import Navbar from './components/Navbar/Navbar';
import Footer from './components/footer/Footer';
import Home from './pages/Home/Home'
import Error from './pages/Error/Error';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import styles from './App.module.css';
import Protected from './components/Protected/Protected';
import Login from './components/Login/Login';

function App() {
  const isAuth = true;
  return (
    <div className={styles.container}>
      <BrowserRouter>
      <div className={styles.layout}>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<div className={styles.main}><Home /></div>} />
          <Route path="crypto" exact element={<div className={styles.main}>Crypto Page</div>} />
          <Route path="blogs" exact element={<Protected isAuth={isAuth}><div className={styles.main}>Blogs Page</div></Protected>} />
          <Route path="submit" exact element={<Protected isAuth={isAuth}><div className={styles.main}>Submit Blog</div></Protected>} />
          <Route path="login" exact element={<div className={styles.main}><Login/></div>} />
          <Route path="signup" exact element={<div className={styles.main}>Sign Up</div>} />
          <Route path="*" element={<div className={styles.main}><Error /></div>} />
        </Routes>
        <Footer />
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
