describe('Change Routes', () => {
    it('Deberia moverme a la vista de mis mascotas', () => {
        cy.visit('/');
        cy.get('[data-route="mypets"]').click();
        cy.url().should('include', '/mypets');
    });
    it('Deberia moverme a la vista de registro de mascotas', () => {
        cy.visit('/');
        cy.get('[data-route="registerpet"]').click();
        cy.url().should('include', '/registerpet');
    });
})