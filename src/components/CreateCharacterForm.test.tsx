import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it, vi } from "vitest";
import CreateCharacterForm from "./CreateCharacterForm";

// simula o módulo
vi.mock("../services/characterService", () => ({
    getAllClans: vi.fn(),
    getAllRoads: vi.fn(),
}));

import { initialCharacter } from "../types/initials";

const clans = [
    { id: 1, name: "Tzimisce", weakness: "dormir com terra", discipline1: "vissisitude", discipline2: "auspex", discipline3: "animalismo" },
    { id: 2, name: "Brujah", weakness: "Raiva", discipline1: "potencia", discipline2: "fortitude", discipline3: "presença" },
];
const roads = [
    { id: 1, name: "Road of the test1", pathName: "Path of the test1", sins: "", ethics: "", aura: "", useConscience: false, useSelf_control: false },
    { id: 2, name: "Road of the test2", pathName: "Path of the test2", sins: "", ethics: "", aura: "", useConscience: true, useSelf_control: true },
];

const onUpdate = vi.fn();
const onSaveCharacter = vi.fn();
const setSelectedClan = vi.fn();
const setSelectedRoad = vi.fn();

describe("CreateCharacterForm", () => {

    beforeEach(() => {
        onUpdate.mockClear();
        onSaveCharacter.mockClear();
    });

    it("should render the form", () => {
        render(<CreateCharacterForm form={initialCharacter} update={onUpdate} selectedClan={null} setSelectedClan={setSelectedClan} selectedRoad={null} setSelectedRoad={setSelectedRoad} clans={clans} roads={roads} saveCharacter={onSaveCharacter} />);
        expect(screen.getByText("saveCharacter")).toBeInTheDocument();
    });
    it("should render the clan weakeness when selected clan changes", () => {
        render(<CreateCharacterForm form={initialCharacter} update={onUpdate} selectedClan={clans[0]} setSelectedClan={setSelectedClan} selectedRoad={null} setSelectedRoad={setSelectedRoad} clans={clans} roads={roads} saveCharacter={onSaveCharacter} />);
        expect(onUpdate).toHaveBeenCalledWith("weakness", "dormir com terra");
    });
    it("should render the road tooltip when selected road changes", () => {
        render(<CreateCharacterForm form={initialCharacter} update={onUpdate} selectedClan={null} setSelectedClan={setSelectedClan} selectedRoad={roads[0]} setSelectedRoad={setSelectedRoad} clans={clans} roads={roads} saveCharacter={onSaveCharacter} />);
        expect(screen.getByText(/Path of the test1/i)).toBeInTheDocument();
        expect(screen.getByText(/conviction/i)).toBeInTheDocument();
        expect(screen.getByText(/instinct/i)).toBeInTheDocument();
    });
    it("should save the character when save button is clicked", () => {
        var char = {...initialCharacter};
        char.name = "Test Character";
        char.concept = "Test Concept";
        char.nature = "Test Nature";
        char.demeanor = "Test Demeanor";
        char.sire = "Test Sire";
        char.generation = 5;
        char.clanId = clans[0].id;
        char.roadId = roads[0].id;
        render(<CreateCharacterForm form={char} update={onUpdate} selectedClan={clans[0]} setSelectedClan={setSelectedClan} selectedRoad={roads[0]} setSelectedRoad={setSelectedRoad} clans={clans} roads={roads} saveCharacter={onSaveCharacter} />);
        const saveButton = screen.getByText("saveCharacter");
        fireEvent.click(saveButton);
        expect(onSaveCharacter).toHaveBeenCalled();
    });
    it("shouldn't save the character when is not filled", () => {
        render(<CreateCharacterForm form={initialCharacter} update={onUpdate} selectedClan={null} setSelectedClan={setSelectedClan} selectedRoad={null} setSelectedRoad={setSelectedRoad} clans={clans} roads={roads} saveCharacter={onSaveCharacter} />);
        const saveButton = screen.getByText("saveCharacter");
        fireEvent.click(saveButton);
        expect(onSaveCharacter).not.toHaveBeenCalled();
    });
    it("should render the clan select", async () => {
        render(<CreateCharacterForm form={initialCharacter} update={onUpdate} selectedClan={null} setSelectedClan={setSelectedClan} selectedRoad={null} setSelectedRoad={setSelectedRoad} clans={clans} roads={roads} saveCharacter={onSaveCharacter} />);
        const input = screen.getAllByPlaceholderText("search")[0];
        fireEvent.focus(input);
        fireEvent.change(input, { target: { value: "Tz" } });
        const option = await screen.findByText(/Tzimisce/i);
        expect(option).toBeInTheDocument();

        // clica para selecionar
        fireEvent.click(option);
        expect(onUpdate).toHaveBeenCalledWith("clanId", clans[0].id);
    });
    it("should render the road select", async () => {
        render(<CreateCharacterForm form={initialCharacter} update={onUpdate} selectedClan={null} setSelectedClan={setSelectedClan} selectedRoad={null} setSelectedRoad={setSelectedRoad} clans={clans} roads={roads} saveCharacter={onSaveCharacter} />);
        const input = screen.getAllByPlaceholderText("search")[1];
        fireEvent.focus(input);
        fireEvent.change(input, { target: { value: "Road of the test1" } });
        const option = await screen.findByText(/Road of the test1/i);
        expect(option).toBeInTheDocument();

        // clica para selecionar
        fireEvent.click(option);
        expect(onUpdate).toHaveBeenCalledWith("roadId", roads[0].id);
    });
    it("should render the disciplines", () => {
        render(<CreateCharacterForm form={initialCharacter} update={onUpdate} selectedClan={clans[1]} setSelectedClan={setSelectedClan} selectedRoad={null} setSelectedRoad={setSelectedRoad} clans={clans} roads={roads} saveCharacter={onSaveCharacter} />);
        expect(screen.getByText("potencia :")).toBeInTheDocument();
        expect(screen.getByText("fortitude :")).toBeInTheDocument();
        expect(screen.getByText("presença :")).toBeInTheDocument();
    });
    it("should render the merits", () => {
        var char = {...initialCharacter};
        char.merits.push({name: "Merit 1", type: "Physical", score: 1});
        render(<CreateCharacterForm form={char} update={onUpdate} selectedClan={clans[1]} setSelectedClan={setSelectedClan} selectedRoad={null} setSelectedRoad={setSelectedRoad} clans={clans} roads={roads} saveCharacter={onSaveCharacter} />);
        expect(screen.getByPlaceholderText("merit")).toHaveValue("Merit 1");
        
    });
    it("should render the flaws", () => {
        var char = {...initialCharacter};
        char.flaws.push({name: "Flaw 1", type: "Physical", score: 1});
        render(<CreateCharacterForm form={char} update={onUpdate} selectedClan={clans[1]} setSelectedClan={setSelectedClan} selectedRoad={null} setSelectedRoad={setSelectedRoad} clans={clans} roads={roads} saveCharacter={onSaveCharacter} />);
        expect(screen.getByPlaceholderText("flaw")).toHaveValue("Flaw 1");
    });
    it("should render the backgrounds", () => {
        var char = {...initialCharacter};
        char.backgrounds.push({name: "Background 1", score: 1});
        render(<CreateCharacterForm form={char} update={onUpdate} selectedClan={clans[1]} setSelectedClan={setSelectedClan} selectedRoad={null} setSelectedRoad={setSelectedRoad} clans={clans} roads={roads} saveCharacter={onSaveCharacter} />);
        expect(screen.getByPlaceholderText("background")).toHaveValue("Background 1");
    });
    it("should create more merits, flaws, backgrounds and disciplines when pressing the add button", () => {
        var char = {...initialCharacter};
        render(<CreateCharacterForm form={char} update={onUpdate} selectedClan={clans[1]} setSelectedClan={setSelectedClan} selectedRoad={null} setSelectedRoad={setSelectedRoad} clans={clans} roads={roads} saveCharacter={onSaveCharacter} />);
        var button = screen.getByText("merit");
        fireEvent.click(button);
        fireEvent.click(button);
        const calls = onUpdate.mock.calls.filter(
            ([key]) => key === "merits" 
          );
          expect(calls.length).toBe(2);
        button = screen.getByText("flaw");
        fireEvent.click(button);
        fireEvent.click(button);
        const calls2 = onUpdate.mock.calls.filter(
            ([key]) => key === "flaws"
          );
          expect(calls2.length).toBe(2);
        button = screen.getByText("background");
        fireEvent.click(button);
        fireEvent.click(button);
        const calls3 = onUpdate.mock.calls.filter(
            ([key]) => key === "backgrounds"
          );
          expect(calls3.length).toBe(2);
        button = screen.getByText("discipline");
        fireEvent.click(button);
        fireEvent.click(button);
        const calls4 = onUpdate.mock.calls.filter(
            ([key]) => key === "disciplines"
          );
          expect(calls4.length).toBe(2);
    });
    it("should remove merits, flaws, backgrounds and disciplines when pressing the remove button", () => {
        var char = {...initialCharacter};
        char.merits = [{name: "Merit 1", type: "Physical", score: 1}];
        char.flaws = [{name: "Flaw 1", type: "Physical", score: 1}];
        char.backgrounds = [{name: "Background 1", score: 1}];
        char.disciplines = [{name: "Discipline 1", score: 1}];
        render(<CreateCharacterForm form={char} update={onUpdate} selectedClan={clans[1]} setSelectedClan={setSelectedClan} selectedRoad={null} setSelectedRoad={setSelectedRoad} clans={clans} roads={roads} saveCharacter={onSaveCharacter} />);
        var button = screen.getByTestId("remove-merit");
        fireEvent.click(button);
        const calls = onUpdate.mock.calls.filter(
            ([key]) => key === "merits" 
          );
          expect(calls.length).toBe(1);
        button = screen.getByTestId("remove-flaw");
        fireEvent.click(button);
        const calls2 = onUpdate.mock.calls.filter(
            ([key]) => key === "flaws"
          );
          expect(calls2.length).toBe(1);
        button = screen.getByTestId("remove-background");
        fireEvent.click(button);
        const calls3 = onUpdate.mock.calls.filter(
            ([key]) => key === "backgrounds"
          );
          expect(calls3.length).toBe(1);
        button = screen.getByTestId("remove-discipline");
        fireEvent.click(button);
        const calls4 = onUpdate.mock.calls.filter(
            ([key]) => key === "disciplines"
          );
          expect(calls4.length).toBe(1);
    });
    it("should render correctly the blood pool based on generation", () => {
        const char = {...initialCharacter};
        char.generation = 5;
        render(<CreateCharacterForm form={char} update={onUpdate} selectedClan={null} setSelectedClan={setSelectedClan} selectedRoad={null} setSelectedRoad={setSelectedRoad} clans={clans} roads={roads} saveCharacter={onSaveCharacter} />);
        const allButtons = screen.getAllByRole("button");
        const bloodSquares = allButtons.filter(btn =>
            btn.className.includes("rounded-none")
        );
        expect(bloodSquares.length).toBe(40);
    });
    it("should update the attribute when clicked on the dot", () => {
        render(<CreateCharacterForm form={initialCharacter} update={onUpdate} selectedClan={null} setSelectedClan={setSelectedClan} selectedRoad={null} setSelectedRoad={setSelectedRoad} clans={clans} roads={roads} saveCharacter={onSaveCharacter} />);
        const allButtons = screen.getAllByRole("button");
        const attributeDot = allButtons.filter(btn =>
            btn.className.includes("rounded-full")
        );
        fireEvent.click(attributeDot[1]);
        fireEvent.click(attributeDot[11]);
        fireEvent.click(attributeDot[21]);
        fireEvent.click(attributeDot[31]);
        fireEvent.click(attributeDot[41]);
        fireEvent.click(attributeDot[51]);        
        fireEvent.click(attributeDot[61]);
        fireEvent.click(attributeDot[71]);
        fireEvent.click(attributeDot[81]);
        expect(onUpdate).toHaveBeenCalledWith("strength", 2);
        expect(onUpdate).toHaveBeenCalledWith("dexterity", 2);
        expect(onUpdate).toHaveBeenCalledWith("stamina", 2);
        expect(onUpdate).toHaveBeenCalledWith("charisma", 2);
        expect(onUpdate).toHaveBeenCalledWith("manipulation", 2);
        expect(onUpdate).toHaveBeenCalledWith("appearance", 2);
        expect(onUpdate).toHaveBeenCalledWith("intelligence", 2);
        expect(onUpdate).toHaveBeenCalledWith("perception", 2);
        expect(onUpdate).toHaveBeenCalledWith("wits", 2);
    });
    it("should dismark the attribute when clicked on the dot again", () => {
        render(<CreateCharacterForm form={initialCharacter} update={onUpdate} selectedClan={null} setSelectedClan={setSelectedClan} selectedRoad={null} setSelectedRoad={setSelectedRoad} clans={clans} roads={roads} saveCharacter={onSaveCharacter} />);
        const allButtons = screen.getAllByRole("button");
        const attributeDot = allButtons.filter(btn =>
            btn.className.includes("rounded-full")
        );
        fireEvent.click(attributeDot[0]);
        fireEvent.click(attributeDot[10]);
        fireEvent.click(attributeDot[20]);
        fireEvent.click(attributeDot[30]);
        fireEvent.click(attributeDot[40]);
        fireEvent.click(attributeDot[50]);        
        fireEvent.click(attributeDot[60]);
        fireEvent.click(attributeDot[70]);
        fireEvent.click(attributeDot[80]);
        expect(onUpdate).toHaveBeenCalledWith("strength", 0);
        expect(onUpdate).toHaveBeenCalledWith("dexterity", 0);
        expect(onUpdate).toHaveBeenCalledWith("stamina", 0);
        expect(onUpdate).toHaveBeenCalledWith("charisma", 0);
        expect(onUpdate).toHaveBeenCalledWith("manipulation", 0);
        expect(onUpdate).toHaveBeenCalledWith("appearance", 0);
        expect(onUpdate).toHaveBeenCalledWith("intelligence", 0);
        expect(onUpdate).toHaveBeenCalledWith("perception", 0);
        expect(onUpdate).toHaveBeenCalledWith("wits", 0);
    });
    it("should update the skill when clicked on the dot", () => {
        render(<CreateCharacterForm form={initialCharacter} update={onUpdate} selectedClan={null} setSelectedClan={setSelectedClan} selectedRoad={null} setSelectedRoad={setSelectedRoad} clans={clans} roads={roads} saveCharacter={onSaveCharacter} />);
        const allButtons = screen.getAllByRole("button");
        const skillDot = allButtons.filter(btn =>
            btn.className.includes("rounded-full")
        );
        fireEvent.click(skillDot[90]);
        expect(onUpdate).toHaveBeenCalledWith("alertness", 1);
    });
    it("should dismark the skill when clicked on the dot again", () => {
        var char = {...initialCharacter};
        char.alertness = 1;
        render(<CreateCharacterForm form={char} update={onUpdate} selectedClan={null} setSelectedClan={setSelectedClan} selectedRoad={null} setSelectedRoad={setSelectedRoad} clans={clans} roads={roads} saveCharacter={onSaveCharacter} />);
        const allButtons = screen.getAllByRole("button");
        const skillDot = allButtons.filter(btn =>
            btn.className.includes("rounded-full")
        );
        fireEvent.click(skillDot[90]);
        expect(onUpdate).toHaveBeenCalledWith("alertness", 0);
    });
});