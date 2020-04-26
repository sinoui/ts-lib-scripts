import React from 'react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme, createTheme } from '@sinoui/theme';
import { useThemeUI } from 'theme-ui';
import lightBlue from '@sinoui/theme/colors/lightBlue';

const darkTheme = createTheme({
  palette: {
    type: 'dark',
    primary: lightBlue,
  },
});

export default ({ children }: { children: React.ReactNode }) => {
  const { colorMode } = useThemeUI();
  return (
    <ThemeProvider theme={colorMode === 'dark' ? darkTheme : defaultTheme}>
      <div>{children}</div>
    </ThemeProvider>
  );
};
