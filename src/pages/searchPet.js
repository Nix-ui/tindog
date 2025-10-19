import PetCollectionInstance from '../model/PetCollectionInstance.js';
import PetSearchPresenter from '../presenter/PetSearchPresenter.js';
import PetSearchView from '../view/PetSearchView.js';

let presenterInitialized = false;

export default function searchPetTemplate() {
  setTimeout(() => {
    if (!presenterInitialized) {
      const view = new PetSearchView();
      const presenter = new PetSearchPresenter(PetCollectionInstance, view);
      presenter.init();
      presenterInitialized = true;
    }
  }, 0);

  return `
    <section id="search-pet-container">
      <h2>Buscar por raza</h2>
      <select id="breed-select"></select>
      <div id="results"></div>
    </section>
  `;
}