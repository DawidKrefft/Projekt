import './reserve.scss';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useState } from 'react';
import { useContext } from 'react';
import { SearchContext } from '../../context/SearchContext';
import useFetch from '../../hooks/useFetch';
import { useNavigate } from 'react-router-dom';

const Reserve = ({ setOpen, hotelId }) => {
  const { data, loading, error } = useFetch(`/hotels/room/${hotelId}`);
  const [selectedRooms, setSelectedRooms] = useState([]);
  const { dates } = useContext(SearchContext);

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const date = new Date(start.getTime());
    let dates = [];

    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }
    return dates;
  };

  const allDates = getDatesInRange(dates[0].startDate, dates[0].endDate);

  const isAvailable = roomNumber => {
    const isFound = roomNumber.unavailableDates.some(date =>
      allDates.includes(new Date(date).getTime()),
    );

    return !isFound;
  };

  const handleSelect = e => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(
      checked ? [...selectedRooms, value] : selectedRooms.filter(item => item !== value),
    );
  };
  const navigate = useNavigate();
  // console.log(selectedRooms);
  const handleClick = async () => {
    try {
      await Promise.all(
        selectedRooms.map(roomId => {
          axios.put(`/rooms/availability/${roomId}`, { dates: allDates });
          // axios.put(`/users/reservations`, { dates: allDates });
        }),
      );
      setOpen(false);
      navigate('/');
    } catch (err) {}
  };
  return (
    <div className='rModal'>
      <div className='rContainer'>
        <FontAwesomeIcon icon={faCircleXmark} className='rClose' onClick={() => setOpen(false)} />
        <span>Select your rooms:</span>
        {data.map(item => {
          let { _id, title, desc, maxPeople, price } = item;
          return (
            <div className='rItem' key={_id}>
              <div className='rItemInfo'>
                <div className='rTitle'>{title}</div>
                <div className='rDesc'>{desc}</div>
                <div className='rMax'>
                  Max people: <b>{maxPeople}</b>
                </div>
                <div className='rPrice'>{price}</div>
              </div>
              <div className='rSelectRooms'>
                {item.roomNumbers.map(roomNumber => {
                  let { number, unavailableDates, _id } = roomNumber;

                  return (
                    <div className='room' key={_id}>
                      <label>{number}</label>
                      <input
                        type='checkbox'
                        value={_id}
                        onChange={handleSelect}
                        disabled={!isAvailable(roomNumber)}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
        <button onClick={handleClick} className='rButton btn'>
          Reserve Now!
        </button>
      </div>
    </div>
  );
};

export default Reserve;
