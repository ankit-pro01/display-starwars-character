import { useState, useEffect } from 'react';
import fetchContent, { getAllStarwarsPeople } from './util';

type ApiData = [] | {};

export default function useFetch(url: string, id = '') {
  const apiUrl = id ? `${url}/${id}` : url;
  const [data, setData] = useState([] as ApiData);
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!id) {
      getAllStarwarsPeople().then((res) => {
        setLoading(false);
        setData(res as []);
      });
    } else {
      fetchContent(apiUrl)
        .then((res) => {
          const list = res;
          setLoading(false);
          setData(list);
        })
        .catch((err) => {
          setIsError(true);
        });
    }
  }, []);

  return [loading, isError, data];
}
