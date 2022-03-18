describe('Dashboard page', () => {
  const rand = Math.floor(Math.random() * (1000 - 100) + 100);
  const email = `test${rand}@gmail.com`;

  // Login to an account with a house
  // Should really perform resetting and seeding of database instead
  it('initialise state - login to a house', () => {
    indexedDB.deleteDatabase('firebaseLocalStorageDb');
    cy.visit('/auth');
    cy.get('[data-cy="switch-button"]').click();
    cy.get('[data-cy="email-input"]').clear().type(email);
    cy.get('[data-cy="password-input"]').clear().type('password');
    cy.get('[data-cy="confirm-input"]').clear().type('password');
    cy.get('[data-cy="submit-button"]').click();
    cy.wait(3000);
    // check that user should be redirected to their accounts page
    cy.url().should('includes', '/account');
    cy.get('[data-cy="create-button"').click();
    cy.get('[data-cy="house-name-input"]').type('first flat');
    cy.get('[data-cy="create-house-button"]').click();
  });

  // should route to /dashboard
  it('should visits /dashboard', () => {
    cy.visit('/dashboard');
  });

  // Clicking the invite button opens a modal
  it('should open the share link modal', () => {
    cy.get('[data-cy="invite-button"]').click();
    cy.get('[data-cy="invite-modal"]').should('be.visible');
  });

  // Clicking done closes share link modal
  it('should close the share link modal on done', () => {
    cy.get('[data-cy="done-button"]').click();
    cy.get('[data-cy="invite-modal"]').should('not.be.visible');
  });

  // Clicking the user avatar opens a dropdown
  it('should open user dropdown', () => {
    cy.get('[data-cy="user-popover"]').click();
    cy.get('[data-cy="user-dropdown"]').should('be.visible');
  });

  // Clicking the logout button signs users out and returns to login page
  it('should log user out', () => {
    cy.get('[data-cy="dropdown-option"]').contains('Logout').click();
    cy.url().should('includes', '/auth');
  });
});
