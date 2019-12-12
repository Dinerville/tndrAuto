'use strict'
Cypress.Commands.add('initRouteAs', (route, name, payload) => {
  switch (route) {
    case 'stubbed.users':
      cy.route({
        url: `/api/users/${payload.userId}`,
        method: 'POST',
        status: 200,
        response: 'fixture:responses/users',
      }).as(name);
      break;
    case 'not.stubbed.pusher':
      cy.route({
        url: '/api/pusher/auth',
        method: 'POST',
      }).as(name);
      break;
    case 'stubbed.posts':
      cy.route({
        url: '/api/posts**',
        method: 'GET',
        status: 200,
        response: 'fixture:responses/posts',
      }).as(name);
      break;
    case 'not.stubbed.posts':
      cy.route({
        url: '/api/posts',
        method: 'POST',
      }).as(name);
      break;
    case 'not.stubbed.discussionsGet':
      cy.route({
        url: '/api/discussions/*',
        method: 'GET',
      }).as(name);
      break;
    case 'not.stubbed.discussionsPost':
      cy.route({
        url: '/api/discussions/*',
        method: 'POST',
      }).as(name);
      break;
    default:
      cy.log(`No routes initialized, but expected to initialize ${route}`);
  }
});
