import React from 'react';
import useFetch from '../../hooks/useFetch';
import './statsType.scss';

const StatsType = () => {
  const { data, loading, error } = useFetch('/hotels/countByType');

  return (
    <div className='statsType flex'>
      {loading ? (
        'loading'
      ) : (
        <>
          {data
            ? data.map((el, i) => (
                <div className='statsTypeItem' key={i}>
                  <div className='stats'>
                    <h1>{data[i]?.type}</h1>
                    <h2>
                      {data[i]?.count} {data[i]?.type}
                    </h2>
                  </div>
                </div>
              ))
            : null}
        </>
      )}
    </div>
  );
};

export default StatsType;
