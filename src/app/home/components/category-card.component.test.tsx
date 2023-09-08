/* eslint-disable @typescript-eslint/no-explicit-any */
import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { BrowserRouter, MemoryRouter, NavigateFunction, useNavigate } from 'react-router-dom';

import CategoryCard from './category-card.component';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('CategoryCard Component', () => {
  const sampleProps = {
    name: 'Sample Category',
    category: 'sample-category',
    imageUrl: 'sample-image-url.jpg',
  };

  it('renders without errors with the correct props', () => {
    const { getByText, getByAltText } = render(
      <BrowserRouter>
        <CategoryCard {...sampleProps} />
      </BrowserRouter>,
    );

    expect(getByText('Sample Category')).toBeInTheDocument();
    expect(getByAltText('sample-category')).toBeInTheDocument();
  });

  it('handles click event and calls navigate function', () => {
    const { container } = render(
      <MemoryRouter>
        <CategoryCard {...sampleProps} />
      </MemoryRouter>,
    );

    fireEvent.click(container.querySelector('.MuiPaper-root') as HTMLElement);

    expect(mockNavigate).toHaveBeenCalledWith('/sample-category');
  });

  it('applies CSS classes and styles correctly', () => {
    const { container } = render(
      <BrowserRouter>
        <CategoryCard {...sampleProps} />
      </BrowserRouter>,
    );

    expect(container.firstChild).toHaveClass('MuiPaper-root');
  });

  it('handles missing or invalid props gracefully', () => {
    const { queryByText, queryByAltText } = render(
      <BrowserRouter>
        <CategoryCard category="" name="" imageUrl="" />
      </BrowserRouter>,
    );

    expect(queryByText('Sample Category')).toBeNull();

    expect(queryByAltText('')).toBeInTheDocument();
  });
});
