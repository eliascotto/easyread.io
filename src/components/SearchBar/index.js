import React, { PureComponent } from 'react';
import { withThemeIndex } from 'components/ThemeIndexProvider';
import { SearchIcon, ClearButton }  from './icons';
import { Container, SearchInput, StyledForm } from './styled';

const variants = {
  active: {
    width: 'auto',
    opacity: 1,
  },
  unactive: {
    width: 0,
    opacity: 0,
  }
};

class SearchBar extends PureComponent {
  state = {
    open: false,
    showClear: false,
    searchValue: '',
  }

  constructor(props) {
    super(props);
    this.searchInputContainer = React.createRef();
    this.searchInput = React.createRef();
  }

  componentDidUpdate(prevProps, prevState) {
    const { open, searchValue } = this.state;

    if (!prevState.open && open) {
      this.searchInput.current.value = searchValue;
      document.addEventListener('mousedown', this.handleClick);
    } else if (prevState.open && !open)  {
      document.removeEventListener('mousedown', this.handleClick);
    }
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick);
  }

  handleClick = e => {
    if (!this.searchInputContainer.current.contains(e.target)) {
      this.setState({ open: false });
    }
  };

  onInputChange = () => {
    const { value } = this.searchInput.current;
    this.setState({ showClear: value !== '' });
  }

  onSubmit = (e) => {
    const { value } = this.searchInput.current;
    const { onSearch } = this.props;

    onSearch(value);
    this.setState({ searchValue: value });
    e.preventDefault();
  }

  onSearchClick = () => {
    this.setState(prevState => ({ open: !prevState.open }));
    this.searchInput.current.focus();
  }

  onClear = () => {
    const { onClearSearch } = this.props;
    onClearSearch();
    this.searchInput.current.value = '';
    this.setState({ searchValue: '', showClear: false });
  }

  render() {
    const { open, showClear } = this.state;
    const { onSearch, onClearSearch, ...props } = this.props;

    return (
      <Container ref={this.searchInputContainer}>
        <SearchIcon onClick={this.onSearchClick} whileTap={{ scale: 0.9 }}  />
        <StyledForm
          onSubmit={this.onSubmit}
          initial={{ width: 0 }}
          animate={open ? 'active' : 'unactive'}
          variants={variants}
          transition={{ ease: 'easeInOut' }}
        >
          <SearchInput
            ref={this.searchInput}
            type="text"
            placeholder="Search"
            onChange={this.onInputChange}
            {...props}
          />
          {showClear && <ClearButton onClick={this.onClear}/>}
        </StyledForm>
      </Container>
    );
  }
}

export default withThemeIndex(SearchBar);
