describe('Landing page', () => {
  // should route to / (landing page)
  it('visits /', () => {
    cy.visit('/');
  });

  // login button routes to login page, /auth
  it('login button navigates to login page', () => {
    cy.get('[data-cy="login-button"]').click();
    cy.url().should('include', '/auth');
    cy.contains('LOGIN');
  });
});
