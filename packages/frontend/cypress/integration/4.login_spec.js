describe('Auth Page', () => {
  it('move to signin page', () => {
    cy.visit('/auth');
    cy.get('[data-cy="switch-button"]').click();
    cy.get('[data-cy="name-input"]').should('exist');
  });
});
