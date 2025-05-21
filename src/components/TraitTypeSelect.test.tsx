import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, vi } from 'vitest';
import TraitTypeSelect from './TraitTypeSelect';

describe('TraitTypeSelect', () => {
  test('renders all trait type options', () => {
    const mockOnChange = vi.fn();
    render(<TraitTypeSelect onChange={mockOnChange} />);
    
    // Check if all options are present
    expect(screen.getByText('select')).toBeInTheDocument();
    expect(screen.getByText('physical')).toBeInTheDocument();
    expect(screen.getByText('mental')).toBeInTheDocument();
    expect(screen.getByText('social')).toBeInTheDocument();
    expect(screen.getByText('supernatural')).toBeInTheDocument();
  });

  test('calls onChange with correct value when an option is selected', () => {
    const mockOnChange = vi.fn();
    render(<TraitTypeSelect onChange={mockOnChange} />);
    
    // Select an option
    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'Fisico' }
    });

    // Check if onChange was called with the correct value
    expect(mockOnChange).toHaveBeenCalledWith('Fisico');
  });

  test('renders with correct style classes', () => {
    const mockOnChange = vi.fn();
    render(<TraitTypeSelect onChange={mockOnChange} />);
    
    const container = screen.getByRole('combobox').parentElement;
    expect(container).toHaveClass('flex items-center mb-1 border border-gray-300 rounded-md p-2 shadow-sm');
  });
}); 