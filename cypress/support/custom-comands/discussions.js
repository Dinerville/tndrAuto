Cypress.Commands.add('openDiscussion', (discussion) => {
  cy.get('.DiscussionListItem-title').contains(new RegExp(`^${discussion}$`)).click();
});

Cypress.Commands.add('reply', (text) => {
  cy.get('[title=Reply]').filter(':visible').first().click();
  cy.get('#textarea1').type(text)
  cy.server();
  cy.initRouteAs('not.stubbed.posts', 'post');
  cy.initRouteAs('not.stubbed.discussionsGet', 'getDiscussions');
  cy.initRouteAs('not.stubbed.discussionsPost', 'discussions');
  cy.get("[title='Post Reply']").click();
  cy.wait(['@post', '@getDiscussions', '@discussions']);
});