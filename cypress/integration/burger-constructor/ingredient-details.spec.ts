describe('opening ingredient details', function() {
    before(function() {
      cy.visit('http://localhost:3000');
    });

    it('should open and close bun details', function() {
      cy.get('[class^=burger-ingredients_menuItem__]').contains('Краторная булка N-200i').as('firstBun');
      cy.get('@firstBun').click();
      cy.contains('Детали ингредиента');

      cy.get('[class^=modal_CloseButton__]').first().click();
      cy.contains('Детали ингредиента').should('not.exist');
    });
}); 