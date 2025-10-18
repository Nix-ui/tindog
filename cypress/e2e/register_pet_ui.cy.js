describe('Registro de mascota', () => {
    it('Vista del Registro de una mascota', () => {
        cy.visit('/registerpet');
        cy.get('#register-pet-form').should('be.visible');
    });
    it('Ingreso de datos de una mascota', () => {
        cy.visit('/registerpet');
        cy.get('#id').type(80);
        cy.get('#name').type('Firulais');
        cy.get('#address').type('Calle 123');
        cy.get('#age').type(2);
        cy.get('#breed').type('Labrador');
        cy.get('#size').type('Grande');
        cy.get('#description').type('Mascota de raza grande');
        cy.get('#owner').type('Camila');
        cy.get('#image').type('https://blog.mascotaysalud.com/wp-content/uploads/2019/09/LABRADOR-RETRIEVER-TUMBADO.jpg')
        cy.get('#register-pet-button').click();
        cy.get('#pet-card-80').should('be.visible');
    });
})