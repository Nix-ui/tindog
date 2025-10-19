export default class PetSearchPresenter {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.handleBreedChange = this.handleBreedChange.bind(this);
  }

  init() {
    const breeds = this.model.getAllBreeds();
    this.view.clearBreedOptions();
    this.view.populateBreedOptions(breeds);
    this.view.removeBreedChangeListener(); 
    this.view.onBreedChange(this.handleBreedChange);
    this.handleBreedChange(''); 
  }
  handleBreedChange(breed) {
    const pets = this.model.filterByBreed(breed);
    this.view.showPets(pets);
  }
}