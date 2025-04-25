import React from 'react';
import Link from 'next/link';
import { Cloud } from 'lucide-react';
import { useRouter } from 'next/router';
import styles from './../styles/Navbar.module.scss';

const Navbar = () => {
  const router = useRouter();

  return (
    <nav
      className={`navbar navbar-expand-lg navbar-dark bg-primary ${styles.navbar}`}
    >
      <div className="container">
        <Link href="/" className="navbar-brand d-flex align-items-center">
          <Cloud
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="me-2"
          />
          <span>Weather App</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link
                href="/"
                className={`nav-link ${
                  router.pathname === '/' ? 'active' : ''
                }`}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                href="/favorites"
                className={`nav-link ${
                  router.pathname === '/favorites' ? 'active' : ''
                }`}
              >
                Favorites
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
