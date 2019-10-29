import styled from '@emotion/styled';
import { motion } from 'framer-motion'
import mq from 'mediaquery';

export const StyledInput = styled.input`
  background-color: transparent;
  box-shadow: none;

  height: 70px;
  transition: width .3s;

  border: 0;
  border-bottom: 2px solid ${props => props.theme.colors[props.themeIndex].secondary};

  &, &::placeholder {
    text-align: left;
    font-family: 'EB Garamond', serif;
    color: ${props => props.theme.colors[props.themeIndex].secondary};
    font-size: 32px;

    ${mq('small')} {
      font-size: 30px;
    }
    ${mq('phone')} {
      font-size: 42px;
    }
  }

  &::placeholder {
    opacity: .4;
  }

  &:focus {
    outline: none;
    width: 70vw;
    transition: width .3s;

    ${mq('phone')} {
      width: 70vw;
    }
    ${mq('tablet')} {
      width: 550px;
    }
    ${mq('large')} {
      width: 750px;
    }
    ${mq('hd')} {
      width: 850px;
    }
  }

  width: 70vw;
  ${mq('phone')} {
    width: 70vw;
  }
  ${mq('tablet')} {
    width: 500px;
  }
  ${mq('large')} {
    width: 600px;
  }
  ${mq('hd')} {
    width: 650px;
  }
`;

export const StyledButton = styled(motion.button)`
  margin: 0 20px;
  cursor: pointer;

  background-color: ${props => props.theme.colors[props.themeIndex].secondary};
  color: ${props => props.theme.colors[props.themeIndex].primary};
  border: 0;
  

  &:focus, &:active {
    outline: none;
  }

  ${mq('small')} {
    padding: 7.5px 15px;
    margin: 0 10px;
  }
  ${mq('phone')} {
    padding: 10px 20px;
    margin: 0 20px;
  }
`;
