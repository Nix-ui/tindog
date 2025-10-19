export default function myPetsTemplate() {
  const localPets = JSON.parse(localStorage.getItem('pets')) || [];
  const allPetsRaw = [...petData, ...localPets]; // ✅ copia segura

  const pets = allPetsRaw.map(pet => new PetModel(
    pet.id,
    pet.name,
    pet.address,
    pet.isLiked,
    pet.age,
    pet.breed,
    pet.size,
    pet.description,
    pet.owner,
    pet.image
  ));

  const container = document.createElement('div');
  container.id = 'pets-container';
  container.className = 'pets-container flex flex-wrap justify-center gap-4';

  cardGenerator.renderMany('pet', pets, container, {
    animate: true,
    showLikeButton: true,
    showDetailsButton: true,
    imageHeight: "12rem"
  });

  const onViewMoreClick = (e) => {
    const btn = e.target.closest('[data-action="view-details"]');
    if (!btn) return;

    const petId = btn.dataset.petId;
    const pet = pets.find(p => String(p.id) === String(petId));

    if (pet) {
      const detail = new PetDetails(pet);
      const mountPoint = document.querySelector('#modal-root') || document.body;
      detail.mount(mountPoint);
    }
  };

  if (!document.__tindog_view_details_listener) {
    document.addEventListener('click', onViewMoreClick);
    document.__tindog_view_details_listener = true;
  }

  return container.outerHTML;
}