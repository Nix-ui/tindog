import petsFromFile from "../../data/pets.json";
import { loadPets, persistPets, getPetById } from "./AdoptionManager";

beforeEach(() => {
  if (typeof localStorage !== "undefined") {
    localStorage.clear();
  }
});

test("Debe existir una mascota real en pets.json", () => {
  const luna = petsFromFile.find((m) => m.id === 1);
  expect(luna).toBeDefined();
  expect(luna.name).toBeDefined();
});

test("Debe guardar las mascotas y luego cargarlas", async () => {
  await persistPets(petsFromFile);
  const loaded = await loadPets();

  expect(Array.isArray(loaded)).toBe(true);
  expect(loaded.length).toBe(petsFromFile.length);

  loaded.forEach((pet) => {
    expect(pet).toHaveProperty("status");
    expect(pet.status).toBeDefined();
  });
});

test("Debe encontrar una mascota por el id", async () => {
  await persistPets(petsFromFile);

  const pet = await getPetById(1);

  expect(pet).toBeDefined();
  expect(pet.id).toBe(1);
});
