describe('PetSearch Feature', () => {
  Cypress.on('uncaught:exception', () => false);

  beforeEach(() => {
    const mockPets = [
      {
        id: 1,
        name: 'Firulais',
        address: 'Calle 123,Cochabamba',
        isLiked: false,
        age: 3,
        breed: 'Dálmata',
        size: 'Grande',
        description: 'Amigable y juguetón',
        owner: 'user1',
        image: ''
      },
      {
        id: 2,
        name: 'Pelusa',
        address: 'Avenida 456, Tarija',
        isLiked: false,
        age: 2,
        breed: 'Pasta Aleman',
        size: 'Mediano',
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
    const breed = 'Dálmata';
    cy.get('#breed-select')
      .find('option')
      .then(options => {
        cy.get('#breed-select').select(breed);
        cy.get('#search-pet-button').click(); 
        cy.get('#pets-container .pet-card').each(card => {
          cy.wrap(card).contains(new RegExp(breed, 'i'));
        });
      });
  });
  it('filtra mascotas por ciudad seleccionada', () => {
    const address = 'Cochabamba';
    cy.get('#address-select')
      .find('option')
      .then(options => {
        cy.get('#address-select').select(address); 
        cy.get('#search-pet-button').click(); 
        cy.get('#pets-container .pet-card').each(card => {
          cy.wrap(card).contains(new RegExp(address, 'i')); 
        }); 
      }); 
  }); 

  it('filtra mascotas por tamaño seleccionada', () => {
    cy.get('#size-select')
      .find('option')
      .then(options => {
        const size = options[1].value; 
        cy.get('#size-select').select(size); 
        cy.get('#search-pet-button').click(); 
        cy.get('#pets-container .pet-card').each(card => {
          cy.wrap(card).contains(new RegExp(size, 'i')); 
        }); 
      }); 
  }); 

  it('filtra mascotas por ciudad y raza seleccionada', () => {
    let breed= 'Dálmata'; 
    let city = "Cochabamba";
    cy.get('#breed-select').select(breed); 
    cy.get('#address-select').select(city); 
    cy.get('#search-pet-button').click(); 
    cy.get("#pets-container .pet-card").should("be.visible"); 
  }); 

    it('filtra mascotas por ciudad y raza seleccionada', () => {
    let breed= 'Dálmata'; 
    let city = "Tarija"; 
    let size = "Mediano"; 
    cy.get('#breed-select').select(breed); 
    cy.get('#address-select').select(city);
    cy.get('#size-select') .select(size); 
    cy.get('#search-pet-button').click(); 
    cy.get("#pets-container").should("contain", "No hay mascotas disponibles para el seleccionada."); 
  }); 
});