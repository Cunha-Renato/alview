import { Link, useLocation } from "react-router-dom";
import styles from "./NavBar.module.css"

const LINKS = [
  { label: "Home", to: "/" },
  { label: "Sorting", to: "/sort" },
];

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className={styles.nav}>
      <Link to="/" className={styles.brand}>
        AL<span className={styles.brandAccent}>VIEW</span>
      </Link>

      <ul className={styles.links}>
        {LINKS.map(({ label, to }) => (
          <li key={to}>
            <Link
              to={to}
              className={`${styles.link} ${location.pathname === to ? styles.linkActive : ""}`}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}