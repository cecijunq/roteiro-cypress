describe('TODOMvc App', () => {
  it('Verifica se app está abrindo', () => {
    cy.visit('')
  })

  it('Insere uma tarefa', () => {
    cy.visit(''); 

    cy.get('[data-cy=todo-input]')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1) 
      .first()
      .should('have.text', 'TP2 de Engenharia de Software'); 
  });

  it('Insere e deleta uma tarefa', () => {
    cy.visit('');

    cy.get('[data-cy=todo-input]')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1);

    cy.get('[data-cy=todos-list] > li [data-cy=remove-todo-btn]')
      .invoke('show')
      .click();

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 0);
  });

  it('Filtra tarefas completas e ativas', () => {
    cy.visit(''); 

    cy.get('[data-cy=todo-input]')
      .type('TP2 de ES{enter}')
      .type('Prova de ES{enter}');

    cy.get('[data-cy=todos-list] > li [data-cy=toggle-todo-checkbox]')
      .first()
      .click();

    cy.get('[data-cy=filter-active-link')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'Prova de ES');

    cy.get('[data-cy=filter-completed-link')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'TP2 de ES');

    cy.get('[data-cy=filter-all-link')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 2);
  });

  it('Não adiciona tarefas vazias', () => {
    cy.visit('');
  
    cy.get('[data-cy=todo-input]').type('{enter}');
  
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 0); // Nenhuma tarefa deve ser adicionada
  });

  it('Marca e desmarca uma tarefa como concluída', () => {
    cy.visit('');
  
    cy.get('[data-cy=todo-input]')
      .type('Estudar Cypress{enter}');
  
    cy.get('[data-cy=todos-list] > li [data-cy=toggle-todo-checkbox]')
      .check()
      .should('be.checked');
  
    cy.get('[data-cy=todos-list] > li')
      .first()
      .should('have.class', 'completed'); // Verifica se aplicou a classe
  
    cy.get('[data-cy=todos-list] > li [data-cy=toggle-todo-checkbox]')
      .uncheck()
      .should('not.be.checked');
  
    cy.get('[data-cy=todos-list] > li')
      .first()
      .should('not.have.class', 'completed');
  });

  it('Remove apenas a tarefa clicada', () => {
    cy.visit('');
  
    cy.get('[data-cy=todo-input]')
      .type('TP2 Engenharia de Software{enter}')
      .type('TP2 ICV{enter}');
  
    cy.get('[data-cy=todos-list] > li')
      .should('have.length', 2);
  
    cy.get('[data-cy=todos-list] > li')
      .first()
      .within(() => {
        cy.get('[data-cy=remove-todo-btn]')
          .invoke('show')
          .click();
      });
  
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'TP2 ICV');
  });
  
});