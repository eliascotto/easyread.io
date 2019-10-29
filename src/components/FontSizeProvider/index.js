import React, { createContext, useContext } from 'react';

const INITIAL_STATE = { size: 5 };
const MIN_SIZE = 1;
const MAX_SIZE = 8;

const FontSizeStateContext = createContext();
const FontSizeDispatcherContext = createContext();

const FontSizeReducer= (state, action) => {
  switch (action.type) {
    case 'INCREMENT': {
      if (state.size >= MAX_SIZE) {
        return { size: state.size };
      }
      return { size: state.size + 1 };
    }
    case 'DECREMENT': {
      if (state.size <= MIN_SIZE) {
        return { size: state.size };
      }
      return { size: state.size - 1 };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

const FontSizeProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(FontSizeReducer, INITIAL_STATE);
  return (
    <FontSizeStateContext.Provider value={state}>
      <FontSizeDispatcherContext.Provider value={dispatch}>
        {children}
      </FontSizeDispatcherContext.Provider>
    </FontSizeStateContext.Provider>
  )
};

export const withFontSize = Component => {
  return props => {
    return (
      <FontSizeStateContext.Consumer>
        {({ size }) => <Component {...props} fontSize={size} />}
      </FontSizeStateContext.Consumer>
    );
  }
};

export const useFontSizeState = () => {
  const context = useContext(FontSizeStateContext);
  if (context === undefined) {
    throw new Error('useFontSizeState must be used within a FontSizeProvider');
  }
  return context;
};

export const useFontSizeDispatcher = () => {
  const context = useContext(FontSizeDispatcherContext);
  if (context === undefined) {
    throw new Error('useFontSizeDispatcher must be used within a FontSizeProvider');
  }
  return context;
};

export default FontSizeProvider;
