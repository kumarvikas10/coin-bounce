import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useSelector } from 'react-redux';

function Navbar() {
  const isAuthenticated = useSelector((state) => state.user.auth);
  return (
    <>
      <nav className={styles.navbar}>
        <NavLink to="/" className={`${styles.logo} ${styles.inActiveStyle}`}>
          CoinBounce
        </NavLink>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? styles.activeStyle : styles.inActiveStyle
          }
        >
          Home
        </NavLink>
        <NavLink
          to="crypto"
          className={({ isActive }) =>
            isActive ? styles.activeStyle : styles.inActiveStyle
          }
        >
          Cryptocurrencies
        </NavLink>
        <NavLink
          to="blogs"
          className={({ isActive }) =>
            isActive ? styles.activeStyle : styles.inActiveStyle
          }
        >
          Blogs
        </NavLink>
        <NavLink
          to="submit"
          className={({ isActive }) =>
            isActive ? styles.activeStyle : styles.inActiveStyle
          }
        >
          Submit a Blog
        </NavLink>
        {isAuthenticated ? (
          <div>
            <NavLink>
              <button className={styles.signoutButton}>Sign Out</button>
            </NavLink>
          </div>
        ) : (
          <div>
            <NavLink
              to="login"
              className={({ isActive }) =>
                isActive ? styles.activeStyle : styles.inActiveStyle
              }
            >
              <button className={styles.loginButton}>Log In</button>
            </NavLink>
            <NavLink
              to="signup"
              className={({ isActive }) =>
                isActive ? styles.activeStyle : styles.inActiveStyle
              }
            >
              <button className={styles.signupButton}>Sign Up</button>
            </NavLink>
          </div>
        )}
      </nav>
      <div className={styles.seprator}></div>
    </>
  );
}

export default Navbar;
