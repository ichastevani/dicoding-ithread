import React, { useEffect } from 'react';
import {
  Routes, Route, Link, useLocation,
} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Loading from './components/Loading';
import HalamanLogin from './pages/HalamanLogin';
import HalamanRegister from './pages/HalamanRegister';
import { asyncPreloadProcess } from './states/isPreload/action';
import TopNav from './components/TopNav';
import { asyncUnsetAuthUser } from './states/authUser/action';
import HalamanHome from './pages/HalamanHome';
import AddThreadPage from './pages/TambahThreadBaru';
import HalamanDetail from './pages/HalamanDetail';

function App() {
  const { authUser = null, isPreload = false } = useSelector(
    (states) => states,
  );

  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  const onSignOut = () => {
    dispatch(asyncUnsetAuthUser());
  };

  if (isPreload) {
    return null;
  }

  if (authUser === null) {
    const activeRegister = location.pathname === '/register' ? 'active' : '';
    const activeLogin = location.pathname !== '/register' ? 'active' : '';

    return (
      <>
        <Loading />
        <div className="d-flex justify-content-center mt-5">
          <div className="card shadow-sm">
            <div className="text-center py-2">
              <h2>Forum App</h2>
            </div>
            <ul className="nav nav-pills mb-3">
              <li className="nav-item text-center">
                <Link className={`nav-link ${activeLogin} btl`} to="/">
                  Login
                </Link>
              </li>
              <li className="nav-item text-center">
                <Link
                  className={`nav-link ${activeRegister} btl`}
                  to="/register"
                >
                  Register
                </Link>
              </li>
            </ul>

            <Routes>
              <Route path="/*" element={<HalamanLogin />} />
              <Route path="/register" element={<HalamanRegister />} />
            </Routes>
          </div>
        </div>
      </>
    );
  }

  return (
    <div>
      <header className="fixed-top">
        <TopNav authUser={authUser} signOut={onSignOut} />
        <Loading />
      </header>
      <main className="margin-main">
        <Routes>
          <Route path="/" element={<HalamanHome />} />
          <Route
            path="/threads/category/:category"
            element={<HalamanHome />}
          />
          <Route path="/threads/:id" element={<HalamanDetail />} />
          <Route path="/threads/add" element={<AddThreadPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
