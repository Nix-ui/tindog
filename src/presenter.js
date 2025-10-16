import registerPet from "./model/petModelInstance.js";

window.registerPet = registerPet;

const nameInput = document.querySelector('input[name="name"]');
const ageInput = document.querySelector('input[name="age"]');
const breedInput = document.querySelector('input[name="breed"]');
const ownerInput = document.querySelector('input[name="ownerId"]');
const form = document.getElementById("petForm");
const messageDiv = document.getElementById("message");
const petInfoDiv = document.getElementById("petInfo");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!nameInput.value.trim()) return showMessage("El nombre es obligatorio", "red");
  if (Number(ageInput.value) < 0) return showMessage("La edad debe ser positiva", "red");
  if (!breedInput.value.trim()) return showMessage("La raza es obligatoria", "red");
  if (!ownerInput.value.trim()) return showMessage("El ID del dueño es obligatorio", "red");

  const petData = {
    name: nameInput.value.trim(),
    age: Number(ageInput.value),
    breed: breedInput.value.trim(),
    ownerId: ownerInput.value.trim(),
  };

  registerPet.registerPet(petData);
  showMessage("¡Mascota registrada con éxito!", "green");
  displayAllPets();
});

function showMessage(text, color) {
  messageDiv.innerHTML = `<p>${text}</p>`;
  messageDiv.style.color = color;
}

function displayAllPets() {
  const pets = registerPet.getAllPets();
  if (pets.length === 0) {
    petInfoDiv.innerHTML = "<p>No hay mascotas registradas.</p>";
    return;
  }

  petInfoDiv.innerHTML = `
    <h3>Mascotas registradas:</h3>
    <ul>
      ${pets.map(p => `<li>${p.name} (${p.age} años) - ${p.breed}, dueño: ${p.ownerId}</li>`).join("")}
    </ul>
  `;
}
