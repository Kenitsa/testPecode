class LoginPage {
    userNameField() {
        return cy.get('input[type="text"]')
    }

    userPasswordField() {
        return  cy.get('input[type="password"]')
    }

    submitBtn() {
        return cy.get('input[type="submit"]')
    }

    userNameErrorMass() {
        return cy.get('input[name="username"] + .help-block')
    }

    loginNotEnteredErrorMass() {
        return cy.get('input[name="username"] + .help-block')
    }

    passwordNotEnteredErrorMass() {
        return cy.get('input[name="password"] + .help-block')
    }
}

export default LoginPage;
