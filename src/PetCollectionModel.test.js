// Mock localStorage globally for Jest
global.localStorage = {
  store: {},
  getItem(key) {
    return this.store[key] || null;
  },
  setItem(key, value) {
    this.store[key] = value.toString();
  },
  removeItem(key) {
    delete this.store[key];
  },
  clear() {
    this.store = {};
  }
};

import PetCollectionModel from './model/PetCollectionModel.js';
import PetModel from './models/pet/petModel.js'; // ✅ Corrected path

describe('PetCollectionModel', () => {
  let model;

  beforeEach(() => {
    localStorage.clear();
    model = new PetCollectionModel();
  });

  test('should add a new pet', () => {
    const pet = model.addPet({ name: 'Luna', age: 2, breed: 'Beagle' });
    expect(model.getAllPets()).toHaveLength(1);
    expect(pet.name).toBe('Luna');
    expect(pet.age).toBe(2);
    expect(pet.breed).toBe('Beagle');
  });

  test('should persist pets in localStorage', () => {
    model.addPet({ name: 'Max', age: 3, breed: 'Bulldog' });
    const stored = JSON.parse(localStorage.getItem('pets'));
    expect(stored).toHaveLength(1);
    expect(stored[0].name).toBe('Max');
  });

  test('should filter pets by breed', () => {
    model.addPet({ name: 'Luna', age: 2, breed: 'Beagle' });
    model.addPet({ name: 'Max', age: 3, breed: 'Bulldog' });
    const beagles = model.filterByBreed('Beagle');
    expect(beagles).toHaveLength(1);
    expect(beagles[0].name).toBe('Luna');
  });

  test('should return all unique breeds', () => {
    model.addPet({ name: 'Luna', age: 2, breed: 'Beagle' });
    model.addPet({ name: 'Max', age: 3, breed: 'Bulldog' });
    model.addPet({ name: 'Nina', age: 1, breed: 'Beagle' });
    const breeds = model.getAllBreeds();
    expect(breeds).toContain('Beagle');
    expect(breeds).toContain('Bulldog');
    expect(breeds).toHaveLength(2);
  });

  test('should clear all pets', () => {
    model.addPet({ name: 'Luna', age: 2, breed: 'Beagle' });
    model.clearAll();
    expect(model.getAllPets()).toHaveLength(0);
    expect(JSON.parse(localStorage.getItem('pets'))).toHaveLength(0);
  });
});