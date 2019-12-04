'use strict';
/// <reference types="Cypress" />

describe('Assessment for Tinder Web',()=>{
    beforeEach(()=>{
        cy.visitAndLogin()
    })
    it('Change user profile on front-end only',function(){
        const bioToSet = "I'm from here"
        const stubbedBio = 'stubbed bio'
        cy.fixture('credentials').then((creds)=>{
            cy.fixture('responses/users').then((userResp)=>{
                userResp.data.attributes.bio = stubbedBio
                cy.visit(`/u/${creds.username}`)
                cy.server()
                cy.route({
                    url: '/api/users/*',
                    method: 'POST',
                    status: 200,
                    response: userResp
                }).as('users')
                cy.route({
                    url:'/api/pusher/auth',
                    method: 'POST'
                }).as('pusher')
                cy.route({
                    url: '/api/posts**',
                    method: 'GET',
                    status: 200,
                    response: 'fixture:responses/posts'
                }).as('getSavedUser')

                cy.get('.UserBio-content').click()
                cy.wait('@pusher')
                cy.get('.editing > .FormControl').clear().type(bioToSet).type('{enter}')
                cy.wait('@users').then((request)  => {
                    expect(request.requestBody.data.attributes.bio).to.eq(bioToSet)
                }) 
                    
                cy.visit('/')
                cy.visit(`/u/${creds.username}`)
                cy.wait('@getSavedUser')
                cy.get('.UserBio-content>p').should('contain',stubbedBio)  
            })
        })
    })
})