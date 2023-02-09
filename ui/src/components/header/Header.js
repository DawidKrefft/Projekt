import { DateRange } from 'react-date-range';
import { GoLocation } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';
import format from 'date-fns/format';
import React, { useState } from 'react';

import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

import { useAuth } from './../../context/AuthContext';
import { useSearch } from './../../context/SearchContext';
import Navbar from '../../components/navbar/Navbar';
import StatsLocation from '../statsLocation/StatsLocation';
import StatsType from '../statsType/StatsType';

import './header.scss';
import video from '../../Assets/video.mp4';

const Header = () => {
  const [destination, setDestination] = useState('');
  const [openDate, setOpenDate] = useState(false);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const navigate = useNavigate();
  const { user } = useAuth();

  const handleOption = (name, operation) => {
    setOptions(prev => {
      return {
        ...prev,
        [name]: operation === 'increase' ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const { dispatch } = useSearch();

  const handleSearch = () => {
    dispatch({ type: 'SEARCH', payload: { destination, dates, options } });
    navigate('/hotels', { state: { destination, dates, options } });
  };

  return (
    <div className='headerContainer'>
      <Navbar />
      <section className='header '>
        <div className='overlay'></div>
        <video src={video} muted autoPlay loop type='video/mp4'></video>
        <div className='headerContent container'>
          <div className='textDiv'>
            <span className='smallText'>snap! crackle!</span>

            <h1 data-aos='fade-up' className='headerTitle'>
              TRIP!
            </h1>
          </div>

          <div className='cardDiv grid'>
            {/* Search location */}
            <div className='destinationInput'>
              <div className='input flex'>
                <input
                  type='text'
                  placeholder='choose your destination'
                  className='headerSearchInput'
                  onChange={e => setDestination(e.target.value)}
                />
                <GoLocation className='icon' />
              </div>
              {/* END of Search location */}
            </div>

            {/* Search Calendar */}
            <div className='dateInput'>
              <div onClick={() => setOpenDate(!openDate)} className='input flex'>
                <span>{`${format(dates[0].startDate, 'dd/MM/yyyy')} to ${format(
                  dates[0].endDate,
                  'dd/MM/yyyy',
                )}`}</span>
              </div>

              {openDate ? (
                <DateRange
                  editableDateInputs={true}
                  onChange={item => setDates([item.selection])}
                  moveRangeOnFirstSelection={false}
                  ranges={dates}
                  rangeColors={['#e67e22']}
                  className='date'
                  minDate={new Date()}
                />
              ) : null}
              {/* END of Search Calendar */}
            </div>

            {/* Search Members */}
            <div className='headerOptions'>
              <div className='input '>
                <span
                  onClick={() => setOpenOptions(!openOptions)}
                  className='headerSearchText'
                >{`${options.adult} adult / ${options.children} children / ${options.room} room`}</span>
              </div>

              {openOptions && (
                <div className='options'>
                  <div className='optionItem'>
                    <span className='optionText'>Adult</span>
                    <div className='optionCounter'>
                      <button
                        className='optionCounterButton'
                        disabled={options.adult <= 1}
                        onClick={() => handleOption('adult', 'decrease')}
                      >
                        -
                      </button>
                      <span className='optionCounterNumber'>{options.adult}</span>
                      <button
                        className='optionCounterButton'
                        onClick={() => handleOption('adult', 'increase')}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className='optionItem'>
                    <span className='optionText'>Children</span>
                    <div className='optionCounter'>
                      <button
                        className='optionCounterButton'
                        disabled={options.children <= 0}
                        onClick={() => handleOption('children', 'decrease')}
                      >
                        -
                      </button>
                      <span className='optionCounterNumber'>{options.children}</span>
                      <button
                        className='optionCounterButton'
                        onClick={() => handleOption('children', 'increase')}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className='optionItem'>
                    <span className='optionText'>Room</span>
                    <div className='optionCounter'>
                      <button
                        className='optionCounterButton'
                        disabled={options.room <= 1}
                        onClick={() => handleOption('room', 'decrease')}
                      >
                        -
                      </button>
                      <span className='optionCounterNumber'>{options.room}</span>
                      <button
                        className='optionCounterButton'
                        onClick={() => handleOption('room', 'increase')}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {/* END of Search Members */}
            </div>

            <div className='headerSearchItem'>
              <div className='searchWrapper'>
                <button className='btn searchBtn' onClick={handleSearch}>
                  Show Results
                </button>
              </div>
            </div>
          </div>

          <StatsType className='statsType' />
          <StatsLocation className='statsLocation' />
        </div>
      </section>
    </div>
  );
};

export default Header;
