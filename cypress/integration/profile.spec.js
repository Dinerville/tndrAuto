'use strict'
describe('Profile tests', () => {
  beforeEach(() => {
    cy.visitAndLogin();
    cy.fixture('credentials').as('creds');
  });


  it('Change user profile on front-end only', function () {
    const bioToSet = "I'm from here";
    const stubbedBio = 'stubbed bio';
    cy.navigateToProfile(this.creds.username);
    cy.server();
    cy.initRouteAs('stubbed.users', 'users', { userId: this.creds.id });
    cy.initRouteAs('stubbed.posts', 'getSavedUser');
    cy.setProfileBio(bioToSet);
    cy.wait('@users').then((request) => {
      expect(request.requestBody.data.attributes.bio).to.eq(bioToSet);
    });
    cy.navigateToMainPage();
    cy.navigateToProfile(this.creds.username);
    cy.wait('@getSavedUser');
    cy.get('.UserBio-content > p').should('contain', stubbedBio);
  });
});
