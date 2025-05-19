import { render, screen, fireEvent, act } from '@testing-library/react';
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

  it('Renderiza com label e input', () => {
    render(<AutoCompleteSelect {...defaultProps} />);
    
    expect(screen.getByText('Test Label')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Digite para filtrar...')).toBeInTheDocument();
  });

  it('Mostra opções filtradas ao digitar', () => {
    render(<AutoCompleteSelect {...defaultProps} />);
    
    const input = screen.getByPlaceholderText('Digite para filtrar...');
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: 'Test' } });

    expect(screen.getByText('Test Item')).toBeInTheDocument();
    expect(screen.queryByText('Item 1')).not.toBeInTheDocument();
  });

  it('Chama onChange quando seleciona um item', () => {
    render(<AutoCompleteSelect {...defaultProps} />);
    
    const input = screen.getByPlaceholderText('Digite para filtrar...');
    fireEvent.focus(input);
    fireEvent.click(screen.getByText('Item 1'));

    expect(defaultProps.onChange).toHaveBeenCalledWith(mockItems[0]);
    expect(input).toHaveValue('Item 1');
  });

  it('Mostra "Nenhuma opção encontrada" quando não há correspondências', () => {
    render(<AutoCompleteSelect {...defaultProps} />);
    
    const input = screen.getByPlaceholderText('Digite para filtrar...');
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: 'NonExistent' } });

    expect(screen.getByText('Nenhuma opção encontrada')).toBeInTheDocument();
  });

  it('Fecha dropdown ao clicar fora', () => {
    render(<AutoCompleteSelect {...defaultProps} />);
    
    const input = screen.getByPlaceholderText('Digite para filtrar...');
    fireEvent.focus(input);
    expect(screen.getByText('Item 1')).toBeInTheDocument();

    // Simulate clicking outside
    fireEvent.mouseDown(document.body);
    
    expect(screen.queryByText('Item 1')).not.toBeInTheDocument();
  });

  it('Mostra tooltips quando fornecidos', () => {
    render(<AutoCompleteSelect {...defaultProps} />);
    
    const input = screen.getByPlaceholderText('Digite para filtrar...');
    fireEvent.focus(input);
    
    const item = screen.getByText('Item 1');
    expect(item).toHaveAttribute('title', 'Descrição 1');
  });

  it('Atualiza o valor do input ao selecionar um item', () => {
    render(<AutoCompleteSelect {...defaultProps} />);
    
    const input = screen.getByPlaceholderText('Digite para filtrar...');
    fireEvent.focus(input);
    fireEvent.click(screen.getByText('Item 1'));

    expect(input).toHaveValue('Item 1');
  });
}); 