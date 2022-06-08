import React, { useContext } from 'react';
import MyContext from '../MyContext';

function Table() {
  const {
    handleChange,
    filterByName,
    setColumn,
    setComparison,
    setValue,
    filterSelect,
    value } = useContext(MyContext);

  return (
    <div>
      <input
        data-testid="name-filter"
        type="text"
        placeholder="Search"
        onChange={ handleChange }
      />
      <select
        onChange={ (({ target }) => setColumn(target.value)) }
        data-testid="column-filter"
      >
        <option>population</option>
        <option>orbital_period</option>
        <option>diameter</option>
        <option>rotation_period</option>
        <option>surface_water</option>
      </select>
      <select
        onChange={ (({ target }) => setComparison(target.value)) }
        data-testid="comparison-filter"
      >
        <option>maior que</option>
        <option>menor que</option>
        <option>igual a</option>
      </select>
      <input
        onChange={ (({ target }) => setValue(target.value)) }
        type="number"
        data-testid="value-filter"
        placeholder="0"
        value={ value }
      />
      <button
        onClick={ filterSelect }
        type="button"
        data-testid="button-filter"
      >
        Filter

      </button>
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
          {filterByName.map((element, index) => (
            <tr key={ index }>
              <td>{element.name}</td>
              <td>{element.rotation_period}</td>
              <td>{element.orbital_period}</td>
              <td>{element.diameter}</td>
              <td>{element.climate}</td>
              <td>{element.gravity}</td>
              <td>{element.terrain}</td>
              <td>{element.surface_water}</td>
              <td>{element.population}</td>
              <td>{element.films}</td>
              <td>{element.created}</td>
              <td>{element.edited}</td>
              <td>{element.url}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>Teste avaliador</p>
    </div>
  );
}

export default Table;
