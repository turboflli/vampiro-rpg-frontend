import { render, screen, fireEvent } from '@testing-library/react';
import DotRating from './DotRating';

describe('DotRating', () => {
  it('renderiza a quantidade correta de pontos', () => {
    render(<DotRating value={3} onChange={() => {}} maxValue={5} />);
    const dots = screen.getAllByRole('button');
    expect(dots.length).toBe(5);
  });

  it('chama onChange com o valor correto ao clicar', () => {
    const handleChange = vi.fn();
    render(<DotRating value={0} onChange={handleChange} maxValue={5} />);
    const dots = screen.getAllByRole('button');
    fireEvent.click(dots[2]);
    expect(handleChange).toHaveBeenCalledWith(3); // valor humano (1-indexado)
  });

  it('chama onChange com o valor correto ao desclicar', () => {
    const handleChange = vi.fn();
    render(<DotRating value={3} onChange={handleChange} maxValue={5} />);
    const dots = screen.getAllByRole('button');
    fireEvent.click(dots[2]); // desmarcando o terceiro ponto
    expect(handleChange).toHaveBeenCalledWith(2); // valor humano (1-indexado)
  });
});