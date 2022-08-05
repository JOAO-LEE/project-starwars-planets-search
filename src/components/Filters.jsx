import React, { useEffect, useState, useContext } from 'react';
import myContext from '../context/MyContext';

function Filters() {
  const { filterByNumericValues, setFilterByNumericValues } = useContext(myContext);
  const columnOptions = ['population', 'orbital_period', 'diameter',
    'rotation_period', 'surface_water'];
  const [updatedOptions, setUpdatedOptions] = useState(columnOptions);
  const [filterFields, setComparison] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });

  function handleChange({ target: { value, name } }) {
    setComparison({ ...filterFields, [name]: value });
  }

  useEffect(() => {
    setComparison({ ...filterFields, column: updatedOptions[0] });
  }, [updatedOptions]);

  function updatePlanets() {
    setFilterByNumericValues([...filterByNumericValues, filterFields]);
    const selectedOption = filterFields.column;
    console.log(selectedOption);
    const remaingOptions = updatedOptions.filter((option) => option !== selectedOption);
    setUpdatedOptions(remaingOptions);
  }
  return (
    <form>
      <select
        name="column"
        value={ filterFields.column }
        onChange={ handleChange }
        data-testid="column-filter"
      >
        {updatedOptions.map((option) => (
          <option key={ option }>{option}</option>))}
      </select>
      <select
        data-testid="comparison-filter"
        name="comparison"
        value={ filterFields.comparison }
        onChange={ handleChange }
      >
        <option>maior que</option>
        <option>menor que</option>
        <option>igual a</option>
      </select>
      <label htmlFor="number-input">
        <input
          data-testid="value-filter"
          id="number-input"
          name="value"
          value={ filterFields.value }
          onChange={ handleChange }
          type="number"
        />
        <button
          onClick={ updatePlanets }
          data-testid="button-filter"
          type="button"
        >
          FILTER
        </button>
      </label>
    </form>

  );
}

export default Filters;
