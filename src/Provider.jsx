import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';

function Provider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredName, setFilteredName] = useState([]);

  useEffect(() => {
    const fetchStarWars = async () => {
      const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
      const data = await response.json();
      // console.log(data);
      setPlanets(data.results);
      setFilteredName(data.results);
    };
    fetchStarWars();
  }, []);

  useEffect(() => {
    const filterName = planets.filter((planet) => planet.name
      .toLowerCase().includes(search));
    setFilteredName(filterName);
  }, [search, planets]);

  const handleChange = ({ target }) => {
    setSearch(target.value);
  };

  const context = { handleChange, filteredName };

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
