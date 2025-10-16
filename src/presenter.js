import registerPet from "./model/petModelInstance.js";

const nameInput = document.querySelector('input[name="name"]');
const ageInput = document.querySelector('input[name="age"]');
const breedInput = document.querySelector('input[name="breed"]');
const ownerInput = document.querySelector('input[name="ownerId"]');
const form = document.getElementById("petForm");
const messageDiv = document.getElementById("message");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const petData = {
    name: nameInput.value,
    age: Number(ageInput.value),
    breed: breedInput.value,
    ownerId: ownerInput.value
  };

  registerPet(petData);

  messageDiv.innerHTML = "<p>¡Mascota registrada con éxito!</p>";
});