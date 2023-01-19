import React from 'react';
import './statsLocation.scss';
import useFetch from '../../hooks/useFetch.js';

const StatsLocation = () => {
  const { data, loading, error } = useFetch('/hotels/countByCity?cities=berlin,madrid,london');
  // console.log(data);
  return (
    <div className='statsLocation flex'>
      {loading ? (
        'loading please wait'
      ) : (
        <>
          <div className='statsLocationItem'>
            <h1>Berlin</h1>
            <h2>{data[0]} properties</h2>
          </div>

          <div className='statsLocationItem'>
            <h1>Madrid</h1>
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
