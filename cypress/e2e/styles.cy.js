describe('[Styles] - Dashboard', () => {
  describe('when the dashboard is rendered', () => {
    beforeEach(() => {
      cy.visit('/')
    })
  
    it('then the navbar should have a height of 70px and background of #373737', () => {
      cy.get('.header')
        .should('be.visible')
        .and('have.css', 'height', '70px')
        .and('have.css', 'background-color', 'rgb(55, 55, 55)')
    })
  
    describe('when the dropdown button is not active', () => {
      it('then the button should have a height of 40px, width of 200px, and background of #262626', () => {
        cy.get('#dropdown-button')
          .should('be.visible')
          .and('have.css', 'height', '40px')
          .and('have.css', 'width', '200px')
          .and('have.css', 'background-color', 'rgb(38, 38, 38)')
      })
    })
  
    describe('when the dropdown button is in an active state', () => {
      it('then the button should have a 1px outline with the color #0D8B7F', () => {
        cy.get('#dropdown-button').click()
          .should('have.css', 'border', '1px solid rgb(13, 139, 127)')
      })
    })
  
    it('then the tab outline should have a 1px outline of color #E7E7E7', () => {
      cy.get('.tabMenu').within(() => {
        cy.get('.content')
          .should('have.css', 'border-top', '1px solid rgb(231, 231, 231)')
      })
    })
  
    it('then the gender tab and pay equity gap card should have a css property of padding-left 24px', () => {
      cy.get('.tabMenu').within(() => {
        cy.get('.tabList')
          .should('have.css', 'padding-left', '24px')
        cy.get('.content')
          .should('have.css', 'padding-left', '24px')
      })
    })
  
    it('then the card element should have 24px padding, label with color #666, and content with color #000', () => {
      cy.get('.demographicStats').each($stat => {
        cy.wrap($stat).should('have.css', 'padding', '24px')
          .within(() => {
            cy.get('label')
              .and('have.css', 'color', 'rgb(102, 102, 102)')
            cy.get('p')
              .and('have.css', 'color', 'rgb(0, 0, 0)')
          })
      })
    })
  })
})
