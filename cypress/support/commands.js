'use strict';

/**
 * Logins to the application
 *
 * @param creds a String naming fixture with credentials
 */
Cypress.Commands.add('login', (creds = 'credentials') => {
  cy.fixture(creds).then((cred) => cy.window().then((win) => win.app.session.login(
    { identification: cred.username, password: cred.password, remember: false },
  )
    .then(() => window.location.reload())));
});

/**
 * Visit the application and Logins
 *
 * @param creds a String naming fixture with credentials
 */
Cypress.Commands.add('visitAndLogin', (creds = 'credentials') => {
  cy.visit('/');
  cy.login(creds);
});
