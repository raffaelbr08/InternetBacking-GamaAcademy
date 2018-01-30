describe('Transferencia', function () {
    it('Logar correntista', function () {
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
    it('Executa transferencia', function () {

        cy.get('#transferencia').click()

        cy.url()                   // 8.
            .should('include', '/transferencia')  // 3.

        cy.get('#dadosConta').click()

        cy.url().should('include', '/transferencia/outra-conta')    

        cy.get('#agencia').type(`${466}`).wait(400)
        cy.get('#destino').type(`${101063588}`)
        cy.get('#nome').type('Felipe')
        cy.get('input[name=cadastrar]').click()        
        
        cy.get('input[name=valor]').type(`${10}`)

        cy.contains('Avançar').click()

        cy.url().should('include', '/transferencia/token')

        cy.contains('Avançar').click()

        cy.url().should('include', '/transferencia/confirmacao')
    })
    it('Confirmacao', function () {

        cy.contains('Everton Gil')
        cy.contains('Ag 466')
        cy.contains('CC 101063585')

        cy.contains('Felipe')
        cy.contains('Ag 466')
        cy.contains('CC 101063588')

        cy.contains('Valor da transferência:')
        cy.contains('R$10')


        cy.contains('Confirmar Transferência').click()

        cy.url().should('include', '/transferencia/sucesso')
    })
    it('Realizar nova Transferência', function () {

        cy.contains('Realizar nova transferencia').click()

        cy.url().should('include', '/transferencia')
        cy.contains('Selecione um favorecido').click()
        cy.url().should('include', '/transferencia/favorecidos')    
        
    })
    it('Favorecidos', function () {

        cy.contains('Felipe')
        cy.contains('Ag: 466')
        cy.contains('Conta: 101063588').click()

        cy.url().should('include', '/transferencia/outra-conta')    
        
    })
    it('Transfere', function(){

        cy.get('input[name=valor]').type(`${10}`)
        
        cy.contains('Avançar').click()
        
        cy.url().should('include', '/transferencia/token')
        
        cy.contains('Avançar').click()
        
        cy.url().should('include', '/transferencia/confirmacao')
        cy.contains('Everton Gil')
        cy.contains('Ag 466')
        cy.contains('CC 101063585')

        cy.contains('Felipe')
        cy.contains('Ag 466')
        cy.contains('CC 101063588')

        cy.contains('Valor da transferência:')
        cy.contains('R$10')


        cy.contains('Confirmar Transferência').click()

        cy.url().should('include', '/transferencia/sucesso')
        cy.contains('extrato').click()
        cy.url().should('include', '/extrato')
    })
    it('Logout', function(){
        cy.contains('Sair').click()
        cy.url().should('include', '/')
        
    })
})