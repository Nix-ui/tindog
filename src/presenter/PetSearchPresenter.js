import PetModel from '../models/pet/petModel';
import CardGenerator from '../managers/CardGenerator';
import PetDetails from '../pages/myPetDetails';
import PetRepository from '../repository/PetRepository';

const petRepository = new PetRepository();

// === Listener global para "Ver más" ===
const onViewMoreClick = (e) => {
  e.preventDefault();
  const pets = petRepository.getAllPets();
  const btn = e.target.closest('[data-action="view-details"]');
  if (!btn) return;
  const petId = btn.dataset.petId;
  const pet = pets.find((p) => String(p.id) === String(petId));
  if (pet) {
    const detail = new PetDetails(pet);
    const mountPoint = document.querySelector('#modal-root') || document.body;
    const existingDetail = document.querySelector('.pet-detail-overlay');
    if (existingDetail) existingDetail.remove();
    detail.mount(mountPoint);
  }
};

// === Listener global para "Contáctame" desde las tarjetas ===
const onContactClick = (e) => {
  const btn = e.target.closest('[data-action="contact"]');
  if (!btn) return;

  const pets = petRepository.getAllPets();
  const petId = btn.dataset.petId;
  const pet = pets.find((p) => String(p.id) === String(petId));
  if (!pet) return;

  iniciarAdopcion(pet, btn);
};

// === NUEVO: Manejar evento pet-contact (desde el modal) ===
document.addEventListener('pet-contact', (ev) => {
  const detail = ev.detail;
  const petId = detail?.id;
  if (!petId) return;

  const pets = petRepository.getAllPets();
  const pet = pets.find((p) => String(p.id) === String(petId));
  if (!pet) return;

  const modalBtn = document.querySelector(
    `.pet-detail-overlay [data-action="contact"]`
  );
  iniciarAdopcion(pet, modalBtn);
});

/**
 * Lógica central para iniciar adopción
 * @param {PetModel} pet
 * @param {HTMLElement} btn
 */
function iniciarAdopcion(pet, btn) {
  if (pet.status === 'en proceso') {
    alert('⚠️ Esta mascota ya está en proceso de adopción.');
    return;
  }
  if (pet.status === 'adoptado') {
    alert('💛 Esta mascota ya fue adoptada.');
    return;
  }

  // Cambiar estado
  pet.status = 'en proceso';
  if (btn) {
    btn.textContent = 'En proceso...';
    btn.disabled = true;
  }

  alert(`🐶 Has iniciado el proceso de adopción para ${pet.name}.`);

  // Guardar solicitud en memoria temporal
  if (!window.solicitudesAdopcion) window.solicitudesAdopcion = [];
  window.solicitudesAdopcion.push({
    id: pet.id,
    name: pet.name,
    status: pet.status,
    fecha: new Date().toLocaleString(),
  });

  console.log('📋 Solicitudes de adopción:', window.solicitudesAdopcion);
}

export default class PetSearchPresenter {
  constructor(view) {
    this.view = view;
    this.handleBreedChange = this.handleBreedChange.bind(this);
  }

  init() {
    const breeds = petRepository.getBreeds();
    this.view.clearBreedOptions();
    this.view.populateBreedOptions(breeds);
    this.view.removeBreedChangeListener();
    this.view.onBreedChange(this.handleBreedChange);
    this.handleBreedChange('');

    // Escuchas globales (solo una vez)
    if (!document.__tindog_global_listeners) {
      document.addEventListener('click', onViewMoreClick);
      document.addEventListener('click', onContactClick);
      document.__tindog_global_listeners = true;
    }
  }

  /**
   * @param {string} breed
   */
  handleBreedChange(breed) {
    const pets =
      breed === ''
        ? petRepository.getAllPets()
        : petRepository.filterByBreed(breed);

    this.view.showPets(pets);
  }
}
