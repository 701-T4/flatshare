describe('Manage account page', () => {
  const rand = Math.floor(Math.random() * (1000 - 100) + 100);
  const email = `test${rand}@gmail.com`;

  beforeEach(() => {
    //clear all local storage before tests
    indexedDB.deleteDatabase('firebaseLocalStorageDb');

    // Sign Up
    cy.visit('/auth');
    cy.contains('Click here to sign up').click();

    cy.get('[aria-label="Email"]').type(email);
    cy.get('[aria-label="Password"]').clear().type('password');
    cy.get('[aria-label="Confirm password"]').type('password');
    cy.get('button').contains('Sign Up').click();
    cy.wait(5000);

    //direct users to the account page
    cy.url().should('includes', '/account');
  });

  it('click create button will show the createHouse modal', () => {
    cy.get('button').contains('CREATE').click();
    cy.contains('create your first flat').should('be.visible');
  });

  it('create house successfully should go to the dashboad', () => {
    cy.get('[aria-label="house name"]').type('test');
    cy.get('[aria-label="house address"]').type('test address');
    cy.get('[aria-label="house phone number"]').type('021 123445');

    cy.get('button').contains('create!').click();
    //close the modal
    cy.contains('create your first flat').should('not.visible');
    cy.url().should('includes', 'dashboard');
  });

  it('click join button should show the join house modal', () => {
    cy.get('button').contains('JOIN').click();
    cy.contains('Enter House Code').should('be.visible');
  });

  it('submit valid house code shold direct to dashboard', () => {
    cy.get('[aria-label="House Code"]').type('');
    cy.contains('Enter House Code').should('be.visible');
  });
});
