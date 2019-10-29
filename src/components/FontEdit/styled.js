import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import mq from 'mediaquery';

export const TypoButton = styled(motion.div)`
  margin: 0 4px;
  padding: 0 5px;
  cursor: pointer;

  & > p {
    font-family: 'Helvetica Neue', 'Arial', sans-serif;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 24px;
    line-height: 16px;
    user-select: none;

    & > small {
      font-size: 12px;
    }
  }

  ${mq('phone')} {
    padding: 0 10px;
    margin: 0 7px;
  }
`;

export const IconWrapper = styled.div`
  margin: 0 7px;
  padding: 0 5px;
  cursor: pointer;
  height: 30px;

  ${mq('phone')} {
    padding: 0 10px;
  }
`;

export const StyledSVG = styled.svg`
  height: 100%;
`;

export const SettingsContainer = styled.div`
  height: 70px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  & > ${IconWrapper} {
    margin: 0 12px;
    user-select: none;
  }
`;

export const AIcon = styled.span`
  user-select: none;
  display: block;
  font-family: 'Helvetica Neue', 'Arial', sans-serif;
  font-weight: 900;
  font-size: 34px;
  color: ${props => props.theme.colors[props.themeIndex].secondary};
`;
