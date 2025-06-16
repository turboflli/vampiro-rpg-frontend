import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, vi } from 'vitest';
import DiceRollTable from "./DiceRollTable";

describe('DiceRollTable', () => {
    test('should render', () => {
        render(<DiceRollTable />);
        expect(screen.getByText('diceRollTable')).toBeInTheDocument();
    });

    test('should render the correct number of dices when button is clicked', () => {
        render(<DiceRollTable />);
        const input = screen.getByTestId('number-dice-input');
        fireEvent.change(input, { target: { value: '5' } });
        const button = screen.getByText('Lançar Dados');
        fireEvent.click(button);
        const allDiceDivs = screen.getAllByTestId('dice-result', {
            className: /bg-(green|red)-100 text-(green|red)-700/
        });
        expect(allDiceDivs).toHaveLength(5);
    });
});