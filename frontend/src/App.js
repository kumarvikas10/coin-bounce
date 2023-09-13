import Navbar from './components/Navbar/Navbar';
import Footer from './components/footer/Footer';
import Home from './pages/Home/Home';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import styles from './App.module.css';

function App() {
  return (
    <div className={styles.container}>
      <BrowserRouter>
      <div className={styles.layout}>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<div className={styles.main}><Home /></div>} />
          <Route path="crypto" exact element={<div className={styles.main}>Crypto Page</div>} />
          <Route path="blogs" exact element={<div className={styles.main}>Blogs Page</div>} />
          <Route path="submit" exact element={<div className={styles.main}>Submit Blog</div>} />
          <Route path="log-in" exact element={<div className={styles.main}>Log In Page</div>} />
          <Route path="sign-up" exact element={<div className={styles.main}>Sign Up</div>} />
        </Routes>
        <Footer />
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;