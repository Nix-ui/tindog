import PetCollectionInstance from '../model/PetCollectionInstance.js';
import PetSearchPresenter from '../presenter/PetSearchPresenter.js';
import PetSearchView from '../view/PetSearchView.js';

export default function searchPetTemplate() {
  setTimeout(() => {
      const view = new PetSearchView('breed-select', 'pets-container');
      const presenter = new PetSearchPresenter(PetCollectionInstance, view);
      presenter.init();
  }, 0);
  return `
    <section id="search-pet-container">
      <h2>Buscar por raza</h2>
      <select id="breed-select">
      </select>
      <div id="pets-container" class="pets-container flex flex-wrap justify-center gap-4"></div>
    </section>
  `;
}