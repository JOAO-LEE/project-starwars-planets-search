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
      const fetchUrl = 'https://swapi-trybe.herokuapp.com/api/planets/';
      const myFetch = await fetch(fetchUrl);
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
    // tentando implementar a mesma lógica com switch/case
    //   switch (comparison) {
    //   case 'maior que':
    //     setMoreData(data
    //       .filter((planet) => Number(planet[column]) > Number(value)));
    //     break;
    //   case 'menor que':
    //     setMoreData(data
    //       .filter((planet) => Number(planet[column]) < Number(value)));
    //     break;
    //   default:
    //     setMoreData(data
    //       .filter((planet) => Number(planet[column]) === Number(value)));
    //     break;
    //   }
    filterByNumericValues.forEach(({ column, comparison, value }) => {
      if (comparison === 'maior que') {
        const biggerThan = filteredColumn
          .filter((item) => Number(item[column]) > Number(value));
        filteredColumn = [...biggerThan];
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
  }, [data, filterByNumericValues]);
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
