import { createContext, useContext, useEffect, useReducer } from 'react';

const defaultState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  isLoading: false,
  error: null,
};

export const AuthContext = createContext(defaultState);

const AuthReducer = (state, action) => {
  switch (action.type) {
    case 'IS_LOGIN':
      return {
        user: null,
        isLoading: true,
        error: null,
      };
    case 'LOGIN_SUCCESS':
      return {
        user: action.payload,
        isLoading: false,
        error: null,
      };
    case 'LOGIN_FAILURE':
      return {
        user: null,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, defaultState);

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(state.user));
  }, [state.user]);

  return (
    <AuthContext.Provider
      // value={{ user: state.user, isLoading: state.isLoading, error: state.error, dispatch }}
      value={{ ...state, dispatch }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
