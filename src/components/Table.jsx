import React, { useContext } from 'react';
import myContext from '../context/MyContext';

function Table() {
  const { moreData } = useContext(myContext);

  return (
    <section>
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
          {moreData.map((items, index) => (
            <tr key={ index }>
              <td data-testid="planet-name">{items.name}</td>
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
