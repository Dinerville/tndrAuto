'use strict';

Cypress.Commands.add("login", (creds = 'credentials') => {
    cy.fixture(creds).then((creds)=>{
        return cy.window().then((win) => {
           return win.app.session.login(
               {identification:creds.username,password:creds.password,remember:false}
           )
           .then(() => window.location.reload())
       })
    }) 
    
})

Cypress.Commands.add("visitAndLogin", (creds = 'credentials') => { 
    cy.visit('/')
    cy.login(creds)
})

