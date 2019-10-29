const breakpoints = {
  small: 320,
  phone: 576,
  tablet: 768,
  large: 992,
  desktop: 1200,
  hd: 1440,
};

const mq = n => {
  const bpArray = Object.keys(breakpoints).map(key => [key, breakpoints[key]]);

  const [result] = bpArray.reduce((acc, [name, size]) => {
    if (n === name) return [...acc, `@media (min-width: ${size}px)`];
    return acc;
  }, []);

  return result;
};

export default mq;
