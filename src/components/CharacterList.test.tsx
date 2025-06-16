// CharacterList.test.tsx
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import CharacterList from "./CharacterList";
import { vi } from "vitest";
import { MemoryRouter } from "react-router-dom";

// simula o módulo
vi.mock("../services/characterService", () => ({
    getSummary: vi.fn(),
    getCharacterByName: vi.fn(),
}));

import { getSummary, getCharacterByName } from "../services/characterService";


describe("CharacterList", () => {
  it("display the characters returned from the server", async () => {
    (getSummary as jest.Mock).mockResolvedValue([
      { id: 1, name: "Luna", generation: 5, clanName: "Tzimisce", roadName: "" },
      { id: 2, name: "Victor", generation: 9, clanName: "Brujah", roadName: "" },
    ]);

    render(<MemoryRouter>
        <CharacterList />
      </MemoryRouter>);

    await waitFor(() => {
      expect(screen.getByText("Luna")).toBeInTheDocument();
      expect(screen.getByText("Victor")).toBeInTheDocument();
      expect(screen.getByText(/Tzimisce/i)).toBeInTheDocument();
      expect(screen.getByText(/Brujah/i)).toBeInTheDocument();
    });
  });

  it("navegates to the correct page when a character is clicked", async () => {
    
    (getSummary as jest.Mock).mockResolvedValue([
      { id: 42, name: "Luna", generation: 5, clanName: "Tzimisce", roadName: "" },
    ]);

    render(<MemoryRouter>
        <CharacterList />
      </MemoryRouter>);

    await waitFor(() => {
        const link = screen.getByRole("link", { name: /luna/i }); // supondo personagem "Luna"
        expect(link).toHaveAttribute("href", "/edit/42"); // ou qualquer ID que você mockar
    });
  });

  it("searches for a character by name", async () => {
    (getSummary as jest.Mock).mockResolvedValue([
      { id: 1, name: "Luna", generation: 5, clanName: "Tzimisce", roadName: "" },
      { id: 2, name: "Victor", generation: 9, clanName: "Brujah", roadName: "" },
    ]);

    (getCharacterByName as jest.Mock).mockResolvedValue([
        { id: 1, name: "Luna", generation: 5, clanName: "Tzimisce", roadName: "" },
      ]);

    render(<MemoryRouter>
        <CharacterList />
      </MemoryRouter>);
    const input = screen.getByRole("textbox", {placeholder: /searchCharacter/i});
    fireEvent.change(input, { target: { value: "Luna" } });
    await waitFor(() => {
      expect(screen.getByText("Luna")).toBeInTheDocument();
      expect(screen.queryByText("Victor")).not.toBeInTheDocument();
    });
  });
});
