describe('Review ', () => {
  it('Should post if form data valid', () => {
    cy.visit('/');
    cy.url().should('includes', 'home');
    cy.get('[name="menu-outline"]').click();
    cy.url().should('includes', 'post');
    cy.get('.list-md > :nth-child(2)').click();
    cy.url().should('includes', 'review');
    // eslint-disable-next-line max-len
    cy.get('app-review.ion-page > .content-ltr > google-map > .map-container > [style="height: 100%; width: 100%; position: absolute; top: 0px; left: 0px; background-color: rgb(229, 227, 223);"] > .gm-style > :nth-child(6) > .my-map-search-field').type('dkit');
    cy.get('[style="width: 846px; position: absolute; left: 75px; top: 94px;"] > :nth-child(1)').click();
    cy.get(':nth-child(2) > .ng-untouched > .native-input').type('Review Title');
    cy.get('.ng-untouched > .native-input').eq(1).type('Review Body');
    cy.get('ion-card.md > .button').click();
  });
});

