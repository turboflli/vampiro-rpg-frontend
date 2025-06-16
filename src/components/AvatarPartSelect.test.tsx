import { render, screen, fireEvent } from "@testing-library/react";
import AvatarPartSelect from "./AvatarPartSelect";
import { vi } from "vitest";

describe('AvatarPartSelect', () => {
    const defaultProps = {
        part: "test",
        options: ["A", "B", "C"],
        onChange: vi.fn(),
        acceptUndefined: true,
    };
    test('should render', () => {
        render(<AvatarPartSelect {...defaultProps} />);
        expect(screen.getByText('test')).toBeInTheDocument();
    });
    test('should call onChange when next option is selected', () => {
        render(<AvatarPartSelect {...defaultProps} value="" />);
        fireEvent.click(screen.getByRole('button', { name: /optionFoward/ }));
        expect(defaultProps.onChange).toHaveBeenCalledWith('A');
    });
    test('should call onChange when previous option is selected', () => {
        render(<AvatarPartSelect {...defaultProps} value="" />);
        fireEvent.click(screen.getByRole('button', { name: /optionBack/ }));
        expect(defaultProps.onChange).toHaveBeenCalledWith('C');
    });
    test('should call onChange with undefined when last option is advanced', () => {
        render(<AvatarPartSelect {...defaultProps} value="C" />);
        fireEvent.click(screen.getByRole('button', { name: /optionFoward/ }));
        expect(defaultProps.onChange).toHaveBeenCalledWith('');
    });
    test('should call onChange with undefined when first option is backed', () => {
        render(<AvatarPartSelect {...defaultProps} value="A" />);
        fireEvent.click(screen.getByRole('button', { name: /optionBack/ }));
        expect(defaultProps.onChange).toHaveBeenCalledWith('');
    });
});
