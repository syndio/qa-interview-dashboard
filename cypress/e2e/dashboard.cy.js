describe('[API] - Dashboard', () => {
  describe('when the mock api is called', () => {
    it('then the group names should appear in the header dropdown', () => {
      cy.visit('/')
      cy.get('#dropdown-button').click()
      cy.get('.optionsList').within(() => {
        cy.contains('li', 'Group by Function')
          .should("be.visible")
        cy.contains('li', 'Group by Role')
          .should("be.visible")
      })
    })

    describe('when data is fetched from the mock api', () => {
      let budgetValue, employeeCompValue, majorityValue, minorityValue
      
      beforeEach(() => {
        cy.request('https://run.mocky.io/v3/a9f6a4b7-d03c-4a45-b64b-791e054f36b8')
          .then(({ body: { data: { gender } }}) => {
            budgetValue = gender.budget.data.value
            employeeCompValue = gender.employeeComparison.data.value
            majorityValue = gender.payEquityGap.data.majority.value
            minorityValue = gender.payEquityGap.data.minority.value
          })
      })

      it('then the values on the dashboard should match the api response', () => {
        cy.visit('/')
        cy.get('#payEquityGap').find('strong')
          .should('include.text', majorityValue)
          .and('include.text', minorityValue)
          .and('have.length', 2)
        cy.get('#employeeComparison').find('strong')
          .should('have.text', employeeCompValue)
        cy.get('#budget').find('strong')
          .should('have.text', budgetValue)
      })
    })
  })
})
