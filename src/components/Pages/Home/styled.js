import styled from '@emotion/styled';
import mq from 'mediaquery';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;

  background-color: ${props => props.theme.colors[props.themeIndex].primary};
  transition: background-color 0.2s ease-out;
`;

export const CenterContainer = styled.div`
  display: flex;
  height: calc(100% - 193px);
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: -20px;
`;

export const Title = styled.h1`
  font-family: 'EB Garamond', serif;
  font-weight: 700;

  color: ${props => props.theme.colors[props.themeIndex].secondary};
  transition: color 0.2s ease-out;
  margin-bottom: 0;
  margin-top: 50px;
  text-align: center;
  user-select: none;

  font-size: 3.5em;
  ${mq('phone')} {
    font-size: 4em;
  }
`;

export const Subtitle = styled.h3`
  color: ${props => props.theme.colors[props.themeIndex].secondary};
  transition: color 0.2s ease-out;
  text-align: center;
  font-weight: normal;
  letter-spacing: 0.5px;
  word-spacing: 0.5px;
  padding-top: 50px;
  font-size: 18px;
  width: 300px;

  ${mq('phone')} {
    font-size: 18px;
    width: 350px;
  }
  ${mq('tablet')} {
    font-size: 22px;
    width: 600px;
    padding-top: 90px;
  }
`;

export const Footer = styled.span`
  display: block;
  color: ${props => props.theme.colors[props.themeIndex].secondary};
  font-size: .9em;
  font-family: courier, serif;
  text-align: center;
`;

export const CubeGrid = styled.div`
  margin: 20px auto;
  margin-top: 90px;
  width: 40px;
  height: 40px;
  position: relative;
  -webkit-transform: rotateZ(45deg);
          transform: rotateZ(45deg);

  & .sk-cube {
    float: left;
    width: 50%;
    height: 50%;
    position: relative;
    -webkit-transform: scale(1.1);
        -ms-transform: scale(1.1);
            transform: scale(1.1); 
  }
  & .sk-cube:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${props => props.theme.colors[props.themeIndex].secondary};
    -webkit-animation: sk-foldCubeAngle 2.4s infinite linear both;
            animation: sk-foldCubeAngle 2.4s infinite linear both;
    -webkit-transform-origin: 100% 100%;
        -ms-transform-origin: 100% 100%;
            transform-origin: 100% 100%;
  }
  & .sk-cube2 {
    -webkit-transform: scale(1.1) rotateZ(90deg);
            transform: scale(1.1) rotateZ(90deg);
  }
  & .sk-cube3 {
    -webkit-transform: scale(1.1) rotateZ(180deg);
            transform: scale(1.1) rotateZ(180deg);
  }
  & .sk-cube4 {
    -webkit-transform: scale(1.1) rotateZ(270deg);
            transform: scale(1.1) rotateZ(270deg);
  }
  & .sk-cube2:before {
    -webkit-animation-delay: 0.3s;
            animation-delay: 0.3s;
  }
  & .sk-cube3:before {
    -webkit-animation-delay: 0.6s;
            animation-delay: 0.6s; 
  }
  & .sk-cube4:before {
    -webkit-animation-delay: 0.9s;
            animation-delay: 0.9s;
  }
  @-webkit-keyframes sk-foldCubeAngle {
    0%, 10% {
      -webkit-transform: perspective(140px) rotateX(-180deg);
              transform: perspective(140px) rotateX(-180deg);
      opacity: 0; 
    } 25%, 75% {
      -webkit-transform: perspective(140px) rotateX(0deg);
              transform: perspective(140px) rotateX(0deg);
      opacity: 1; 
    } 90%, 100% {
      -webkit-transform: perspective(140px) rotateY(180deg);
              transform: perspective(140px) rotateY(180deg);
      opacity: 0; 
    } 
  }

  @keyframes sk-foldCubeAngle {
    0%, 10% {
      -webkit-transform: perspective(140px) rotateX(-180deg);
              transform: perspective(140px) rotateX(-180deg);
      opacity: 0; 
    } 25%, 75% {
      -webkit-transform: perspective(140px) rotateX(0deg);
              transform: perspective(140px) rotateX(0deg);
      opacity: 1; 
    } 90%, 100% {
      -webkit-transform: perspective(140px) rotateY(180deg);
              transform: perspective(140px) rotateY(180deg);
      opacity: 0; 
    }
  }
`;
