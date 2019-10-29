import React, { PureComponent } from 'react';
import { withThemeIndex } from 'components/ThemeIndexProvider';
import { withTheme } from 'emotion-theming';
import { Container } from './styled';

const variants = {
  active: {
    height: '70px',
    opacity: 1,
  },
  unactive: {
    height: 0,
    opacity: 1,
  }
};

class SettingsBar extends PureComponent {
  render() {
    const { settings, inverted, theme, themeIndex } = this.props;
    const { primary, secondary } = theme.colors[themeIndex];

    return (
      <Container
        id='settings-bar'
        style={{ backgroundColor: inverted ? primary : secondary }}
        animate={settings ? 'active' : 'unactive'}
        variants={variants}
        transition={{ ease: 'easeInOut' }}
      >
        {settings}
      </Container>
    );
  }
}

export default withTheme(withThemeIndex(SettingsBar));
