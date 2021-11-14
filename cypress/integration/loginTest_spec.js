import LoginPage from '../pages/loginPage';
import users from '../fixtures/users.json';
import errorMesText from '../fixtures/errorMesText.json';
const expect = require('chai').expect;
const loginPage = new LoginPage();

describe("Log in", () => {
    beforeEach(() => {
       cy.visit('qa-portal/registerlogin/registerlogin.php')
      })

    it("Should render username field", () => {
       loginPage.userNameField().type(users.username).should("be.visible");
      }); 

    it("Should render password field", () => {
       loginPage.userPasswordField().type(users.password).should("be.visible");
       });

    it("Should render submit button", () => {
       loginPage.submitBtn().should("be.visible");
       });

    it("Check that appropriate error massage appear if log in with invalid credetials", function(){
        cy.fixture('users.json').as('users')
        cy.fixture('errorMesText.json').as('errorMesText')
        loginPage.userNameField().type(users.username)
        loginPage.userPasswordField().type(users.password)
        loginPage.submitBtn().click()
        loginPage.userNameErrorMass().should(($massage) =>{
             expect($massage.text()).to.eq(errorMesText.errorInvCredentials)
         })
    })

    it("Check that appropriate error massage appear if login with empty password field", function(){
       loginPage.userNameField().type(users.username)
       loginPage.submitBtn().click()
       loginPage.passwordNotEnteredErrorMass().should(($massage) => {
            expect($massage.text()).to.eq(errorMesText.passwordErrorMesText)
         })
   })

    it("Check that appropriate error massage appear if login with password and empty username field", function(){
        loginPage.userPasswordField().type(users.password)
        loginPage.submitBtn().click()
        loginPage.userNameErrorMass().should(($massage) =>{
            expect($massage.text()).to.eq(errorMesText.usernameErrorMesText)
        })
    })

    it("Check that appropriate error massage appear if login with empty password and username fields", function(){
        loginPage.submitBtn().click()
        loginPage.userNameErrorMass().should(($massage) => {
            expect($massage.text()).to.eq(errorMesText.usernameErrorMesText)
        })
        loginPage.passwordNotEnteredErrorMass().should(($massage) => {
            expect($massage.text()).to.eq(errorMesText.passwordErrorMesText)
        })
    })
    it('Сheck the success of registration with the correct data of the authorized user', function () {
        loginPage.userNameField().type(users.authorizedUser.username)
        loginPage.userPasswordField().type(users.authorizedUser.password)
        loginPage.submitBtn().click()
        cy.url()
        .should('eq', 'newUrl')
    })

    it("Сhecks for an error warning when entering more than the allowable number of characters in the username field", function(){
        loginPage.userNameField().type(users.incorrectDataUser.username)
        loginPage.userPasswordField().type(users.password)
        loginPage.submitBtn().click()
        loginPage.userNameErrorMass().should(($massage) =>{
             expect($massage.text()).to.eq("Username must be between 3 to 128 characters")
         })
    })

    it("Check for error when entering an invalid password", function(){
        loginPage.userNameField().type(users.username)
        loginPage.userPasswordField().type(users.incorrectDataUser.password)
        loginPage.submitBtn().click()
        loginPage.userNameErrorMass().should(($massage) =>{
             expect($massage.text()).to.eq("The password must be at least 6 characters")
         })
    })
})
