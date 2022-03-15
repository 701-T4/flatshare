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

describe('Join house modal', () => {
  // On first start up, routes to /landing if not signed in
  it('click submit button', () => {
    // find the submit button and click it
    cy.react('JoinHouseModal').find('button').contains('Submit').click();

    // the model shoudld close
    cy.react('JoinHouseModal').should('not.be.visible');
  });
});

//   describe('Create house modal', () => {
//     // On first start up, routes to /landing if not signed in
//     it('click create button', () => {
//      // find the submit button and click it
//      cy.getReact('CreateHouseModal').find('button').contains('Create!').click();

//     // the model shoudld close
//     cy.getReact('CreateHouseModal').should('not.be.visible');
//     });
//   });

//   describe('Create house modal', () => {
//     // On first start up, routes to /landing if not signed in
//     it('click create button', () => {
//      // find the submit button and click it
//      cy.getReact('CreateHouseModal').find('button').contains('Create!').click();

//     // the model shoudld close
//     cy.getReact('CreateHouseModal').should('not.be.visible');
//     });
//   });

//   describe('House Confliect Modal', () => {
//     // On first start up, routes to /landing if not signed in
//     it('click  manage house button', () => {
//      // find the submit button and click it
//      cy.getReact('HouseConfliectModal').find('button').contains('Manage Houses').click();

//     // the model shoudld close
//     cy.getReact('HouseConfliectModal').should('not.be.visible');
//     });
//   });

//   describe('Share Link Modal', () => {
//     // On first start up, routes to /landing if not signed in
//     it('click done button', () => {
//      // find the submit button and click it
//      cy.getReact('ShareLinkModal').find('button').contains('Done').click();

//     // the model shoudld close
//     cy.getReact('ShareLinkModal').should('not.be.visible');
//     });
//   });
