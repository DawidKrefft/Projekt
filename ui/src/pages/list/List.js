import './list.scss';
import React, { useContext, useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import Header from '../../components/header/Header';
import { useLocation } from 'react-router-dom';
import { format } from 'date-fns';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme
import SearchItem from '../../components/searchItem/SearchItem';
import useFetch from './../../hooks/useFetch';
import { SearchContext } from '../../context/SearchContext';

const List = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [dates, setDates] = useState(location.state.dates);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state.options);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);

  const { data, isLoading, error, reFetch } = useFetch(
    `/hotels?city=${destination}&min=${min || 1}&max=${max + 1 || 999}`,
  );

  const handleClick = () => {
    reFetch();
  };

  const { dispatch } = useContext(SearchContext);

  const handleSearch = () => {
    dispatch({ type: 'NEW_SEARCH', payload: { dates, options } });
    // navigate('/hotels', { state: { dates, options } });
  };
  // navigate('/hotels', { state: { destination, dates, options } });

  return (
    <div>
      <Navbar />
      <div className='listSection container'>
        <div className='listContainer'>
          <div className='listWrapper'>
            <div className='listSearch'>
              <div className='lsItem'>
                <label>Destination</label>
                <input
                  placeholder={destination}
                  type='text'
                  onChange={e => setDestination(e.target.value)}
                />
              </div>

              <div className='lsItem'>
                <label>Check-in Date</label>
                <span
                  className='spanClass dateSpan'
                  onClick={() => setOpenDate(!openDate)}
                >{`${format(dates[0].startDate, 'dd/MM/yyyy')} to ${format(
                  dates[0].endDate,
                  'dd/MM/yyyy',
                )}`}</span>
                {/* minDate */}
                {openDate && (
                  <div className='dateRange flex'>
                    <DateRange
                      onChange={item => setDates([item.selection])}
                      minDate={new Date()}
                      ranges={dates}
                    />
                  </div>
                )}
              </div>

              <div className='lsItem'>
                <div className='lsOptions'>
                  <div className='lsOptionItem'>
                    <span className='lsOptionText spanClass'>Min price</span>
                    <input
                      type='number'
                      onChange={e => setMin(e.target.value)}
                      // placeholder={min}
                      className='lsOptionInput'
                    />
                  </div>

                  <div className='lsOptionItem'>
                    <span className='lsOptionText spanClass'>Max price</span>
                    <input
                      type='number'
                      onChange={e => setMax(e.target.value)}
                      // placeholder={max}
                      className='lsOptionInput'
                    />
                  </div>

                  <div className='lsOptionItem'>
                    <span className='lsOptionText spanClass'>Adult</span>
                    <input
                      type='number'
                      min={1}
                      className='lsOptionInput'
                      placeholder={options.adult}
                    />
                  </div>
                  <div className='lsOptionItem'>
                    <span className='lsOptionText spanClass'>Children</span>
                    <input
                      type='number'
                      min={0}
                      className='lsOptionInput'
                      placeholder={options.children}
                    />
                  </div>
                  <div className='lsOptionItem'>
                    <span className='lsOptionText spanClass'>Room</span>
                    <input
                      type='number'
                      min={1}
                      className='lsOptionInput'
                      placeholder={options.room}
                    />
                  </div>
                </div>
              </div>
              <button className='btn' onClick={handleClick}>
                Search
              </button>
            </div>
          </div>
        </div>
        {/* Searched Items */}

        {isLoading ? (
          'isLoading'
        ) : (
          <>
            <div className='secContent grid'>
              {data.map(item => (
                <SearchItem
                  item={item}
                  key={item._id}
                  handleSearch={handleSearch}
                  dates={dates}
                  options={options}
                />
              ))}
            </div>

            {/* <SearchItem
                  photos={item.photos}
                  name={item.name}
                  distance={item.distance}
                  desc={item.desc}
                  rating={item.rating}
                  _id={item._id}
                  key={item._id}
                /> */}
          </>
        )}
      </div>
    </div>
  );
};

export default List;
