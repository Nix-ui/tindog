import PetCollectionInstance from '../model/PetCollectionInstance.js';
import PetSearchPresenter from '../presenter/PetSearchPresenter.js';
import PetSearchView from '../view/PetSearchView.js';


const view = new PetSearchView();
const presenter = new PetSearchPresenter(PetCollectionInstance, view);
presenter.init();
