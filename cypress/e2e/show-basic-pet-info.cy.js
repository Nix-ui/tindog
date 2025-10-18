describe("Mostrar informacion basica de una mascota", () => {
    it('Deberia Mostrar una Card de una mascota', () => {
        cy.visit('/');
        cy.get("#pet-card-5").should('be.visible');
    })
    
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
    it('Deberia ver la informacion emergente de la mascota', () => {
        cy.visit('/');
        cy.get("#view-pet-details-5").click();
        cy.get("#pet-detail-card-5").should('be.visible');
    });
    it('Deberia mostrar la informacion Completa', () => {
        let pet = {
        "id": 7,
        "name": "Coco",
        "address": "Av. 6 de Agosto 321, La Paz",
        "isLiked": false,
        "age": 1,
        "breed": "Corgi Galés",
        "size": "Pequeño",
        "description": "Leal y divertido, adora jugar con otros perros.",
        "owner": "Camila Rodríguez",
        "image": "https://images.unsplash.com/photo-1537151625747-768eb6cf92b6"
        }
        cy.visit('/');
        cy.get("#view-pet-details-7").click();
        cy.get("#pet-detail-card-7").should('be.visible');
        cy.get("#pet-name-7").should('contain', pet.name);
        cy.get("#pet-address-7").should('contain', pet.address);
        cy.get("#pet-ages-7").invoke('text').should('contain', pet.age);
        cy.get("#pet-breed-size-7").within(() => {
            cy.get("#pet-breed-7").should('contain', pet.breed);
            cy.get("#pet-size-7").should('contain', pet.size);
        })
        cy.get("#pet-description-7").should('contain', pet.description);
        cy.get("#pet-shelter-7").should('contain', pet.owner);
    });
})