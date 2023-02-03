import { useContext } from 'react';
import { createContext, useReducer } from 'react';

const defaultState = {
  city: undefined,
  dates: [],
  options: {
    adult: undefined,
    children: undefined,
    room: undefined,
  },
};

export const SearchContext = createContext(defaultState);

const SearchReducer = (state, action) => {
  switch (action.type) {
    case 'SEARCH':
      return action.payload;
    default:
      return state;
  }
};

export const SearchContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(SearchReducer, defaultState);

  return (
    <SearchContext.Provider
      // value={{ city: state.city, dates: state.dates, options: state.options, dispatch }}
      value={{ ...state, dispatch }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  return useContext(SearchContext);
};
