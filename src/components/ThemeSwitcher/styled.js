import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import mq from 'mediaquery';

export const IconWrapper = styled(motion.div)`
  margin: 0 4px;
  padding: 0 5px;
  cursor: pointer;
  height: 30px;
  user-select: none;

  ${mq('phone')} {
    padding: 0 10px;
    margin: 0 7px;
  }
`;

export const StyledSVG = styled.svg`
  height: 100%;
`;

export const MenuContainer = styled.div`
  height: 70px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
