import './hotel.scss';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useRef, useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import useFetch from './../../hooks/useFetch';
import { useLocation, useNavigate } from 'react-router-dom';
import { SearchContext } from '../../context/SearchContext';
import { AuthContext } from '../../context/AuthContext';
import Reserve from '../../components/reserve/Reserve';
import { motion } from 'framer-motion';

const Hotel = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const id = location.pathname.split('/')[2];
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const { data, isLoading } = useFetch(`/hotels/find/${id}`);
  const { user } = useContext(AuthContext);
  const { dates, options } = useContext(SearchContext);

  let { name, address, cheapestPrice, photos, title, desc } = data;

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }

  const days = dayDifference(dates[0].endDate, dates[0].startDate);
  // console.log(days);

  // if (!user) {
  //   navigate('/login');
  // }

  const handleClick = () => {
    if (user) {
      setOpenModal(true);
    } else {
      navigate('/login');
    }
  };

  const [width, setWidth] = useState(0);
  const carousel = useRef();

  useEffect(() => {
    // console.log(carousel.current.scrollWidth, carousel.current.offsetWidth);
    setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
  }, [carousel]);

  return (
    <div>
      <Navbar />
      {isLoading ? (
        'isLoading'
      ) : (
        <div className='hotelContainer container'>
          <div className='hotelWrapper'>
            <div className='hotelHeader'>
              <h1 className='hotelTitle'>{name}</h1>
              <div className='hotelAddress'>
                <FontAwesomeIcon icon={faLocationDot} />
                <span>{address}</span>
              </div>
              <span className='hotelPrice'>Starting from ${cheapestPrice}</span>
              <button className='btn' onClick={handleClick}>
                Reserve or Book Now!
              </button>
            </div>

            {/* Photo Carousel */}
            <motion.div ref={carousel} className='carousel' whileTap={{ cursor: 'grabbing' }}>
              <motion.div
                drag='x'
                dragConstraints={{ right: 0, left: -1500 }}
                className='innerCarousel'
              >
                {photos?.map((photo, i) => {
                  return (
                    <motion.div className='photo' key={i}>
                      <img src={photo} alt='' />
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>

            <div className='hotelDetails container'>
              <div className='hotelDetailsTexts'>
                <h1 className='hotelTitle'>{title}</h1>
                <p className='hotelDesc'>{desc}</p>
              </div>
              <div className='hotelDetailsPrice'>
                <h1>Have a great time!</h1>

                <h2>
                  <b>${days * cheapestPrice * options.room}</b> ({days} days)
                </h2>
                <button className='btn' onClick={handleClick}>
                  Reserve or Book Now!
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {openModal && <Reserve setOpen={setOpenModal} hotelId={id} />}
    </div>
  );
};

export default Hotel;
