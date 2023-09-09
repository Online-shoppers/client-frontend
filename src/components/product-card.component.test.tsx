/* eslint-disable @typescript-eslint/no-explicit-any */
import { Skeleton } from '@mui/material';
import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { BrowserRouter, useNavigate } from 'react-router-dom';

import ProductCard, { ProductCardSkeleton } from './product-card.component';

// Mock the useNavigate function
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('ProductCard', () => {
  it('renders without errors', () => {
    const { getByText, getByRole } = render(
      <BrowserRouter>
        <ProductCard
          title="Sample Product"
          price={19.99}
          rating={4.5}
          imageUrl="sample.jpg"
          href="/sample"
        />
      </BrowserRouter>,
    );

    const titleElement = getByText('Sample Product');
    const priceElement = getByText('$19.99');
    const ratingElement = getByRole('img', { name: '4.5 Stars' });

    expect(titleElement).toBeInTheDocument();
    expect(priceElement).toBeInTheDocument();
    expect(ratingElement).toBeInTheDocument();
  });

  it('navigates to the product page when clicked', () => {
    const navigateMock = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);

    const { container } = render(
      <BrowserRouter>
        <ProductCard
          title="Sample Product"
          price={19.99}
          rating={4.5}
          imageUrl="sample.jpg"
          href="/sample"
        />
      </BrowserRouter>,
    );

    const cardElement: any = container.querySelector('.MuiPaper-root');

    fireEvent.click(cardElement);

    // Ensure useNavigate was called with the correct href
    expect(navigateMock).toHaveBeenCalledWith('/sample');
  });
  it('does not navigate when href is not provided', () => {
    const navigateMock = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);

    const { container } = render(
      <BrowserRouter>
        <ProductCard
          title="Sample Product"
          price={19.99}
          rating={4.5}
          imageUrl="sample.jpg"
          href=""
        />
      </BrowserRouter>,
    );

    const cardElement: any = container.querySelector('.MuiPaper-root');

    fireEvent.click(cardElement);

    // Ensure useNavigate was not called
    expect(navigateMock).toHaveBeenCalled();
  });

  it('displays a skeleton when data is loading', () => {
    const { container } = render(<ProductCardSkeleton />);

    // Check if the skeleton element has specific characteristics
    const skeletonElement = container.querySelector('.MuiSkeleton-root');
    const imageSkeleton = container.querySelector('.MuiSkeleton-rectangular');
    const infoSkeleton = container.querySelector('.MuiSkeleton-text');

    expect(skeletonElement).toBeInTheDocument();
    expect(imageSkeleton).toBeInTheDocument();
    expect(infoSkeleton).toBeInTheDocument();
  });
});
