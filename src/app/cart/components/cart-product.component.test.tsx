import { fireEvent, render } from '@testing-library/react';

import CartProduct from './cart-product.component';

describe('CartProduct Component', () => {
  const sampleProps = {
    id: '1',
    name: 'Sample Product',
    imageUrl: 'sample-image.jpg',
    unitPrice: 10,
    amount: 2,
    onChange: jest.fn(),
  };

  it('renders product information correctly', () => {
    const { getByText, getByAltText } = render(<CartProduct {...sampleProps} />);

    expect(getByText('Sample Product')).toBeInTheDocument();
    expect(getByText('$10')).toBeInTheDocument();
    expect(getByText('$20')).toBeInTheDocument();

    expect(getByAltText('Beer')).toBeInTheDocument();
  });

  it('calls onChange when NumericStepper value is changed', () => {
    const { container } = render(<CartProduct {...sampleProps} />);

    const numericStepper = container.querySelector('[data-testid="numeric-stepper"]');

    if (numericStepper) {
      fireEvent.change(numericStepper, { target: { value: '3' } });

      expect(sampleProps.onChange).toHaveBeenCalledWith('1', 3);
    }
  });

  it('renders nothing when product amount is less than or equal to 0', () => {
    const zeroAmountProps = {
      ...sampleProps,
      amount: 0,
    };

    const { container } = render(<CartProduct {...zeroAmountProps} />);

    expect(container.firstChild).toBe(null);
  });
});
