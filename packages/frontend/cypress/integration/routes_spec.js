//routers
describe('Routing', () => {
  // On first start up, routes to / if not signed in
  it('visits /', () => {
    cy.visit('/');
  });

  // Routes to /auth if not signed in
  it('visits /auth', () => {
    cy.visit('/auth');
  });

  // On first start up, routes to /account if signed in and has no house
  it('visits /account', () => {
    cy.visit('/auth');
  });

  // On first start up, routes to /dashboard if signed in and has a house
  it('visits /dashboard', () => {
    cy.visit('/home');
  });
});
