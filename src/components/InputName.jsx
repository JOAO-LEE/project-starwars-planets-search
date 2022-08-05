import React, { useState, useContext, useEffect } from 'react';
import myContext from '../context/MyContext';

function InputName() {
  const [search, setSearch] = useState('');
  const { data, setMoreData } = useContext(myContext);

  useEffect(() => {
    const filterByPlanetName = data
      .filter((planets) => planets.name.toLowerCase().includes(search.toLowerCase()));
    setMoreData(filterByPlanetName);
  }, [search]);
  return (
    <label
      htmlFor="input-name"
    >
      Planet:
      <input
        id="input-name"
        placeholder="Type it's name here!"
        type="text"
        value={ search }
        onChange={ ({ target: { value } }) => setSearch(value) }
        data-testid="name-filter"
      />
    </label>
  );
}
export default InputName;
