import petsFromFile from "../../data/pets.json";
import {loadPets,persistPets,getPetById,initiateAdoption,} from "./AdoptionManager";

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

test("Debe iniciar la adopción de una mascota disponible", async () => {
  await persistPets(petsFromFile);

  const resultado = await initiateAdoption(1, {
    id: "u1",
    name: "Usuario 1",
  });

  expect(resultado.success).toBe(true);
  expect(resultado.pet.status).toBe("in_process");
  expect(resultado.pet.adoptionRequest).toBeDefined();
  expect(resultado.pet.adoptionRequest.userId).toBe("u1");
});

