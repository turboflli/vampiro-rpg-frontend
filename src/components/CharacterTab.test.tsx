import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CharacterTab from "./CharacterTab";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { vi } from "vitest";

vi.mock("../services/characterService", () => ({
    getAllClans: vi.fn(),
    getAllRoads: vi.fn(),
    getCharacter: vi.fn(),
    updateCharacter: vi.fn(),
    createCharacter: vi.fn(),
}));

vi.mock("../services/avatarService", () => ({
    getAvatar: vi.fn(),
    updateAvatar: vi.fn(),
    createAvatar: vi.fn(),
}));

import { createCharacter, getAllClans, getAllRoads, getCharacter, updateCharacter } from "../services/characterService";
import { createAvatar, getAvatar, updateAvatar } from "../services/avatarService";
import { initialCharacter } from "../types/initials";

const clans = [
    { id: 1, name: "Tzimisce", weakness: "dormir com terra", discipline1: "vissisitude", discipline2: "auspex", discipline3: "animalismo" },
    { id: 2, name: "Brujah", weakness: "Raiva", discipline1: "potencia", discipline2: "fortitude", discipline3: "presença" },
];
const roads = [
    { id: 1, name: "Road of the test1", pathName: "Path of the test1", sins: "", ethics: "", aura: "", useConscience: false, useSelf_control: false },
    { id: 2, name: "Road of the test2", pathName: "Path of the test2", sins: "", ethics: "", aura: "", useConscience: true, useSelf_control: true },
];

(getAllClans as jest.Mock).mockResolvedValue(clans);
(getAllRoads as jest.Mock).mockResolvedValue(roads);
(getCharacter as jest.Mock).mockResolvedValue({...initialCharacter, id: 1, name: "test", generation: 5, clanId: 1, roadId: 1, sire: "test", concept: "test", nature: "test", demeanor: "test",});
(updateCharacter as jest.Mock).mockResolvedValue({...initialCharacter, id: 1, name: "test", generation: 5, clanId: 1, roadId: 1, sire: "test", concept: "test", nature: "test", demeanor: "test",});
(createCharacter as jest.Mock).mockResolvedValue({...initialCharacter, id: 1, name: "test", generation: 5, clanId: 1, roadId: 1, sire: "test", concept: "test", nature: "test", demeanor: "test",});
(getAvatar as jest.Mock).mockResolvedValue({id: 1});
(updateAvatar as jest.Mock).mockResolvedValue({id: 1});
(createAvatar as jest.Mock).mockResolvedValue({id: 1});

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("CharacterTab", () => {

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("should load the clans and roads", () => {
        render(<MemoryRouter>
            <CharacterTab />
          </MemoryRouter>);
        expect(getAllClans).toHaveBeenCalled();
        expect(getAllRoads).toHaveBeenCalled();
    });

    it("should load a character with its avatar", () => {
        render(
          <MemoryRouter initialEntries={["/edit/1"]}>
            <Routes>
              <Route path="/edit/:id" element={<CharacterTab />} />
            </Routes>
          </MemoryRouter>
        );
      
        expect(getCharacter).toHaveBeenCalledWith(1);
        expect(getAvatar).toHaveBeenCalledWith(1);
    });
    it("should create the character with the avatar", async () => {
        render(
            <MemoryRouter>
            <CharacterTab />
          </MemoryRouter>
        );
        const inputName = screen.getByPlaceholderText("name");
        fireEvent.change(inputName, { target: { value: "test" } });
        const inputConcept = screen.getByPlaceholderText("concept");
        fireEvent.change(inputConcept, { target: { value: "test" } });
        const inputNature = screen.getByPlaceholderText("nature");
        fireEvent.change(inputNature, { target: { value: "test" } });
        const inputDemeanor = screen.getByPlaceholderText("demeanor");
        fireEvent.change(inputDemeanor, { target: { value: "test" } });
        const inputSire = screen.getByPlaceholderText("sire");
        fireEvent.change(inputSire, { target: { value: "test" } });
        const inputGeneration = screen.getByPlaceholderText("generation");
        fireEvent.change(inputGeneration, { target: { value: "5" } });
        const input = screen.getAllByPlaceholderText("search")[0];
        fireEvent.focus(input);
        fireEvent.change(input, { target: { value: "Tz" } });
        const option = await screen.findByText(/Tzimisce/i);
        expect(option).toBeInTheDocument();
        fireEvent.click(option);
        const input2 = screen.getAllByPlaceholderText("search")[1];
        fireEvent.focus(input2);
        fireEvent.change(input2, { target: { value: "Road of the test1" } });
        const option2 = await screen.findByText(/Road of the test1/i);
        expect(option2).toBeInTheDocument();
        fireEvent.click(option2);

        const button = screen.getByText("saveCharacter");
        fireEvent.click(button);
        await waitFor(() => {
            expect(createCharacter).toHaveBeenCalled();
            expect(createAvatar).toHaveBeenCalled();
            expect(mockNavigate).toHaveBeenCalledWith("/");
        });
    });
    it("should update the character without the avatar", () => {
        render(
          <MemoryRouter initialEntries={["/edit/1"]}>
            <Routes>
              <Route path="/edit/:id" element={<CharacterTab />} />
            </Routes>
          </MemoryRouter>
        );
          const button = screen.getByText("saveCharacter");
          fireEvent.click(button);
          waitFor(() => {
            expect(updateCharacter).toHaveBeenCalled();
            expect(updateAvatar).not.toHaveBeenCalled();
            expect(mockNavigate).toHaveBeenCalledWith("/");
          });
    });
    it("should update the avatar without the character", () => {
        render(
          <MemoryRouter initialEntries={["/edit/1"]}>
            <Routes>
              <Route path="/edit/:id" element={<CharacterTab />} />
            </Routes>
          </MemoryRouter>
        );
          const button = screen.getByText("saveAvatar");
          fireEvent.click(button);
          waitFor(() => {
            expect(updateCharacter).not.toHaveBeenCalled();
            expect(updateAvatar).toHaveBeenCalled();
            expect(mockNavigate).not.toHaveBeenCalledWith("/");
          });
    });
});