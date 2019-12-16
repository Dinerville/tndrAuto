'use strict'
Cypress.Commands.add('navigateToProfile', (username) => {
  cy.visit(`/u/${username}`);
});

Cypress.Commands.add('navigateToMainPage', () => {
  cy.visit('/');
});

Cypress.Commands.add('navigateToSandbox', () => {
  cy.visit('/t/sandbox');
});
