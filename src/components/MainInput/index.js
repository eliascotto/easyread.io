import React, { PureComponent } from 'react';
import { withThemeIndex } from 'components/ThemeIndexProvider';
import { StyledInput, StyledButton } from './styled';

class MainInput extends PureComponent {
  state = {
    value: '',
  }

  constructor(props) {
    super(props);
    this.input = React.createRef();
  }

  handleChange = event => {
    this.setState({ value: event.target.value });
  }

  handleSubmit = event => {
    const { onSubmit } = this.props;
    const { value } = this.state;

    onSubmit(value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>  
        <StyledInput
          ref={this.input}
          type="text"
          value={this.state.value}
          onChange={this.handleChange}
          placeholder="Insert an article url"
          {...this.props}
        />
        <StyledButton {...this.props} whileTap={{ scale: 0.9 }}>GO</StyledButton>
      </form>
    );
  }
}

export default withThemeIndex(MainInput);
