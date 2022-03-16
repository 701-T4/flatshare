describe('Dashboard page', () => {
  const rand = Math.floor(Math.random() * (1000 - 100) + 100);
  const email = `test${rand}@gmail.com`;

  // Login to an account with a house
  // Should really perform resetting and seeding of database instead
  it('initialise state - login to a house', () => {
    indexedDB.deleteDatabase('firebaseLocalStorageDb');
    cy.visit('/auth');
    cy.contains('Click here to sign up').click();
    cy.get('[aria-label="Email"]').clear().type(email);
    cy.get('[aria-label="Password"]').clear().type('password');
    cy.get('[aria-label="Confirm password"]').clear().type('password');
    cy.get('button').contains('Sign Up').click();
    cy.wait(3000);
    // check that user should be redirected to their accounts page
    cy.url().should('includes', '/account');
    cy.get('button').contains('CREATE').click();
    cy.get('[aria-label="house name"]').type('first flat');
    cy.get('button').contains('Create!').click();
  });

  // should route to /dashboard
  it('should visits /dashboard', () => {
    cy.visit('/dashboard');
  });

  // Clicking the invite button opens a modal
  it('should open the share link modal', () => {
    cy.contains('Invite').click();
    cy.contains('Invite flatmates!');
  });

  // Clicking done closes share link modal
  it('should close the share link modal on done', () => {
    cy.contains('Done').click();
    cy.contains('Invite flatmates!').should('not.be.visible');
  });

  // Clicking the copy button should copy the link to the clipboard
  it('should copy share link', () => {});

  // Clicking the user avatar opens a dropdown
  it('should open user dropdown', () => {
    cy.get('[alt="User Avatar"]').click();
    cy.contains('View and Modify your User Settings').should('be.visible');
  });

  // Clicking the logout button signs users out and returns to login page
  it('should log user out', () => {
    cy.contains('Logout').click();
    cy.url().should('includes', '/auth');
  });
});
