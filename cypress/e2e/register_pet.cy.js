describe('Registro de mascota', () => {
  beforeEach(() => {
    cy.visit('/index.html');
  });

  it('Registra mascota con datos válidos', () => {
    cy.get('input[name="name"]').type('Firulais');
    cy.get('input[name="age"]').type('2');
    cy.get('input[name="breed"]').type('Labrador');
    cy.get('input[name="ownerId"]').type('user123');
    cy.get('button[type="submit"]').click();
    cy.contains('¡Mascota registrada con éxito!').should('be.visible');
  });
  it('Muestra error si el nombre está vacío', () => {
    cy.get('input[name="name"]').clear();
    cy.get('input[name="age"]').clear().type('2');
    cy.get('input[name="breed"]').clear().type('Labrador');
    cy.get('input[name="ownerId"]').clear().type('user123');
    cy.get('button[type="submit"]').click();
    cy.contains('El nombre es obligatorio').should('be.visible');
  });
  it('Muestra error si la edad es negativa', () => {
    cy.get('input[name="name"]').clear().type('Rocky');
    cy.get('input[name="age"]').clear().type('-1');
    cy.get('input[name="breed"]').clear().type('Boxer');
    cy.get('input[name="ownerId"]').clear().type('user123');
    cy.get('button[type="submit"]').click();
    cy.contains('La edad debe ser positiva').should('be.visible');
  });
  it('Muestra error si la raza está vacía', () => {
    cy.get('input[name="name"]').clear().type('Rocky');
    cy.get('input[name="age"]').clear().type('2');
    cy.get('input[name="breed"]').clear();
    cy.get('input[name="ownerId"]').clear().type('user123');
    cy.get('button[type="submit"]').click();
    cy.contains('La raza es obligatoria').should('be.visible');
  });
  it('Muestra error si el ID del dueño está vacío', () => {
    cy.get('input[name="name"]').clear().type('Rocky');
    cy.get('input[name="age"]').clear().type('2');
    cy.get('input[name="breed"]').clear().type('Boxer');
    cy.get('input[name="ownerId"]').clear();
    cy.get('button[type="submit"]').click();
    cy.contains('El ID del dueño es obligatorio').should('be.visible');
  });
  it('Asocia la mascota al dueño correctamente en el modelo', () => {
    cy.get('input[name="name"]').clear().type('Max');
    cy.get('input[name="age"]').clear().type('3');
    cy.get('input[name="breed"]').clear().type('Beagle');
    cy.get('input[name="ownerId"]').clear().type('owner456');
    cy.get('button[type="submit"]').click();
    cy.contains('¡Mascota registrada con éxito!').should('be.visible');
    cy.window().its('registerPet').then((registerPet) => {
      const pets = registerPet.getPetsByOwner('owner456');
        expect(pets).to.deep.include({ name: 'Max', age: 3, breed: 'Beagle', ownerId: 'owner456' });
    });
  });
});