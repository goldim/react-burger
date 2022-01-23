describe('making order', function() {
    before(function() {
      cy.visit('http://localhost:3000');
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
      
      cy.get('button').contains("Оформить заказ").click();
    });
}); 