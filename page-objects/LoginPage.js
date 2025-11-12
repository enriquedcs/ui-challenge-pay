/**
 * Author: Enrique A Decoss
 * File: LoginPage.js
 * Description: Page Object Model for the login funcionality of the Automation Challenge website.
 *              Handles user authentication including login form interations.
 */

const config = require('../tests/config.json')
const { test, expect } = require('@playwright/test')

class LoginPage {

    constructor(page) {
        this.page = page

        // Locators within the login modal
        this.usernameInput = page.getByRole('textbox', { name: 'Username' })
        this.passwordInput = page.getByRole('textbox', { name: 'Password' })
        this.logInButton = page.getByRole('button', { name: 'LOG IN' })
        this.addEmployee = page.getByRole('button', { name: 'Add Employee' })
    }

    async goTo() {
        await this.page.goto(config.URL1, { waitUntil: 'networkidle' })
    }

    // A method to perform the login action
    async login(username, password) {
        //Input fields
        await this.usernameInput.fill(username, { force: true })
        await this.passwordInput.fill(password, { force: true })
        await this.logInButton.click()

        // Adding an Assertion to confirm login was succesful
        //Wait for Add Employee button be visible
        await expect(this.addEmployee).toBeVisible({ timeout: 15000 })
    }
}
module.exports = { LoginPage }