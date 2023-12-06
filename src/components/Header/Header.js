import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-primary">
      <div className="container-fluid">
        <Link className="navbar-brand text-white fw-bold" to="/">
          VSCODEHELP
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item d-flex align-items-center text-white" style={{ cursor: 'pointer' }}>
              <FontAwesomeIcon icon={faUser} />
              <Link className="nav-link active text-white" aria-current="page" to="/user/login">
                Login
              </Link>
            </li>
            <li
              className="nav-item d-flex align-items-center ms-3 text-white"
              style={{ cursor: 'pointer' }}
            >
              <FontAwesomeIcon icon={faUserPlus} />
              <Link className="nav-link text-white" to="/user/register">
                Register
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
