import { ThemeProvider } from '@mui/material/styles';
import { render } from '@testing-library/react';

import { theme } from 'theme';

import HomePage from './home.page';

describe('HomePage', () => {
  it('should render welcome message', () => {
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <HomePage />
      </ThemeProvider>,
    );

    const welcomeMessage = getByText('home:Welcome-message');
    expect(welcomeMessage).toBeInTheDocument();
  });
});
