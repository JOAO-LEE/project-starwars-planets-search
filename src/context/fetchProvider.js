import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import myContext from './MyContext';

function StarWarsProvider({ children }) {
  const [data, setData] = useState({ data: [] });

  useEffect(() => {
    const starWarsFetch = async () => {
      const request = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
      const response = await request.json();
      const { results } = response;
      const filteredObject = results.filter((obj) => delete obj.residents);
      setData({ data: filteredObject });
    };
    starWarsFetch();
  }, []);
  return (
    <myContext.Provider value={ { ...data } }>
      {children}
    </myContext.Provider>
  );
}

StarWarsProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default StarWarsProvider;
