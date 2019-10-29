import React from 'react';
import { useTheme } from 'emotion-theming';
import { useThemeIndex } from 'components/ThemeIndexProvider';
import { IconWrapper, StyledSVG } from './styled';

const getColor = (color, inverted) => {
  return inverted? color.secondary : color.primary
};

export const MinusIcon = ({ mainColor, leftColor, rightColor, ...props }) => {
  const theme = useTheme();
  const { themeIndex } = useThemeIndex();
  const colorObj = theme.colors[themeIndex];
  const color = getColor(colorObj, true);

  return (
    <IconWrapper {...props}>
      <StyledSVG version='1.1' viewBox='0 -12 25 25' xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink' height="3" width="21">
        <g opacity='1'>
            <path fill={color} fillOpacity='1' opacity='1' fillRule='evenodd' d='M1.5000000000002274,0 L19.500000000000227,0 C20.32787253674123,0 21.000000000000227,0.672127463259 21.000000000000227,1.5 C21.000000000000227,2.3278725367410003 20.32787253674123,3 19.500000000000227,3 L1.5000000000002274,3 C0.6721274632592276,3 2.275957200481571e-13,2.3278725367410003 2.2737367544323206e-13,1.5 C2.2737367544323206e-13,0.6721274632590002 0.6721274632592271,2.220446049250313e-16 1.5000000000002274,0Z'/>
        </g>
      </StyledSVG>
    </IconWrapper>
  );
};

export const PlusIcon = ({ mainColor, leftColor, rightColor, ...props }) => {
  const theme = useTheme();
  const { themeIndex } = useThemeIndex();
  const colorObj = theme.colors[themeIndex];
  const color = getColor(colorObj, true);

  return (
    <IconWrapper {...props}>
      <StyledSVG version='1.1' viewBox='0 -2 25 25' xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink' height="21" width="21">
        <g opacity='1'>
            <path fill={color} fillOpacity='1' opacity='1' fillRule='evenodd' d='M10.5,0 C11.327880859375,0 12,0.6721267700195312 12,1.5 L12,9 L19.5,9 C20.327880859375,9 21,9.672126770019531 21,10.5 C21,11.327873229980469 20.327880859375,12 19.5,12 L12,12 L12,19.5 C12,20.32787322998047 11.327880859375,21 10.5,21 C9.672119140625,21 9,20.32787322998047 9,19.5 L9,12 L1.5,12 C0.672119140625,12 0,11.327873229980469 0,10.5 C0,9.672126770019531 0.672119140625,9 1.5,9 L9,9 L9,1.5 C9,0.6721267700195312 9.672119140625,0 10.5,0Z'/>
        </g>
      </StyledSVG>
    </IconWrapper>
  );
};
