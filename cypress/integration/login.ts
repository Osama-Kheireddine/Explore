describe('Login ', () => {
  it('Should not login if form data invalid', () => {
    cy.visit('/');
    cy.url().should('includes', 'login');
    cy.get('[name="usersEmail"]').type('d00225138@student.dkit.ie');
    cy.contains('ion-button', 'Login').click();
    cy.url().should('not.include', 'home');
  });
});

describe('Login ', () => {
  it('Should not login if form data invalid', () => {
    cy.visit('/');
    cy.url().should('includes', 'login');
    cy.get('[name="password"]').type('dadadadadadade');
    cy.contains('ion-button', 'Login').click();
    cy.url().should('not.include', 'home');
  });
});

describe('Login ', () => {
  it('Should login if form data valid', () => {
    cy.visit('/');
    cy.url().should('includes', 'login');
    cy.get('[name="usersEmail"]').type('d00225138@student.dkit.ie');
    cy.url().should('includes', 'login');
    cy.get('[type="password"]').eq(1).type('Osama11bro');
    cy.contains('ion-button', 'Login').click();
    cy.url().should('include', 'home');
  });
});
