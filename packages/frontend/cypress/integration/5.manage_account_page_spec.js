describe('Manage account page', () => {
  const rand1 = Math.floor(Math.random() * (1000 - 0) + 0);
  const rand2 = Math.floor(Math.random() * (2000 - 1000) + 1000);
  const email1 = `test${rand1}@gmail.com`;
  const email2 = `test${rand2}@gmail.com`;

  it('initialise state - login to go to the authorised page', () => {
    //clear all local storage before tests
    indexedDB.deleteDatabase('firebaseLocalStorageDb');

    // Sign Up
    cy.visit('/auth');
    cy.get('[data-cy="switch-button"]').click();

    cy.get('[data-cy="email-input"]').type(email1);
    cy.get('[data-cy="password-input"]').clear().type('password');
    cy.get('[data-cy="confirm-input"]').type('password');
    cy.get('[data-cy="submit-button"]').click();
    cy.wait(5000);

    //direct users to the account page
    cy.url().should('includes', '/account');
  });

  it('click create button will show the createHouse modal', () => {
    cy.get('[data-cy="create-button"]').click();
    cy.get('[data-cy="create-house-modal"]').should('be.visible');
  });

  it('create house should close modal', () => {
    cy.get('[data-cy="house-name-input"]').type(`test${rand1}`);
    cy.get('[data-cy="house-address-input"]').type('test address');
    cy.get('[data-cy="house-phone-input"]').type('021 123445');

    cy.get('[data-cy="create-house-button"]').click();
    //close the modal
    cy.get('[data-cy="create-house-modal"]').should('not.be.visible');
  });

  it('initialise state - login to another account', () => {
    //clear all local storage before tests
    indexedDB.deleteDatabase('firebaseLocalStorageDb');

    // Sign Up
    cy.visit('/auth');
    cy.get('[data-cy="switch-button"]').click();

    cy.get('[data-cy="email-input"]').type(email2);
    cy.get('[data-cy="password-input"]').clear().type('password');
    cy.get('[data-cy="confirm-input"]').type('password');
    cy.get('[data-cy="submit-button"]').click();
    cy.wait(5000);

    //direct users to the account page
    cy.url().should('includes', '/account');
  });

  it('click join button should show the join house modal', () => {
    cy.get('[data-cy="join-button"]').click();
    cy.get('[data-cy="join-house-modal"]').should('be.visible');
  });

  it('submit house code should close the modal', () => {
    cy.get('[data-cy="house-code-input"]').type(`test${rand1}`);
    cy.get('[data-cy="join-house-button"]').click();
    cy.get('[data-cy="join-house-modal"]').should('not.be.visible');
  });
});
