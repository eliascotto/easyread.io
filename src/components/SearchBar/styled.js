import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import mq from 'mediaquery';


export const Container = styled.div`
  display: flex;
  align-items: center;
`;

export const IconWrapper = styled(motion.div)`
  height: 100%;
  margin: 0 4px;
  padding: 0 5px;
  cursor: pointer;
  display: inline-block;
  user-select: none;

  ${mq('phone')} {
    padding: 0 10px;
    margin: 0 7px;
  }
`;

export const StyledSVG = styled.svg`
  height: 100%;
`;

export const SearchInput = styled.input`
  background-color: transparent;
  box-shadow: none;

  font-family: 'Courier New', Courier, monospace;

  padding-left: 10px;
  padding-right: 25px;
  padding-bottom: 3px;
  border: 0;
  border-bottom: 2px solid ${props => props.theme.colors[props.themeIndex].primary};

  &, &::placeholder {
    color: ${props => props.theme.colors[props.themeIndex].primary};
    font-size: 18px;
  }

  &::placeholder {
    opacity: .4;
  }

  &:focus {
    outline: none;
  }

  @media (max-width: 576px) {
    width: 130px;
  }
`;

export const ClearIcon = styled.div`
  cursor: pointer;
  margin-left: -18px;
`;

export const StyledForm = styled(motion.form)`
  display: flex;
  align-items: center;
  overflow: hidden;
`;
