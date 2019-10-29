import styled from '@emotion/styled';
import { motion } from 'framer-motion';

export const Container = styled(motion.div)`
  width: 100%;

  box-shadow: inset 0 3px 8px rgba(0,0,0,.31);
  overflow: hidden;

  @media print {
    display: none;    
  }
`;
