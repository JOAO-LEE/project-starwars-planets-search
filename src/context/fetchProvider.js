import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import myContext from './MyContext';

function ProviderStarWars({ children }) {
  const [data, setData] = useState([]);
  const [moreData, setMoreData] = useState([]);
  useEffect(() => {
    const apiCall = async () => {
      const MINUS_ONE = -1;
      const REGULAR_ONE = 1;
      const myFetch = await fetch('https://swapi.dev/api/planets/');
      const responseReceived = await myFetch.json();
      const { results } = responseReceived;
      const removeResidentKey = results
        .filter((elements) => delete elements.residents);
      const sortedResults = removeResidentKey
        .sort((a, b) => (a.name < b.name ? MINUS_ONE : REGULAR_ONE));
      setData(sortedResults);
      setMoreData(sortedResults);
    };
    apiCall();
  }, []);
  const contextValue = { data, moreData, setMoreData };
  return (
    <myContext.Provider value={ contextValue }>
      {children}
    </myContext.Provider>
  );
}

ProviderStarWars.propTypes = {
  children: PropTypes.node.isRequired,
};
export default ProviderStarWars;
