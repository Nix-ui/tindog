import FormGenerator from "../managers/FormGenerator.js";
import PetCollectionInstance from "../model/PetCollectionInstance.js"; // ✅ Importa la instancia compartida

const formGenerator = new FormGenerator();

export default function registerPetTemplate() {
  const container = document.createElement('div');

  container.id = 'register-pet-container';
  container.className = 'register-pet-container flex flex-col items-center justify-center h-screen bg-gray-100';

  formGenerator.render('register-pet', {}, container, {});

  const onRegisterPetClick = (e) => {
    e.preventDefault();
    const { name, address, age, breed, size, description, owner, image } = e.target.elements;

    const data = {
      name: name.value,
      address: address.value,
      age: parseInt(age.value),
      breed: breed.value,
      size: size.value,
      description: description.value,
      owner: owner.value,
      image: image.value,
      isLiked: false
    };

    // ✅ Usa la instancia compartida para agregar la mascota
    PetCollectionInstance.addPet(data);

    // ✅ Redirige después de guardar
    window.location.href = '/mypets';
  };

  // ✅ Asegura que el listener se adjunte solo una vez
  if (!document.__tindog_registerPetForm) {
    document.addEventListener('submit', onRegisterPetClick);
    document.__tindog_registerPetForm = true;
  }

  return container.outerHTML;
}