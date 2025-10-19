import PetCollectionInstance from '../model/PetCollectionInstance.js';
import PetSearchPresenter from '../presenter/PetSearchPresenter.js';
import PetSearchView from '../view/PetSearchView.js';

export default function searchPetTemplate() {
  const view = new PetSearchView();
  const presenter = new PetSearchPresenter(PetCollectionInstance, view);
  presenter.init();

  return view.getTemplate(); 
}