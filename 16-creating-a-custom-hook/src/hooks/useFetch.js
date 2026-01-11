import { useEffect, useState } from 'react';

// Para o react saber que é um custom hook, tem que começar com a palavra use
// Essas funções não mudam, logo não preciso usar useCallback quando eu usar
// elas em um arquivo jsx pois o "endereço na memória" fica salvo
export function useFetch(fetchFn, initialValue) {
  const [isFetching, setIsFetching] = useState();
  const [error, setError] = useState();
  const [fetchedData, setFetchedData] = useState(initialValue);

  useEffect(() => {
    async function fetchData() {
      setIsFetching(true);
      try {
        const data = await fetchFn();
        setFetchedData(data);
      } catch (error) {
        setError({ message: error.message || 'Failed to fetch data.' });
      }

      setIsFetching(false);
    }

    fetchData();
  }, [fetchFn]);

  return {
    isFetching, 
    error, 
    fetchedData,
    setFetchedData
  }
}