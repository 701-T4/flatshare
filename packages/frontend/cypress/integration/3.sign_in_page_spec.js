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
    cy.contains('Click here to sign up').click();
  });

  // =============== Sign up tests =================
  // clicking on 'already have an account' should switch to the login inputs
  it('switches to login content', () => {
    cy.contains('Already have an account?').click();
    cy.url().should('includes', 'auth');
    cy.contains('LOGIN').should('be.visible');
    cy.contains('Click here to sign up').click();
  });

  // if no email given, warning
  it('gives warning if no email given', () => {
    cy.get('button').contains('Sign Up').click();
    cy.contains('Please enter email').should('be.visible');
  });

  // if email does not contain @ (invalid), warning
  it('gives warning if invalid email is given', () => {
    cy.get('[aria-label="Email"]').type('example');
    cy.get('button').contains('Sign Up').click();
    cy.contains('Please enter a valid email').should('be.visible');
  });

  // if no passwords given, warning
  it('gives warning if no password given', () => {
    cy.get('[aria-label="Email"]').clear().type(email);
    cy.get('[aria-label="Password"]').clear();
    cy.get('[aria-label="Confirm password"]').clear();
    cy.get('button').contains('Sign Up').click();
    cy.contains('Please enter password').should('be.visible');
  });

  // if password given is too weak, warning
  it('gives warning if password is too weak', () => {
    const win = cy.state('window');
    cy.get('[aria-label="Password"]').clear().type('test');
    cy.get('[aria-label="Confirm password"]').clear().type('test');
    cy.get('button').contains('Sign Up').click();
    cy.contains('Please enter a stronger password').should('be.visible');
  });

  // if confirmation password does not match, warning
  it('gives warning if passwords does not match', () => {
    cy.get('[aria-label="Password"]').clear().type('password');
    cy.get('[aria-label="Confirm password"]').clear().type('passwrod');
    cy.get('button').contains('Sign Up').click();
    cy.contains('Passwords must match').should('be.visible');
  });

  // if email given and passwords match, no warning
  it('successfully signs up', () => {
    cy.get('[aria-label="Confirm password"]').clear().type('password');
    cy.get('button').contains('Sign Up').click();
    cy.wait(5000);
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
    cy.get('button').contains('Login').click();
    cy.contains('Please enter email').should('be.visible');
  });

  // if email does not contain @ (invalid), warning
  it('gives warning if invalid email is given', () => {
    cy.get('[aria-label="Email"]').type('example');
    cy.get('button').contains('Login').click();
    cy.contains('Please enter a valid email').should('be.visible');
  });

  // if no passwords given, warning
  it('gives warning if no password given', () => {
    cy.get('[aria-label="Email"]').clear().type(email);
    cy.get('[aria-label="Password"]');
    cy.get('button').contains('Login').click();
    cy.contains('Please enter password').should('be.visible');
  });

  // if not a user, warning
  it('gives warning if not a user', () => {
    cy.get('[aria-label="Email"]').clear().type('fakeuser@gmail.com');
    cy.get('[aria-label="Password"]').type('password');
    cy.get('button').contains('Login').click();
    cy.contains('No such user').should('be.visible');
  });

  // if incorrect password, warning
  it('gives warning if incorrect password given', () => {
    cy.get('[aria-label="Email"]').clear().type(email);
    cy.get('[aria-label="Password"]').type('passwrod');
    cy.get('button').contains('Login').click();
    cy.contains('Wrong Password').should('be.visible');
  });

  // if email and password correct, no warning
  it('successfully logs in', () => {
    cy.get('[aria-label="Password"]').clear().type('password');
    cy.get('button').contains('Login').click();
    cy.wait(2000);
    // check that user should be redirected to their accounts page
    cy.url().should('includes', '/account');
  });
});
