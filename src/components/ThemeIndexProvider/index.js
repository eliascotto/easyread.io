import React, { PureComponent, createContext, useContext } from 'react';

const ThemeIndexContext = createContext();

class ThemeIndexProvider extends PureComponent {
  state = {
    themeIndex: 0,
    setThemeIndex: (themeIndex) => {
      this.setState({ themeIndex });
    }
  }

  render() {
    return (
      <ThemeIndexContext.Provider value={this.state}>
        {this.props.children}
      </ThemeIndexContext.Provider>
    );
  }
}

export const withThemeIndex = Component => {
  return props => {
    return (
      <ThemeIndexContext.Consumer>
          {({ themeIndex, setThemeIndex }) => <Component {...props} themeIndex={themeIndex} setThemeIndex={setThemeIndex} />}
      </ThemeIndexContext.Consumer>
    );
  }
};

export const useThemeIndex = () => {
  return useContext(ThemeIndexContext);
};

export default ThemeIndexProvider;
