import './searchItem.scss';
import React from 'react';
import { Link } from 'react-router-dom';
import { GoLocation } from 'react-icons/go';
import { BsClipboardCheck } from 'react-icons/bs';
import img from '../../Assets/img1.jpg';

const SearchItem = ({ item }) => {
  const { photos, name, address, desc, rating, cheapestPrice, _id } = item;
  let src = photos[0] || img;
  return (
    <div className='searchItemContainer grid'>
      <div className='searchItem '>
        <div className='cardInfo'>
          <div className='imageDiv'>
            <img src={src} alt='' />
          </div>
          <h4 className='destTitle'>{name}</h4>
          <span className='continent flex'>
            <GoLocation className='icon' />
            <span className='name'>{address}</span>
          </span>

          <div className='fees flex'>
            <div className='grade'>
              <span>price</span>
            </div>
            <div className='price'>
              <h5>
                <small>$</small>
                {cheapestPrice}
              </h5>
            </div>
          </div>

          <div className='desc'>
            <p>{desc}</p>
          </div>

          <Link to={`/hotels/${_id}`} className='btnCenter'>
            <button className='btn flex'>
              DETAILS <BsClipboardCheck className='icon' />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
