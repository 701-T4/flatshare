describe('Sign up page', () => {
  // clear all local storage before tests
  beforeEach(() => {
    indexedDB.deleteDatabase('firebaseLocalStorageDb');
  });

  // should route to /auth
  it('should visits /auth', () => {
    cy.visit('/auth');
    cy.contains('Click here to sign up').click();
  });

  // clicking on 'already have an account' should switch to the login inputs
  it('switches to login', () => {
    cy.contains('Already have an account?').click();
    cy.url().should('includes', 'auth');
    cy.contains('LOGIN').should('be.visible');
    cy.contains('Click here to sign up').click();
  });

  // if no email given, warning
  it('gives warning if no email given', () => {
    cy.contains('Sign Up').click();
    cy.contains('Please enter email').should('be.visible');
  });

  // if email does not contain @ (invalid), warning
  it('gives warning if invalid email is given', () => {
    cy.get('[aria-label="Email"]').type('example');
    cy.contains('Sign Up').click();
    cy.contains('Please enter a valid email').should('be.visible');
  });

  // if no passwords given, warning
  it('gives warning if no password given', () => {
    const rand = Math.floor(Math.random() * (1000 - 100) + 100);
    cy.get('[aria-label="Email"]').clear().type(`test${rand}@gmail.com`);
    cy.get('[aria-label="Password"]').clear();
    cy.get('[aria-label="Confirm password"]').clear();
    cy.contains('Sign Up').click();
    cy.contains('Please enter password').should('be.visible');
  });

  // if password given is too weak, warning
  it('gives warning if password is too weak', () => {
    const win = cy.state('window');
    cy.get('[aria-label="Password"]').clear().type('test');
    cy.get('[aria-label="Confirm password"]').clear().type('test');
    cy.contains('Sign Up').click();
    cy.contains('Please enter a stronger password').should('be.visible');
  });

  // if confirmation password does not match, warning
  it('gives warning if passwords does not match', () => {
    cy.get('[aria-label="Password"]').clear().type('password');
    cy.get('[aria-label="Confirm password"]').clear().type('passwrod');
    cy.contains('Sign Up').click();
    cy.contains('Passwords must match').should('be.visible');
  });

  // if email given and passwords match, no warning
  it('successfully signs up', () => {
    cy.get('[aria-label="Confirm password"]').clear().type('password');
    cy.contains('Sign Up').click();
    cy.wait(2000);
    // check that user should be redirected to their accounts page
    cy.url().should('includes', '/account');
  });
});
