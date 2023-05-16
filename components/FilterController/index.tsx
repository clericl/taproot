import React, {createContext, useState} from 'react';
import {ControllerProps, SpeciesNameType} from '../../utils/types';

type FilterContextProps = {
  species: SpeciesNameType[];
  setSpecies: Function;
};

export const FilterContext = createContext<FilterContextProps>({
  species: [],
  setSpecies: () => {},
});

function FilterController({children}: ControllerProps) {
  const [species, setSpecies] = useState([]);

  const value = {
    species,
    setSpecies,
  };

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
}

export default FilterController;
