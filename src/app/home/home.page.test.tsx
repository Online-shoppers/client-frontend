import { render } from '@testing-library/react';
import React from 'react';

import HomePage from './home.page';

describe('HomePage', () => {
  it('should render welcome message', () => {
    const { getByText } = render(<HomePage />);
    const welcomeMessage = getByText('home:Welcome-message');
    expect(welcomeMessage).toBeInTheDocument();
  });
});
