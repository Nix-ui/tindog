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

export async function initiateAdoption(
  petId,
  user = { id: null, name: null }
) {
  const pets = await loadPets();
  const pet = pets.find((p) => String(p.id) === String(petId));

  if (!pet) {
    return { success: false, reason: "not_found" };
  }

  if (pet.status === "in_process") {
    return { success: false, reason: "in_process", pet };
  }

  pet.status = "in_process";
  pet.adoptionRequest = {
    userId: user.id,
    userName: user.name,
    startedAt: new Date().toISOString(),
  };

  await persistPets(pets);

  return { success: true, pet };
}

export async function cancelAdoption(petId) {
  const pets = await loadPets();
  const pet = pets.find((p) => String(p.id) === String(petId));

  if (!pet || pet.status !== "in_process") {
    return { success: false, reason: "not_in_process" };
  }

  pet.status = "available";
  delete pet.adoptionRequest;

  await persistPets(pets);

  return { success: true, pet };
}