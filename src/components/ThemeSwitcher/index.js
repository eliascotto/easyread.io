import React, { PureComponent, Fragment } from 'react';
import { useTheme } from 'emotion-theming';
import { withThemeIndex, useThemeIndex } from 'components/ThemeIndexProvider';
import { theme } from 'theme';
import { ThemeIcon, ThemeIconBig } from './icons';
import { MenuContainer } from './styled';

const getColor = (color, inverted) => {
  return inverted? color.secondary : color.primary
};

const ThemeButton = ({ inverted, right, ...props }) => {
  const theme = useTheme();
  const { themeIndex } = useThemeIndex();
  const colorObj = theme.colors[themeIndex];
  const color = getColor(colorObj, inverted);

  return right ?
    <ThemeIcon mainColor={color} rightColor={color} {...props} />
    :
    <ThemeIcon mainColor={color} leftColor={color} {...props} />;
};

ThemeButton.defaultProps = {
  inverted: false,
  right: true,
};

const ThemeColorButton = ({ inverted, colorIndex, ...props }) => {
  const theme = useTheme();
  const { themeIndex } = useThemeIndex();
  const maincolor = getColor(theme.colors[themeIndex], inverted);
  const color = theme.colors[colorIndex];
  const backColor = getColor(theme.colors[themeIndex], !inverted);
  const rightColor = backColor === color.primary ? color.secondary : color.primary;

  return (
    <ThemeIconBig
      className="theme-button"
      mainColor={maincolor}
      leftColor={color.secondary}
      rightColor={rightColor}
      {...props}
    />
  );
};

class ThemeSwitcher extends PureComponent {
  getButtons = () => {
    const { article, themeIndex } = this.props;
    const btns = [];

    for (let i = 0; i < theme.colors.length; i++) {
      if (i !== themeIndex) {
        btns.push(
          <ThemeColorButton
            key={`ThemeColorButton_${i}`}
            inverted={article}
            colorIndex={i}
            onClick={(e) => this.onColorClick(e, i)}
          />
        );
      }
    }
    
    return btns;
  }

  onClick = (e) => {
    const { onOpenClick, open, ...props } = this.props;

    if (!open) {
      onOpenClick(
        <MenuContainer {...props}>
          {this.getButtons()}
        </MenuContainer>
      );
    } else {
      onOpenClick(null);
    }
    e.preventDefault();
  }

  onColorClick = (e, i) => {
    const { onOpenClick } = this.props;
    this.props.setThemeIndex(i);
    onOpenClick(null);
    e.preventDefault();
  }

  render() {
    const { article } = this.props;

    return (
      <Fragment>
        <ThemeButton inverted={!article} onClick={this.onClick} whileTap={{ scale: 0.9 }} />
      </Fragment>
    );
  }
}

ThemeSwitcher.defaultProps = {
  onOpenClick: () => {},
};

export default withThemeIndex(ThemeSwitcher);
