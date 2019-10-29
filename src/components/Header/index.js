import React, { PureComponent, Fragment } from 'react';
import { useTheme } from 'emotion-theming';
import { useThemeIndex } from 'components/ThemeIndexProvider';
import SearchBar from 'components/SearchBar';
import Settings from 'components/Settings';
import { Container, IconWrapper, StyledSVG, TypoButton } from './styled';

const EscButton = (props) => {
  const theme = useTheme();
  const { themeIndex } = useThemeIndex();
  const color = theme.colors[themeIndex];

  return (
    <IconWrapper {...props}>
      <StyledSVG version="1.1" viewBox='0 2 24 24' xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" height="22.178197000229375" width="22.178197000229147">
        <g>
          <path id="path-1" opacity="1" fill={color.primary} fillOpacity="1" fillRule="evenodd" d="M21.51416015625,1.9920883178710938 C21.880615234375,1.625600814819336 21.880615234375,1.030517578125 21.51416015625,0.6640300750732422 C21.1475830078125,0.2975425720214844 20.5526123046875,0.2975425720214844 20.18603515625,0.6640300750732422 L11.089111328125,9.761005401611328 L1.9920654296875,0.6640300750732422 C1.6256103515625,0.2975425720214844 1.030517578125,0.2975425720214844 0.6640625,0.6640300750732422 C0.2974853515625,1.030517578125 0.2974853515625,1.6256027221679688 0.6640625,1.9920902252197266 L9.760986328125,11.089038848876953 L0.6639404296875,20.186107635498047 C0.2974853515625,20.552593231201172 0.2974853515625,21.14767837524414 0.6639404296875,21.51416778564453 C1.030517578125,21.880657196044922 1.6256103515625,21.880653381347656 1.9920654296875,21.51416778564453 L11.089111328125,12.417129516601562 L20.1861572265625,21.51416778564453 C20.5526123046875,21.880657196044922 21.147705078125,21.880657196044922 21.51416015625,21.51416778564453 C21.880615234375,21.14767837524414 21.880615234375,20.552597045898438 21.51416015625,20.186107635498047 L12.4171142578125,11.089099884033203 L21.51416015625,1.9920883178710938Z"/>
        </g>
      </StyledSVG>
    </IconWrapper>
  );
};

const variants = {
  visible: {
    y: 0,
  },
  hidden: {
    y: '-70px',
  }
};

class Header extends PureComponent {
  state = {
    hidden: false,
    lastScrollY: 0,
  }

  // componentDidMount() {
  //   window.addEventListener('scroll', this.handleScroll);
  // }

  // componentWillUnmount() {
  //   window.removeEventListener('scroll', this.handleScroll);
  // }

  handleScroll = (e) => {
    const { lastScrollY } = this.state;
    const currentScrollY = window.scrollY;
    const hidden = currentScrollY > lastScrollY;
    this.setState({
      hidden,
      lastScrollY: currentScrollY,
    });
  }

  onClose = () => {
    const { onArticleClose } = this.props;
    onArticleClose();
  }

  render() {
    const { hidden } = this.state;
    const { article, onSearch, onClearSearch, onSettingsOpen } = this.props;

    if (article) {
      return (
        <Container>
          <SearchBar
            onSearch={onSearch}
            onClearSearch={onClearSearch}
          />
          <Settings article={article} onSettingsOpen={onSettingsOpen} />
          <EscButton onClick={this.onClose} whileTap={{ scale: 0.9 }} />
        </Container>
      );
    }

    return (
      <Container>
        <Settings article={article} onSettingsOpen={onSettingsOpen} />
      </Container>
    );
  }
}

Header.defaultProps = {
  article: false,
  onSearch: () => {},
  onClearSearch: () => {},
  onSettingsOpen: () => {},
};

export default Header;
