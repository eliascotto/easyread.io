import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import mq from 'mediaquery';

export const Container = styled(motion.div)`
  width: 100%;
  height: 70px;

  display: flex;
  flex-direction: row;
  align-content: start;
  justify-content: space-between;

  /* & > :only-child {
    margin-left: auto;
    margin-right: auto;
  } */

  box-sizing: border-box;

  padding: 0 10px;
  ${mq('phone')} {
    padding: 0 20px;
  }

  @media print {
    display: none;    
  }
`;

export const IconWrapper = styled(motion.div)`
  margin: 0 4px;
  padding: 0 5px;
  cursor: pointer;

  ${mq('phone')} {
    padding: 0 10px;
    margin: 0 7px;
  }
`;

export const StyledSVG = styled.svg`
  height: 100%;
`;
