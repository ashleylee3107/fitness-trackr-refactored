import { Link } from "react-router";

/** Navbar with site navigation links */
export default function Navbar() {
  return (
    <header>
      <p>Fitness Trackr</p>
      <nav>
        <Link to="/activities">Activities</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </nav>
    </header>
  );
}
