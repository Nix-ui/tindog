describe("Mostrar informacion basica de una mascota", () => {
    it('Deberia mostrar a mis mascotas', () => {
        cy.visit('/');
        cy.get("#pet-name-3").should('contain', 'Nina');
        cy.get("#pet-address-3").should('contain', '📍 Barrio San Pedro, Santa Cruz');
        cy.get("#pet-ages-3").invoke('text').should('contain', '1 año');
        cy.get("#pet-breed-size-3").within(() => {
            cy.get("#pet-breed-3").should('contain', 'Beagle');
            cy.get("#pet-size-3").should('contain', 'Pequeño');
        })
        cy.get("#pet-description-3").should('contain', 'Curiosa y energética, perfecta para familias activas.');
        cy.get("#pet-shelter-3").should('contain', '🏠 Andrea Pérez');
        cy.get("#view-pet-details-3").should('contain', 'Ver más');
    });
    it('Deberia ver la informacion Resumida de la mascota', () => {
        cy.visit('/');
        cy.get("#view-pet-details-5").click();
        cy.get("#pet-view-full-card-5").should('be.visible');
    });
})