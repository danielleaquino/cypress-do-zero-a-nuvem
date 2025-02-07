describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('./src/index.html');
  });
  it('verifica o título da aplicação', () => {
    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT');
  });

  it('preenche os campos obrigatórios e envia o formulário', () =>{
    const longText = Cypress._.repeat('abcdefghijklmnopqrstuvxwyz',10);
    cy.get('[id="firstName"]').type('Danielle');
    cy.get('[id="lastName"]').type('Sobrenome' );
    cy.get('[id="email"]').type('danielle@email.com');    
    cy.get('[id="open-text-area"]').type(longText,{delay:0});
    cy.get('.button').contains('Enviar').click();
    cy.get('.success').should('be.visible');
  });

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('[id="firstName"]').type('Danielle');
    cy.get('[id="lastName"]').type('Sobrenome' );
    cy.get('[id="email"]').type('danielle.com');    
    cy.get('[id="open-text-area"]').type('obrigada.');
    cy.get('.button').contains('Enviar').click();
    cy.get('.error').should('be.visible');
  });
  it('Campo telefone continua vazio quando preenchido com um valor não númerico', () =>{
    cy.get('[id="phone"]')
      .type('abc!@#') 
      .should('have.value', ''); 
  });
  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', ()=>{
    cy.get('[id="firstName"]').type('Danielle');
    cy.get('[id="lastName"]').type('Sobrenome' );
    cy.get('[id="email"]').type('danielle@email.com');
    cy.get('#phone-checkbox').check();    
    cy.get('[id="open-text-area"]').type('obrigada.');
    cy.get('.button').contains('Enviar').click();
    cy.get('.error').should('be.visible');
  });
  
  it('preenche e limpa os campos nome, sobrenome, email e telefone',() =>{
    //Nome
    cy.get('[id="firstName"]')
      .type('Danielle', {delay:0})
      .should('have.value', 'Danielle');

    cy.get('[id="firstName"]')
      .clear()
      .should('have.value','');

    //Sobrenome
    cy.get('[id="lastName"]')
      .type('Souza', {delay:0})
      .should('have.value', 'Souza');

    cy.get('[id="lastName"]')
      .clear()
      .should('have.value','');

    //Email
    cy.get('[id="email"]')
      .type('danielle@email.com', {delay:0})
      .should('have.value', 'danielle@email.com');
    
    cy.get('[id="email"]')
      .clear()
      .should('have.value','');
    
    //Telefone
    cy.get('[id="phone"]')
      .type('123456789')
      .should('have.value', '123456789');

    cy.get('[id="phone"]')
      .clear()
      .should('have.value','');
  });

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios',()=>{
    cy.get('.button').contains('Enviar').click();
    cy.get('.error').should('be.visible');
  });

  it('envia o formuário com sucesso usando um comando customizado',()=>{
    const data = {
      firstName: 'Danielle',
      lastName: 'Souza',
      email:  'danielle@email.com',
      text: 'obrigada'
    }
    cy.fillMandatoryFieldsAndSubmit(data);
    cy.get('.success').should('be.visible');

  });
  it('seleciona um produto (YouTube) por seu texto',()=>{
    cy.get('[id="product"]')
    .select('YouTube')
    .should('have.value','youtube');
  });

  it('seleciona um produto (Mentoria) por seu valor (value)',() => {
    cy.get('[id="product"]')
    .select('mentoria')
    .should('have.value','mentoria');
  });

  it('seleciona um produto (Blog) por seu índice',() => {
    cy.get('[id="product"]')
    .select(1)
    .should('have.value','blog');
  });

  it('marca o tipo de atendimento "Feedback"',() => {
    cy.get('[type="radio"]')
      .check('feedback')
      .should('be.checked');
  });

  it('marca cada tipo de atendimento', () => {
    cy.get('[type="radio"]')
      .each((typeOfService) => {
        cy.wrap(typeOfService)
          .check()
          .should('be.checked');
      });
  });

  it('marca ambos checkboxes, depois desmarca o último', () =>{
    cy.get('[type="checkbox"]')
      .check()
      .should('be.checked');

    cy.get('[type="checkbox"]')
      .last()
      .uncheck()
      .should('not.be.checked');
  });

  it('seleciona um arquivo da pasta fixtures',() =>{
    cy.get('[id="file-upload"]')
      .selectFile('./cypress/fixtures/example.json')
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json');
      });   
  });

  it('seleciona um arquivo simulando um drag-and-drop',() => {
    cy.get('[id="file-upload"]')
      .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop' })
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json');
      });
  });

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () =>{
    cy.fixture('example.json').as('sampleFile')
    cy.get('[id="file-upload"]')
      .selectFile('@sampleFile')
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json');
      });
  });

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.contains('a','Política de Privacidade')
      .should('have.attr','href', 'privacy.html')
      .and('have.attr', 'target', '_blank');
  });
  
  it('testa a página da política de privacidade de forma independente',() => {
    cy.contains('a','Política de Privacidade')
      .invoke('removeAttr', 'target')
      .click()
    cy.url().should('include', 'privacy.html');
  })
  
});