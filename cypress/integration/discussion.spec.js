'use strict'
describe('Discussions tests', () => {
  beforeEach(() => {
    cy.visitAndLogin();
  });

  it('Post a reply', () => {
    const post = 'test';
    const text = `test reply ${Date.now()}`;
    cy.navigateToSandbox();
    cy.openDiscussion(post);
    cy.reply(text);
    cy.reload();
    cy.get('.Post-body').should(($el) => {
      expect($el.last()).to.contain(text);
    });
  });
});
