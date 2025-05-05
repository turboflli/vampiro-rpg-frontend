import { render, screen, fireEvent } from '@testing-library/react';
import TraitTypeSelect from './TraitTypeSelect';

describe('TraitTypeSelect', () => {
  it('Renderiza todas as opções de tipo de traço', () => {
    const mockOnChange = vi.fn();
    render(<TraitTypeSelect onChange={mockOnChange} />);
    
    // Verifica se todas as opções estão presentes
    expect(screen.getByText('--Selecione--')).toBeInTheDocument();
    expect(screen.getByText('Físico')).toBeInTheDocument();
    expect(screen.getByText('Mental')).toBeInTheDocument();
    expect(screen.getByText('Social')).toBeInTheDocument();
    expect(screen.getByText('Sobrenatural')).toBeInTheDocument();
  });

  it('chama onChange com o valor correto quando uma opção é selecionada', () => {
    const mockOnChange = vi.fn();
    render(<TraitTypeSelect onChange={mockOnChange} />);
    
    // Seleciona uma opção
    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'Fisico' }
    });

    // Verifica se onChange foi chamado com o valor correto
    expect(mockOnChange).toHaveBeenCalledWith('Fisico');
  });

  it('renderiza com as classes de estilo corretas', () => {
    const mockOnChange = vi.fn();
    render(<TraitTypeSelect onChange={mockOnChange} />);
    
    const container = screen.getByRole('combobox').parentElement;
    expect(container).toHaveClass('flex', 'items-center', 'mb-1', 'border', 'border-gray-300', 'rounded-md', 'p-2', 'shadow-sm');
  });
}); 