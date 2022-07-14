import React, { useContext, useState } from 'react';
import myContext from '../context/MyContext';

function Table() {
  const [search, setSearch] = useState('');
  const { data } = useContext(myContext);

  return (
    <section>
      <label htmlFor="search-input">
        <input
          id="search-input"
          data-testid="name-filter"
          name="search"
          value={ search }
          onChange={ ({ target: { value } }) => setSearch(value) }
          type="search"
          placeholder="Digite o nome do planeta aqui!"
        />
      </label>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {data.filter(({ name }) => name.toLowerCase().includes(search.toLowerCase()))
            .map((items, index) => (
              <tr key={ index }>
                <td>{items.name}</td>
                <td>{items.rotation_period}</td>
                <td>{items.orbital_period}</td>
                <td>{items.diameter}</td>
                <td>{items.climate}</td>
                <td>{items.gravity}</td>
                <td>{items.terrain}</td>
                <td>{items.surface_water}</td>
                <td>{items.population}</td>
                <td>{items.films}</td>
                <td>{items.created}</td>
                <td>{items.edited}</td>
                <td>{items.url}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </section>
  );
}

export default Table;
