import LoginPage from '../pages/loginPage';
import users from '../fixtures/users.json';
import errorMesText from '../fixtures/errorMesText.json';
const expect = require('chai').expect;
const loginPage = new LoginPage();

describe("Log in", () => {
    beforeEach(() => {
       cy.visit('qa-portal/registerlogin/registerlogin.php')
      })

    it("Checks the username field present on the page", () => {
       loginPage.userNameField().type(users.authorizedUser.username).should("be.visible");
      }); 

    it("Checks the password field present on the page", () => {
       loginPage.userPasswordField().type(users.authorizedUser.password).should("be.visible");
       });

    it("Checks the submit button present on the page", () => {
       loginPage.submitBtn().should("be.visible");
       });

    it("Check that appropriate error massage appear if log in with invalid credetials", function(){
        cy.fixture('users.json').as('users')
        cy.fixture('errorMesText.json').as('errorMesText')
        loginPage.userNameField().type(users.notAuthorized.username)
        loginPage.userPasswordField().type(users.notAuthorized.password)
        loginPage.submitBtn().click()
        loginPage.userNameErrorMass().should(($massage) =>{
             expect($massage.text()).to.eq(errorMesText.errorInvCredentials)
         })
    })

    it("Check that appropriate error massage appear if login with empty password field", function(){
       loginPage.userNameField().type(users.notAuthorized.username)
       loginPage.submitBtn().click()
       loginPage.passwordNotEnteredErrorMass().should(($massage) => {
            expect($massage.text()).to.eq(errorMesText.passwordErrorMesText)
         })
   })

    it("Check that appropriate error massage appear if login with password and empty username field", function(){
        loginPage.userPasswordField().type(users.notAuthorized.password)
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
             expect($massage.text()).to.eq(tooManyCharactersUserError)
         })
    })

    it("Check for error when entering an invalid password", function(){
        loginPage.userNameField().type(users.authorizedUser.username)
        loginPage.userPasswordField().type(users.incorrectDataUser.password)
        loginPage.submitBtn().click()
        loginPage.userNameErrorMass().should(($massage) =>{
             expect($massage.text()).to.eq(notEnoughPasswordCharacters)
         })
    })
})
