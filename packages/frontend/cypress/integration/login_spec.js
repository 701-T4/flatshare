describe('Auth Page', () => {
  it('move to signin page', () => {
    cy.visit('/auth');
    cy.contains('Click here to sign up').click();
    cy.contains('SIGN UP');
  });
});
