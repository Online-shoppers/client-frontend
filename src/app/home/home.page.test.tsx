import { render } from '@testing-library/react';
import React from 'react';

import HomePage from './home.page';

// Mock the react-i18next useTranslation hook
jest.mock('react-i18next', () => ({}));

describe('HomePage', () => {
  it('should render welcome message', () => {
    const { getByText } = render(<HomePage />);
    const welcomeMessage = getByText('home:Welcome-message');
    expect(welcomeMessage).toBeInTheDocument();
  });

  it('should render welcome about us text', () => {
    const { getByText } = render(<HomePage />);
    const welcomeAboutUs = getByText('home:Welcome-about-us');
    expect(welcomeAboutUs).toBeInTheDocument();
  });

  it('should render category cards', () => {
    const { getByText } = render(<HomePage />);
    const beerCategory = getByText('categories:Beer');
    const snacksCategory = getByText('categories:Snacks');
    const accessoriesCategory = getByText('categories:Accessories');

    expect(beerCategory).toBeInTheDocument();
    expect(snacksCategory).toBeInTheDocument();
    expect(accessoriesCategory).toBeInTheDocument();
  });

  it('should render category card images', () => {
    const { getByAltText } = render(<HomePage />);
    const beerImage = getByAltText('Beer');
    const snacksImage = getByAltText('Snacks');
    const accessoriesImage = getByAltText('Accessories');

    expect(beerImage).toBeInTheDocument();
    expect(snacksImage).toBeInTheDocument();
    expect(accessoriesImage).toBeInTheDocument();
  });
});
