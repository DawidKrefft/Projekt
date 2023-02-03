import { useEffect, useState } from 'react';
import axios from 'axios';

const useFetch = url => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(url);
        setData(res.data);
      } catch (err) {
        setError(err);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [url]);
  const reFetch = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(url);
      setData(res.data);
    } catch (err) {
      setError(err);
    }
    setIsLoading(false);
  };
  return { data, isLoading, error, reFetch };
};
export default useFetch;
