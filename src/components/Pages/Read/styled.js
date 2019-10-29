import styled from '@emotion/styled';
import mq from 'mediaquery';

export const Container = styled.div`
  width: 100%;
  height: 100%;

  background-color: ${props => props.theme.colors[props.themeIndex].secondary};
  color: ${props => props.theme.colors[props.themeIndex].primary};
  transition: color 0.2s ease-out, background-color 0.2s ease-out;
  overflow: auto;

  @media print {
    color: #000;
    background-color: #FFF;
  }
`;

export const ArticleContainer = styled.div`
  width: 100%;
  min-height: calc(100vh - 70px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  font-size: ${props => {
    switch (props.fontSize) {
      case 1: {
        return '12px';
      }
      case 2: {
        return '14px';
      }
      case 3: {
        return '16px';
      }
      case 4: {
        return '18px';
      }
      case 5: {
        return '21px';
      }
      case 6: {
        return '24px';
      }
      case 7: {
        return '26px';
      }
      case 8: {
        return '28px';
      }
      default: {
        return '20px';
      }
    }
  }};
`;

export const ContentContainer = styled.div`
  max-width: 720px;

  font-size: 1em;
  line-height: 1.7em;
  letter-spacing: 0.01em;
  margin-bottom: 150px;
  padding: 0 20px;

  @media print {
    margin-bottom: 0;    
  }

  p, a, h1, h2, h3, figcaption, em, strong, small {
    ::selection {
      background-color: ${props => props.theme.colors[props.themeIndex].selection} !important; /* WebKit/Blink Browsers */
    }
    ::-moz-selection {
      background-color: ${props => props.theme.colors[props.themeIndex].selection} !important; /* Gecko Browsers */
    }
  }

  & p {
    margin: 0;
  }

  & a {
    color: ${props => props.theme.colors[props.themeIndex].primary};
    @media print {
      color: #999;
    }
  }

  & h2 {
    font-style: italic;
    text-align: center;
    font-weight: normal;
  }

  & img {
    height: 100%;
    max-width: 100%;
    border-radius: 8px;
    margin: 0px auto;
    vertical-align: middle;
  }

  & img:not([src]), 
  & img[src=""] {
    display: none;
  }

  & figure {
    margin: 40px 10px;
    text-align: center;

    ${mq('tablet')} {
      margin: 60px 40px;
    }

    @media print {
      margin: 20px 10px;
      page-break-inside: avoid;
    }
  }

  & figcaption {
    font-style: italic;
    line-height: 1.5em;
    font-size: 0.9em;
    letter-spacing: 0;
    margin: 0 -5%;
    padding: 1.25em 0px 0px;

    @media print {
      margin: 0;
      padding: 0;
    }
  }

  & blockquote {
    line-height: 1.5em;
    font-style: italic;
    border-left: 4px solid ${props => props.theme.colors[props.themeIndex].primary};
    padding-left: 20px;
    margin: 30px;

    ${mq('tablet')} {
      margin: 50px;
      line-height: 2em;
    }
    @media print {
      border: 0;
      margin: 20px;
    }
  }
`;

export const StyledTitle = styled.h1`
  text-align: center;
  font-size: 2.1em;
  line-height: 1.3em;
  max-width: 930px;
  padding: 0 20px;
  letter-spacing: 0;

  ${mq('phone')} {
    font-size: 2.1em;
  }
  ${mq('tablet')} {
    font-size: 3.1em;
  }

  ::selection {
    background-color: ${props => props.theme.colors[props.themeIndex].selection} !important; /* WebKit/Blink Browsers */
  }
  ::-moz-selection {
    background-color: ${props => props.theme.colors[props.themeIndex].selection} !important; /* Gecko Browsers */
  }
`;
