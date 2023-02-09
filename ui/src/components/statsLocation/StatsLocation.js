import React from 'react';
import useFetch from '../../hooks/useFetch.js';
import './statsLocation.scss';

const StatsLocation = () => {
  const { data, loading, error } = useFetch('/hotels/countByCity?cities=venice,warsaw,london');

  return (
    <div className='statsLocation flex'>
      {loading ? (
        'loading please wait'
      ) : (
        <>
          <div className='statsLocationItem'>
            <h1>Venice</h1>
            <h2>{data[0]} properties</h2>
          </div>

          <div className='statsLocationItem'>
            <h1>Warsaw</h1>
            <h2>{data[1]} properties</h2>
          </div>

          <div className='statsLocationItem'>
            <h1>London</h1>
            <h2>{data[2]} properties</h2>
          </div>
        </>
      )}
    </div>
  );
};

export default StatsLocation;
