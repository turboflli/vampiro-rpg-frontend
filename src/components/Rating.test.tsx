import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, vi } from 'vitest';
import '@testing-library/jest-dom';
import Rating from './Rating';

describe('Rating', () => {
  test('renders the correct number of points', () => {
    render(<Rating value={3} onChange={() => {}} maxValue={5} filledClass="" emptyClass="" shape="" />);
    const dots = screen.getAllByRole('button');
    expect(dots.length).toBe(5);
  });

  test('calls onChange with the correct value when clicking', () => {
    const handleChange = vi.fn();
    render(<Rating value={0} onChange={handleChange} maxValue={5} filledClass="" emptyClass="" shape="" />);
    const dots = screen.getAllByRole('button');
    fireEvent.click(dots[2]);
    expect(handleChange).toHaveBeenCalledWith(3); // human value (1-indexed)
  });

  test('calls onChange with the correct value when unclicking', () => {
    const handleChange = vi.fn();
    render(<Rating value={3} onChange={handleChange} maxValue={5} filledClass="" emptyClass="" shape="" />);
    const dots = screen.getAllByRole('button');
    fireEvent.click(dots[2]); // unclicking the third point
    expect(handleChange).toHaveBeenCalledWith(2); // human value (1-indexed)
  });
});