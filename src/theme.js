export const theme = {
  colors: [
    {
      'primary': '#FDF8E3',
      'secondary': '#AB2E4C',
      'selection': '#ffb7b7',
    },
    {
      'secondary': '#FDF8E3',
      'primary': '#AB2E4C',
      'selection': '#ffb7b7',
    },
    {
      'primary': '#FDF8E3',
      'secondary': '#242D49',
      'selection': '#b7dbff',
    },
    {
      'secondary': '#FDF8E3',
      'primary': '#242D49',
      'selection': '#b7dbff',
    },
    {
      'primary': '#FDF8E3',
      'secondary': '#151515',
      'selection': '#CCCCCC',
    },
    {
      'secondary': '#FDF8E3',
      'primary': '#151515',
      'selection': '#CCCCCC',
    },
    {
      'primary': '#FFFFFF',
      'secondary': '#151515',
      'selection': '#CCCCCC',
    },
    {
      'secondary': '#FFFFFF',
      'primary': '#151515',
      'selection': '#CCCCCC',
    },
  ],
};

export const getTheme = (inverted=false) => {
  if (inverted) {
    return theme.colors.map(color => ({
      'primary': color.secondary,
      'secondary': color.primary,
    }));
  } else {
    return theme;
  }
};
