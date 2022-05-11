describe('Post ', () => {
  it('Should not post if form data invalid', () => {
    cy.visit('/');
    cy.url().should('includes', 'home');
    cy.get('[name="menu-outline"]').click();
    cy.url().should('includes', 'post');
    cy.get('[name="camera-outline"]').click();
    cy.url().should('includes', 'photos');
    cy.get('ion-fab-button').eq(2).click();
    cy.get('pwa-camera-modal-instance.hydrated').click();
  });
});

