Cypress.Commands.add('fillMandatoryFieldsAndSubmit', data => { 
    cy.get('[id="firstName"]').type(data.firstName);
    cy.get('[id="lastName"]').type(data.lastName );
    cy.get('[id="email"]').type(data.email);
    cy.get('[id="open-text-area"]').type(data.text);
    cy.get('.button[type="submit"]').click();
})


// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })