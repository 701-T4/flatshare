//routers
describe('Landing page', () => {
  // On first start up, routes to / if not signed in
  it('visits /', () => {
    cy.visit('/');
  });
});

describe('Signin page', () => {
  // On first start up, routes to /landing if not signed in
  it('visits /auth', () => {
    cy.visit('/auth');
  });
});

describe('Signin page', () => {
  // On first start up, routes to /landing if not signed in
  it('visits /account', () => {
    cy.visit('/auth');
  });
});

describe('Dashboard page', () => {
  // On first start up, routes to /landing if not signed in
  it('visits /home', () => {
    cy.visit('/home');
  });
});
