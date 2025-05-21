import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, vi, beforeEach } from 'vitest';
import AutoCompleteSelect from './AutoCompleteSelect';

interface TestItem {
  id: number;
  name: string;
  description?: string;
}

describe('AutoCompleteSelect', () => {
  const mockItems: TestItem[] = [
    { id: 1, name: 'Item 1', description: 'Descrição 1' },
    { id: 2, name: 'Item 2', description: 'Descrição 2' },
    { id: 3, name: 'Test Item', description: 'Descrição 3' },
  ];

  const defaultProps = {
    label: 'Test Label',
    options: mockItems,
    getLabel: (item: TestItem) => item.name,
    getTooltip: (item: TestItem) => item.description,
    value: null,
    onChange: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders with label and input', () => {
    render(<AutoCompleteSelect {...defaultProps} />);
    
    expect(screen.getByText('Test Label')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('search')).toBeInTheDocument();
  });

  test('shows filtered options when typing', () => {
    render(<AutoCompleteSelect {...defaultProps} />);
    
    const input = screen.getByPlaceholderText('search');
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: 'Test' } });

    expect(screen.getByText('Test Item')).toBeInTheDocument();
    expect(screen.queryByText('Item 1')).not.toBeInTheDocument();
  });

  test('calls onChange when selecting an item', () => {
    render(<AutoCompleteSelect {...defaultProps} />);
    
    const input = screen.getByPlaceholderText('search');
    fireEvent.focus(input);
    fireEvent.click(screen.getByText('Item 1'));

    expect(defaultProps.onChange).toHaveBeenCalledTimes(1);
    expect(defaultProps.onChange).toHaveBeenCalledWith(mockItems[0]);
    expect(input).toHaveValue('Item 1');
  });

  test('shows "No options found" when there are no matches', () => {
    render(<AutoCompleteSelect {...defaultProps} />);
    
    const input = screen.getByPlaceholderText('search');
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: 'NonExistent' } });

    expect(screen.getByText('Nenhuma opção encontrada')).toBeInTheDocument();
  });

  test('closes dropdown when clicking outside', () => {
    render(<AutoCompleteSelect {...defaultProps} />);
    
    const input = screen.getByPlaceholderText('search');
    fireEvent.focus(input);
    expect(screen.getByText('Item 1')).toBeInTheDocument();

    // Simulate clicking outside
    fireEvent.mouseDown(document.body);
    
    expect(screen.queryByText('Item 1')).not.toBeInTheDocument();
  });

  test('shows tooltips when provided', () => {
    render(<AutoCompleteSelect {...defaultProps} />);
    
    const input = screen.getByPlaceholderText('search');
    fireEvent.focus(input);
    
    const item = screen.getByText('Item 1');
    expect(item).toHaveAttribute('title', 'Descrição 1');
  });

  test('updates input value when selecting an item', () => {
    render(<AutoCompleteSelect {...defaultProps} />);
    
    const input = screen.getByPlaceholderText('search');
    fireEvent.focus(input);
    fireEvent.click(screen.getByText('Item 1'));

    expect(input).toHaveValue('Item 1');
  });
}); 