export default class PetSearchPresenter {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  init() {
    const breeds = this.model.getAllBreeds();
    this.view.populateBreedOptions(breeds);

    this.view.onBreedChange(breed => {
      const pets = this.model.filterByBreed(breed);
      this.view.showPets(pets);
    });
  }
}