/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa6';

function TopNav({ authUser, signOut }) {
  const { id, avatar, name } = authUser;

  const styles = {
    createThreadButton: {
      backgroundColor: '#f57c00',
      color: '#fff',
      fontWeight: 'bold',
      padding: '8px 15px',
      borderRadius: '20px',
      marginLeft: '10px',
      display: 'flex',
      alignItems: 'center',
    },
    profileImage: {
      width: '35px',
      height: '35px',
      borderRadius: '50%',
      objectFit: 'cover',
    },
  };

  const authenticatedUserModel = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  };

  TopNav.propTypes = {
    authUser: PropTypes.shape(authenticatedUserModel).isRequired,
    signOut: PropTypes.func.isRequired,
  };

  return (
    <div>
      <nav
        className="navbar navbar-expand-lg navbar-light bg-light"
        style={{ boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)' }}
      >
        <div className="container-fluid">
          <Link
            className="navbar-brand"
            to="/"
            style={{ fontWeight: 'bold', fontSize: '1.5em', color: '#333' }}
          >
            IThreads :)
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navApp"
            aria-controls="navApp"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navApp">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item bg-white pt-2">
                <Link
                  className="btn btn-sm"
                  to="/threads/add"
                  style={styles.createThreadButton}
                >
                  <FaPlus />
                  {' '}
                  Buat Thread
                </Link>
              </li>
              <li className="nav-item dropdown bg-white pt-1">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navUser"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    className="nav-profile"
                    src={avatar}
                    alt={id}
                    title={name}
                    style={styles.profileImage}
                  />
                </a>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navUser">
                  <li>
                    <button
                      type="button"
                      className="dropdown-item"
                      onClick={signOut}
                    >
                      Sign out
                    </button>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default TopNav;
