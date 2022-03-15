describe('Auth Page', () => {
  it('move to signin page', () => {
    cy.visit('http://localhost:3000/auth');
    cy.contains('Click here to sign up').click();
    cy.contains('SIGN UP');
  });
});
