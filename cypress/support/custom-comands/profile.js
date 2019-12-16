'use strict'
Cypress.Commands.add('setProfileBio', (bioToSet) => {
  cy.initRouteAs('not.stubbed.pusher', 'pusher')
  cy.get('.UserBio-content').click()
  cy.wait('@pusher')
  cy.get('.editing > .FormControl').clear().type(bioToSet).type('{enter}')
})