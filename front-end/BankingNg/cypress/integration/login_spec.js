describe('Login', function() {
    it('Logar correntista', function() {
      cy.visit('http://localhost:4200/')     // 1.
  
      cy.get('#cpf') // 2.
        .type('1')   // 3.
  
        cy.get('#senha') // 2.
        .type('1234')

      cy.contains('entrar')      // 6.
        .click()                 // 7.
  
      cy.url()                   // 8.
        .should('include', '/extrato')
    })
  })