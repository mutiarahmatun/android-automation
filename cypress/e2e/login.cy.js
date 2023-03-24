// import login from '../selectors/login.sel'
// import cart from "../selectors/cart.sel";
//
// const credentials = {
//   UserType1: {
//     username: 'standard_user',
//     password: 'secret_sauce',
//   },
// };
//
// describe('Login', () => {
//   context('successful', () => {
//     // beforeEach(() => {
//     //
//     // })
//
//     it('can successfully log in', function () {
//       cy.visit('https://www.saucedemo.com/')
//       const password = Cypress.env('password')
//
//       cy.get(login.userNameField).type(credentials.UserType1.username)
//       cy.get(login.passwordField).type(credentials.UserType1.password)
//       cy.get(login.signInButton).click()
//     })
//   })
// })
//
// describe('Convert to JSON', () => {
//   it('reading data from Excel', () => {
    // cy.parseXlsx('cypress/fixtures/Product.xlsx').then( (jsonData) => {
    //   const rowLength = Cypress.$(jsonData[0].data).length
    //   for (let index = 1; index < rowLength; index++) {
    //     // var jsonData = jsonData[index]
    //     console.log(jsonData[0].data[index])
    //     cy.contains(cart.item, jsonData[0].data[index]).should(be.visible)

    //   }
    // })
//
//   })
// })

describe('Shopping Cart Test Suite', () => {
  it('should add items to cart and complete payment', () => {
    // Visit the URL
    cy.visit('https://www.saucedemo.com')

    // Login using the account
    cy.get('#user-name').type('standard_user')
    cy.get('#password').type('secret_sauce')
    cy.get('#login-button').click()

    // Read the XLSX file containing the item names to add to cart
    // cy.readFile('cypress/fixtures/Product.xlsx').then((file) => {
      cy.parseXlsx('cypress/fixtures/Product.xlsx').then( (jsonData) => {
        const rowLength = Cypress.$(jsonData[0].data).length
        for (let index = 1; index < rowLength; index++) {
          // var jsonData = jsonData[index]
          console.log(jsonData[0].data[index])
          // cy.contains(cart.item, jsonData[0].data[index]).should(be.visible)
          cy.get('.inventory-list')
          .contains(jsonData[0].data[index])
          .siblings('.pricebar')
          .children('.btn_primary')
          .click()
  
        }

        // Go to the cart and checkout
      cy.get('.shopping_cart_link').click()
      cy.contains('Checkout').click()

      // Fill out the checkout form
      cy.get('#first-name').type('John')
      cy.get('#last-name').type('Doe')
      cy.get('#postal-code').type('12345')
      cy.contains('Continue').click()

      // Verify the total amount is correct
      cy.get('.summary_total_label')
        .siblings('.summary_value_label')
        .should('contain', '$100.00')

      // Finish the payment
      cy.contains('Finish').click()

      // Verify the order confirmation message
      cy.contains('THANK YOU FOR YOUR ORDER')
      })
      
      
    // })
  })
})

// describe('The Home Page', () => {
//   it('successfully loads', () => {
//     cy.visit('http://localhost:8080') // change URL to match your dev URL
//   })
// })

// describe('Sauce Demo', () => {
//   it('should log in, add items to the cart, and complete the purchase', () => {
//     // Visit the login page
//     cy.visit('http://www.saucedemo.com')

//     // Enter login credentials
//     cy.get('#user-name').type('standard_user')
//     cy.get('#password').type('secret_sauce')
//     cy.get('#login-button').click()

//     // Verify login success
//     cy.url().should('include', '/inventory.html')

//     // Add two items to the cart
//     cy.get('.inventory_list > :nth-child(1) .btn_primary').click()
//     cy.get('.inventory_list > :nth-child(2) .btn_primary').click()

//     // Verify items were added to the cart
//     cy.get('.shopping_cart_badge').should('have.text', '2')

//     // Go to the cart page
//     cy.get('.shopping_cart_link').click()

//     // Verify items are in the cart
//     cy.get('.cart_item').should('have.length', 2)

//     // Proceed to checkout
//     cy.get('.checkout_button').click()

//     // Fill out the checkout form
//     cy.get('#first-name').type('John')
//     cy.get('#last-name').type('Doe')
//     cy.get('#postal-code').type('12345')
//     cy.get('.checkout_button').click()

//     // Verify the final total price
//     cy.get('.summary_total_label').should('have.text', 'Total: $44.76')

//     // Finish purchase
//     cy.get('.cart_button').click()
//     cy.get('#first-name').type('John')
//     cy.get('#last-name').type('Doe')
//     cy.get('#postal-code').type('12345')
//     cy.get('.checkout_button').click()

//     // Verify purchase completion
//     cy.get('.complete-header').should('have.text', 'THANK YOU FOR YOUR ORDER')
//   })
// })
