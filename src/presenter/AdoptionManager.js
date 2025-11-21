import petsFromFile from "../../data/pets.json";

const STORAGE_KEY = "tindog.pets";

export async function persistPets(pets) {
  try {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(pets));
    }
  } catch (error) {
    console.error("Error al guardar mascotas:", error);
  }
}

export async function loadPets() {
  let pets;

  try {
    if (typeof localStorage !== "undefined") {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        pets = JSON.parse(raw);
      }
    }
  } catch (error) {
    console.error("Error leyendo localStorage:", error);
  }

  if (!pets) {
    pets = petsFromFile.map((p) => ({ ...p }));
  }

  return pets.map((pet) => ({
    status: pet.status || "available",
    ...pet,
  }));
}

export async function getPetById(id) {
  const pets = await loadPets();
  return pets.find((pet) => String(pet.id) === String(id));
}