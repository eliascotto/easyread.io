import React, { useEffect, useState, useRef } from 'react';
import ThemeSwitcher from 'components/ThemeSwitcher';
import FontEdit from 'components/FontEdit';
import { Container } from './styled';

const Settings = ({ article, onSettingsOpen }) => {
  const container = useRef();

  const [themeOpen, setThemeOpen] = useState(false);
  const [fontOpen, setFontOpen] = useState(false);

  const handleThemeClick = (children) => {
    onSettingsOpen(children);
    setFontOpen(false);
    setThemeOpen(!themeOpen);
  };

  const handleFontClick = (children) => {
    onSettingsOpen(children);
    setThemeOpen(false);
    setFontOpen(!fontOpen);
  };

  const handleClick = e => {
    const settingsBar = document.getElementById('settings-bar');
    if (!container.current.contains(e.target) && !settingsBar.contains(e.target)) {
      setThemeOpen(false);
      setFontOpen(false);
      onSettingsOpen(null);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, []);

  return (
    <Container ref={container}>
      <ThemeSwitcher
        open={themeOpen}
        article={article}
        onOpenClick={handleThemeClick}
      />
      {article && (
        <FontEdit
          open={fontOpen}
          onOpenClick={handleFontClick}
        />
      )}
    </Container>
  );
};

// class Settings extends PureComponent {
//   state = {
//     themeOpen: false,
//     fontOpen: false,
//   }

//   onThemeClick = (children) => {
//     const { onSettingsOpen } = this.props;
//     this.setState(prev => ({ fontOpen: false, themeOpen: !prev.themeOpen }));
//     onSettingsOpen(children);
//   }

//   onFontEditClick = (children) => {
//     const { onSettingsOpen } = this.props;
//     this.setState(prev => ({ themeOpen: false, fontOpen: !prev.fontOpen }));
//     onSettingsOpen(children);
//   }

//   render() {
//     const { themeOpen, fontOpen } = this.state;
//     const { article } = this.props;

//     return (
//       <Container>
//         <ThemeSwitcher
//           open={themeOpen}
//           article={article}
//           onOpenClick={this.onThemeClick}
//         />
//         {article && (
//           <FontEdit
//             open={fontOpen}
//             onOpenClick={this.onFontEditClick}
//           />
//         )}
//       </Container>
//     );
//   }
// }

export default Settings;
