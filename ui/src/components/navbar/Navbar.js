import { AiFillCloseCircle } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { TbBrandBooking } from 'react-icons/tb';
import { TbGridDots } from 'react-icons/tb';
import React, { useContext, useState } from 'react';

import { AuthContext, useAuth } from '../../context/AuthContext';

import './navbar.scss';

const Navbar = () => {
  const [active, setActive] = useState('navbar');
  const showNav = () => {
    setActive(`navbar activeNavbar`);
  };
  const removeNav = () => {
    setActive(`navbar`);
  };

  const { user } = useAuth();
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  const handleRegister = () => {
    if (!user) {
      navigate('/register');
    }
  };
  const handleClick = () => {
    if (user) {
      setOpenModal(true);
    } else {
      navigate('/login');
    }
  };
  const logOut = () => {
    setOpenModal(false);
    localStorage.removeItem('user');
    document.location.reload(true);
  };

  return (
    <>
      <section className='navbarSection'>
        <div className='navbarContainer flex'>
          <div className='logoDiv'>
            <Link to='/' className='logo flex'>
              <h1>
                <TbBrandBooking className='icon' />
                BookeBay
              </h1>
            </Link>
          </div>

          {user ? (
            <div className=''>
              <button className='btn' onClick={logOut}>
                Log Out {user.username}
              </button>
            </div>
          ) : (
            <>
              <div className={active}>
                <div className='navLists flex'>
                  <button className='btn' onClick={handleRegister}>
                    <a>Register</a>
                  </button>

                  <button className='btn' onClick={handleClick}>
                    <a>Login</a>
                  </button>

                  <div onClick={removeNav} className='closeNavbar'>
                    <AiFillCloseCircle className='icon' />
                  </div>
                </div>
              </div>
              <div onClick={showNav} className='toggleNavbar'>
                <TbGridDots className='icon' />
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default Navbar;
