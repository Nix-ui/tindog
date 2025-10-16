import registerPet from "./model/petModelInstance.js";

const nameInput = document.querySelector('input[name="name"]');
const ageInput = document.querySelector('input[name="age"]');
const breedInput = document.querySelector('input[name="breed"]');
const ownerInput = document.querySelector('input[name="ownerId"]');
const form = document.getElementById("petForm");
const messageDiv = document.getElementById("message");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!nameInput.value.trim()) {
    messageDiv.innerHTML = "<p>El nombre es obligatorio</p>";
    messageDiv.style.color = "red";
    return;
  }
  if (Number(ageInput.value) < 0) {
    messageDiv.innerHTML = "<p>La edad debe ser positiva</p>";
    messageDiv.style.color = "red";
    return;
  }
  const petData = {
    name: nameInput.value,
    age: Number(ageInput.value),
    breed: breedInput.value,
    ownerId: ownerInput.value
  };
  registerPet(petData);
  messageDiv.innerHTML = "<p>¡Mascota registrada con éxito!</p>";
  messageDiv.style.color = "green";
});