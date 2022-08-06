import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import myContext from './MyContext';

function ProviderStarWars({ children }) {
  const [data, setData] = useState([]);
  const [moreData, setMoreData] = useState([]);
  const [filterByNumericValues, setFilterByNumericValues] = useState([]);

  useEffect(() => {
    const apiCall = async () => {
      const MINUS_ONE = -1;
      const JUST_ONE = 1;
      const myFetch = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
      const responseReceived = await myFetch.json();
      const { results } = responseReceived;
      const removeResidentKey = results
        .filter((elements) => delete elements.residents);
      const sortedResults = removeResidentKey
        .sort((a, b) => (a.name < b.name ? MINUS_ONE : JUST_ONE));
      setData(sortedResults);
      setMoreData(sortedResults);
    };
    apiCall();
  }, []);

  useEffect(() => {
    let filteredColumn = [...data];
    filterByNumericValues.forEach(({ column, comparison, value }) => {
      if (comparison === 'maior que') {
        const biggerThen = filteredColumn
          .filter((item) => Number(item[column]) > Number(value));
        filteredColumn = [...biggerThen];
      }
      if (comparison === 'menor que') {
        const lessThan = filteredColumn
          .filter((item) => Number(item[column]) < Number(value));
        filteredColumn = [...lessThan];
      }
      if (comparison === 'igual a') {
        const equalTo = filteredColumn
          .filter((item) => Number(item[column]) === Number(value));
        filteredColumn = [...equalTo];
      }
    });
    setMoreData(filteredColumn);
  }, [filterByNumericValues]);
  const contextValue = {
    data,
    moreData,
    setMoreData,
    filterByNumericValues,
    setFilterByNumericValues };
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