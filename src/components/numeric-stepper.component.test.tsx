import { fireEvent, render } from '@testing-library/react';
import React from 'react';

import NumericStepper from './numeric-stepper.component';

describe('NumericStepper', () => {
  it('renders without errors', () => {
    const onChangeMock = jest.fn();
    render(<NumericStepper onChange={onChangeMock} />);
  });

  it('displays the initial value', () => {
    const initialValue = 5; // Change this to the desired initial value
    const { getByText } = render(<NumericStepper value={initialValue} onChange={() => {}} />);
    const valueElement = getByText(initialValue.toString());
    expect(valueElement).toBeInTheDocument();
  });

  it('increases and decreases the value when buttons are clicked', () => {
    const onChangeMock = jest.fn();
    const { getByText, getByTestId } = render(
      <NumericStepper value={3} min={1} max={5} onChange={onChangeMock} />,
    );

    const increaseButton = getByTestId('increase-button');
    const decreaseButton = getByTestId('decrease-button');

    fireEvent.click(increaseButton);
    expect(onChangeMock).toHaveBeenCalledWith(4);

    fireEvent.click(decreaseButton);
    expect(onChangeMock).toHaveBeenCalledWith(3);

    const valueElement = getByText('3');
    expect(valueElement).toBeInTheDocument();
  });
});
