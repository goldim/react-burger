describe('making order', function() {
    before(function() {
      cy.visit('http://localhost:3000/constructor');
    });
  
    it('should open burger constructor by default', function() {
      cy.contains('Оформить заказ');
      cy.contains('Соберите бургер');
    });

    it('should drag and drop ingredient from ingredient list to counstructor', function() {
      cy.get('[data-cy=ingredientList]').first().as('burgerConstructorArea')
      cy.get('[class^=burger-ingredients_menuItem__]').contains('Краторная булка N-200i').as('firstBun');
      cy.get('@firstBun').trigger('dragstart');
      cy.get('@burgerConstructorArea').trigger('drop');

      cy.get('[class^=burger-ingredients_menuItem__]').contains('Филе Люминесцентного тетраодонтимформа').as('firstIngredient');
      cy.get('@firstIngredient').trigger('dragstart');
      cy.get('@burgerConstructorArea').trigger('drop');
      
      cy.intercept('POST', 'https://norma.nomoreparties.space/api/orders', { fixture: 'make-order.json' }).as('makeOrder');
      cy.get('button').contains("Оформить заказ").click();
      // cy.wait('@makeOrder');

      cy.intercept('POST', 'https://norma.nomoreparties.space/api/auth/login', { fixture: 'login.json' }).as('loginMethods');
      cy.visit('http://localhost:3000/login');
      cy.get('.input_type_email .input__icon-action').click();
      cy.get('[name=email]').type('test@mail');
      cy.get('[name=password]').type('test');
      cy.get('button').contains('Войти').click().click();
      
      // cy.wait('@loginMethods');
    });
}); 