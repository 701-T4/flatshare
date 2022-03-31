describe('Sign in page', () => {
  const rand = Math.floor(Math.random() * (1000 - 100) + 100);
  const email = `test${rand}@gmail.com`;

  // clear all local storage before tests
  // Should really perform resetting and seeding of database instead
  beforeEach(() => {
    indexedDB.deleteDatabase('firebaseLocalStorageDb');
  });

  // should route to /auth
  it('should visits /auth', () => {
    cy.visit('/auth');
    cy.get('[data-cy="switch-button"]').click();
  });

  // =============== Sign up tests =================
  // clicking on 'already have an account' should switch to the login inputs
  it('switches to login content', () => {
    cy.get('[data-cy="switch-button"]').click();
    cy.url().should('includes', 'auth');
    cy.get('[data-cy="name-input"]').should('not.exist');
    cy.get('[data-cy="switch-button"]').click();
  });

  // if no email given, warning
  it('gives warning if no email given', () => {
    cy.get('[data-cy="submit-button"]').click();
    cy.get('[data-cy="corner-alert"]').should('be.visible');
  });

  // if email does not contain @ (invalid), warning
  it('gives warning if invalid email is given', () => {
    cy.get('[data-cy="email-input"]').type('example');
    cy.get('[data-cy="submit-button"]').click();
    cy.get('[data-cy="corner-alert"]').should('be.visible');
  });

  // if no passwords given, warning
  it('gives warning if no password given', () => {
    cy.get('[data-cy="email-input"]').clear().type(email);
    cy.get('[data-cy="password-input"]').clear();
    cy.get('[data-cy="confirm-input"]').clear();
    cy.get('[data-cy="submit-button"]').click();
    cy.get('[data-cy="corner-alert"]').should('be.visible');
  });

  // if password given is too weak, warning
  it('gives warning if password is too weak', () => {
    cy.get('[data-cy="password-input"]').clear().type('test');
    cy.get('[data-cy="confirm-input"]').clear().type('test');
    cy.get('[data-cy="submit-button"]').click();
    cy.get('[data-cy="corner-alert"]').should('be.visible');
  });

  // if confirmation password does not match, warning
  it('gives warning if passwords does not match', () => {
    cy.get('[data-cy="password-input"]').clear().type('password');
    cy.get('[data-cy="confirm-input"]').clear().type('passwrod');
    cy.get('[data-cy="submit-button"]').click();
    cy.get('[data-cy="corner-alert"]').should('be.visible');
  });

  // if email given and passwords match, no warning
  it('successfully signs up', () => {
    cy.get('[data-cy="confirm-input"]').clear().type('password');
    cy.get('[data-cy="submit-button"]').click();
    cy.wait(8000);
    // check that user should be redirected to their accounts page
    cy.url().should('includes', '/account');
    cy.wait(2000);
  });

  // =============== Login tests =================
  // visit login
  it('navigate back to login page', () => {
    cy.visit('/auth');
    cy.wait(2000);
  });

  // if no email given, warning
  it('gives warning if no email given', () => {
    cy.get('[data-cy="submit-button"]').click();
    cy.get('[data-cy="corner-alert"]').should('be.visible');
  });

  // if email does not contain @ (invalid), warning
  it('gives warning if invalid email is given', () => {
    cy.get('[data-cy="email-input"]').type('example');
    cy.get('[data-cy="submit-button"]').click();
    cy.get('[data-cy="corner-alert"]').should('be.visible');
  });

  // if no passwords given, warning
  it('gives warning if no password given', () => {
    cy.get('[data-cy="email-input"]').clear().type(email);
    cy.get('[data-cy="submit-button"]').click();
    cy.get('[data-cy="corner-alert"]').should('be.visible');
  });

  // if not a user, warning
  it('gives warning if not a user', () => {
    cy.get('[data-cy="email-input"]').clear().type('fakeuser@gmail.com');
    cy.get('[data-cy="password-input"]').type('password');
    cy.get('[data-cy="submit-button"]').click();
    cy.get('[data-cy="corner-alert"]').should('be.visible');
  });

  // if incorrect password, warning
  it('gives warning if incorrect password given', () => {
    cy.get('[data-cy="email-input"]').clear().type(email);
    cy.get('[data-cy="password-input"]').type('passwrod');
    cy.get('[data-cy="submit-button"]').click();
    cy.get('[data-cy="corner-alert"]').should('be.visible');
  });

  // if email and password correct, no warning
  it('successfully logs in', () => {
    cy.get('[data-cy="password-input"]').clear().type('password');
    cy.get('[data-cy="submit-button"]').click();
    cy.wait(8000);
    // check that user should be redirected to their accounts page
    cy.url().should('includes', '/account');
  });
});
