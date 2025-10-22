describe('PetSearch Feature', () => {
  Cypress.on('uncaught:exception', () => false);

  beforeEach(() => {
    // ✅ Inyectar mascotas de prueba en localStorage
    const mockPets = [
      {
        id: 1,
        name: 'Firulais',
        address: 'Calle 123',
        isLiked: false,
        age: 3,
        breed: 'Labrador',
        size: 'Grande',
        description: 'Amigable y juguetón',
        owner: 'user1',
        image: ''
      },
      {
        id: 2,
        name: 'Pelusa',
        address: 'Avenida 456',
        isLiked: false,
        age: 2,
        breed: 'Persa',
        size: 'Pequeño',
        description: 'Tranquila y peluda',
        owner: 'user2',
        image: ''
      }
    ];

    cy.visit('/searchpet', {
      onBeforeLoad(win) {
        win.localStorage.setItem('pets', JSON.stringify(mockPets));
      }
    });
  });
  it('carga el dropdown de razas', () => {
    cy.get('#breed-select', { timeout: 5000 })
      .should('exist')
      .find('option')
      .its('length')
      .should('be.greaterThan', 0);
  });
  it('muestra todas las mascotas cuando no se selecciona raza', () => {
    cy.get('#breed-select').select('');
    cy.get('#pets-container .pet-card', { timeout: 5000 }).should('have.length.at.least', 1);
  });
  it('filtra mascotas por raza seleccionada', () => {
    cy.get('#breed-select')
      .find('option')
      .then(options => {
        const breed = options[1].value; // omite la opción vacía
        cy.get('#breed-select').select(breed);
        cy.get('#search-pet-button').click(); 
        cy.get('#pets-container .pet-card').each(card => {
          cy.wrap(card).contains(new RegExp(breed, 'i'));
        });
      });
  });
});