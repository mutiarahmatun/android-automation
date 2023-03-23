import login from '../selectors/login.sel'
import cart from "../selectors/cart.sel";

const credentials = {
  UserType1: {
    username: 'standard_user',
    password: 'secret_sauce',
  },
};

describe('Login', () => {
  context('successful', () => {
    beforeEach(() => {
      cy.visit('https://www.saucedemo.com/')
    })

    it('can successfully log in', function () {
      const password = Cypress.env('password')

      cy.get(login.userNameField).type(credentials.UserType1.username)
      cy.get(login.passwordField).type(credentials.UserType1.password)
      cy.get(login.signInButton).click()
    })
  })
})

describe('Convert to JSON', () => {
  it('reading data from Excel', () => {
    cy.parseXlsx('cypress/fixtures/Product.xlsx').then( (jsonData) => {
      const rowLength = Cypress.$(jsonData[0].data).length
      for (let index = 1; index < rowLength; index++) {
        // var jsonData = jsonData[index]
        console.log(jsonData[0].data[index])
        cy.contains(cart.item, jsonData[0].data[index]).should(be.visible)

      }
    })

  })
})