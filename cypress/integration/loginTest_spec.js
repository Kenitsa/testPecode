import LoginPage from '../pages/loginPage';
import users from '../fixtures/users.json';
const expect = require('chai').expect;
const loginPage = new LoginPage();

describe("Log in", () => {

    it("Check that appropriate error massage appear if log in with invalid credetials", function(){
        cy.fixture('users.json').as('users')
        cy.visit("qa-portal/registerlogin/registerlogin.php")
        loginPage.userNameField().type(users.username)
        loginPage.userPasswordField().type(users.password)
        loginPage.submitBtn().click()
        loginPage.userNameErrorMass().should(($massage) =>{
             expect($massage.text()).to.eq('No account found with that username.')
         })
    })

    it("Check that appropriate error massage appear if password field is empty", function(){
       cy.visit("qa-portal/registerlogin/registerlogin.php")
       loginPage.userNameField().type(users.username)
       loginPage.submitBtn().click()
       loginPage.passwordNotEnteredErrorMass().should(($massage) => {
        expect($massage.text()).to.eq('Please enter your password.')
    })
   })

    it("Check that appropriate error massage appear if username field is empty", function(){
        cy.visit("qa-portal/registerlogin/registerlogin.php")
        loginPage.userPasswordField().type(users.password)
        loginPage.submitBtn().click()
        loginPage.userNameErrorMass().should(($massage) =>{
            expect($massage.text()).to.eq('Please enter username.')
        })
    })

    it("Check that appropriate error massage appear if password and username fields are empty", function(){
        cy.visit("qa-portal/registerlogin/registerlogin.php")
        loginPage.submitBtn().click()
        loginPage.userNameErrorMass().should(($massage) => {
            expect($massage.text()).to.eq('Please enter username.')
        })
        loginPage.passwordNotEnteredErrorMass().should(($massage) => {
            expect($massage.text()).to.eq('Please enter your password.')
        })
    })
})
