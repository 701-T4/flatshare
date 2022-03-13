describe('Landing page', () => {
  // On first start up, routes to /landing if not signed in
  it('visits /landing', () => {
    cy.visit('http://localhost:3000/landing');
  });
});
