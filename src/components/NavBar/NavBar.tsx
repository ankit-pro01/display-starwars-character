import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/Images/logo.png';

interface Props {}

export default function NavBar({}: Props): ReactElement {
  return (
    <nav className="navbar sticky-top  navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src={Logo} style={{ maxWidth: '7rem' }}></img>
        </Link>
        <ul className="navbar-nav mr-auto mt-2 mt-lg-0 my-2 my-lg-0">
          <li className="nav-item mx-4">
            <Link
              className="nav-link fw-bolder text-warning border border-warning"
              to="/characters"
            >
              characters
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link fw-bolder text-warning border border-warning"
              to="/favourities"
            >
              Favourities
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
