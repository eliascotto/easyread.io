import React, { PureComponent } from 'react';
import { withThemeIndex } from 'components/ThemeIndexProvider';
import { useFontSizeDispatcher } from 'components/FontSizeProvider';
import { MinusIcon, PlusIcon } from './icons';
import { TypoButton, AIcon, SettingsContainer } from './styled';

const MinusButton = () => {
  const dispatcher = useFontSizeDispatcher();
  const onButtonClick = (e) => {
    dispatcher({ type: 'DECREMENT' });
    e.preventDefault();
  }

  return <MinusIcon onClick={onButtonClick} />;
};

const PlusButton = () => {
  const dispatcher = useFontSizeDispatcher();
  const onButtonClick = (e) => {
    dispatcher({ type: 'INCREMENT' });
    e.preventDefault();
  }

  return <PlusIcon onClick={onButtonClick} />;
};

class FontEdit extends PureComponent {
  getFontSettings = () => {
    const { onOpenClick, ...props } = this.props;
    return (
      <SettingsContainer>
        <MinusButton />
        <AIcon {...props}>A</AIcon>
        <PlusButton />
      </SettingsContainer>
    );
  }

  onButtonClick = (e) => {
    const { onOpenClick, open } = this.props;

    e.preventDefault();
    if (!open) {
      onOpenClick(this.getFontSettings());
    } else {
      onOpenClick(null);
    }
  }

  render() {
    return (
      <TypoButton onClick={this.onButtonClick} whileTap={{ scale: 0.9 }}>
        <p><small>A</small>A</p>
      </TypoButton>
    );
  }
}

FontEdit.defaultProps = {
  open: false,
  onOpenClick: () => {},
};

export default withThemeIndex(FontEdit);
