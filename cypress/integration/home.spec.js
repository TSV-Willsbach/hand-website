/// <reference types = "cypress" />

describe('Startseite', () => {
    beforeEach(() => {
        cy.visit('http://localhost:4200');
    });

    it('Has Titles', () => {
        cy.contains('Aktuelles');
    });

    it('Has articles', () => {
        cy.get('div').should('have.class', 'card-body');
    });
})