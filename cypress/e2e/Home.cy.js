describe('Home Page', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://breakingbadapi.com/api/characters?category=Breaking+Bad', {fixture : 'getMockData.json'});
    cy.visit('http://localhost:3000/');
    cy.get('h1').contains('Breaking Bad');
  })

  it('Should display the title, a button, and a list of characters', () => {
    cy.get('.go-favorites').contains('GO TO FAVORITES');
    cy.get('.app-main').find('.card').should('have.length', '3');
    cy.contains('Bogdan Wolynetz').should('be.visible');
    cy.get(':nth-child(2) > a > .character-image').should('be.visible');
    cy.contains('Lydia Rodarte-Quayle').should('be.visible');
    cy.get(':nth-child(3) > a > .character-image').should('be.visible');
    cy.contains('Carmen Molina').should('be.visible');
    cy.get(':nth-child(4) > a > .character-image').should('be.visible');
  })

  it('Should be able to go back to the home page when clicking page title', () => {
    cy.get('h1').click();
		cy.url().should('eq', 'http://localhost:3000/');
	})

  it('Should be able to display a message when a 404 error occurs', () => {
    cy.intercept('https://breakingbadapi.com/api/characters?category=Breaking+Bad', {
      statusCode: 404
    })
    cy.visit('http://localhost:3000')
    cy.contains("Oopsies! Something went wrong 🤡")
  });
  
})