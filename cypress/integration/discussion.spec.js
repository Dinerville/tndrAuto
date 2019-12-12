'use strict'
describe('Discussions tests', () => {
  beforeEach(() => {
    cy.visitAndLogin();
  });

  it('Post a reply', () => {
    const post = 'test';
    const text = `test reply ${Date.now()}`;

    cy.visit('/t/sandbox');
    cy.get('.DiscussionListItem-title').contains(new RegExp(`^${post}$`)).click();
    cy.get('[title=Reply]').filter(':visible').first().click();
    cy.get('#textarea1').type(text);
    cy.server();
    cy.route({
      url: '/api/posts',
      method: 'POST',
    }).as('post');
    cy.route({
      url: '/api/discussions/*',
      method: 'GET',
    }).as('getDiscussions');
    cy.route({
      url: '/api/discussions/*',
      method: 'POST',
    }).as('discussions');

    cy.get("[title='Post Reply']").click();
    cy.wait(['@post', '@getDiscussions', '@discussions']);

    cy.reload();
    cy.get('.Post-body').should(($el) => {
      expect($el.last()).to.contain(text);
    });
  });
});
