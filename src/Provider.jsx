import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';

function Provider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [search, setSearch] = useState('');
  const [filterByName, setFilterByName] = useState([]);
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState(0);
  const [filterByNumericValues, setFilterByNumericValues] = useState([]);

  useEffect(() => {
    const fetchStarWars = async () => {
      const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
      const data = await response.json();
      // console.log(data);
      setPlanets(data.results);
      setFilterByName(data.results);
    };
    fetchStarWars();
  }, []);

  useEffect(() => {
    const filterName = planets.filter((planet) => planet.name
      .toLowerCase().includes(search));

    const newFilter = filterByNumericValues.reduce((acc, curr) => acc.filter((name) => {
      const valueNumber = Number(curr.value);
      switch (curr.comparison) {
      case 'maior que':
        return name[curr.column] > valueNumber;
      case 'menor que':
        return name[curr.column] < valueNumber;
      case 'igual a':
        return Number(name[curr.column]) === valueNumber;
      default:
        return 'error';
      }
    }), filterName);

    setFilterByName(newFilter);
  }, [search, planets, filterByNumericValues]);

  const handleChange = ({ target }) => {
    setSearch(target.value);
  };

  const filterSelect = () => {
    const numeric = {
      column,
      comparison,
      value,
    };
    setFilterByNumericValues([...filterByNumericValues, numeric]);
  };

  const context = {
    handleChange,
    filterByName,
    filterSelect,
    setColumn,
    setComparison,
    setValue,
    value,
  };

  return (
    <MyContext.Provider value={ context }>
      { children }
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default Provider;
