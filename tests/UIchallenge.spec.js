/**
 * Author: Enrique A Decoss
 * File: UIChallenge.spec.js
 * Description: Main test automation script for the Automation Challenge website.
 *              Automates the complete workflow: login, form filling, update and delete just happy paths web page is buggy.
 */

const { LoginPage } = require('../page-objects/LoginPage')
const { AddEmployeePage } = require('../page-objects/AddEmployeePage')
const { test, expect } = require('@playwright/test')
const config = require('./config.json')

test.beforeEach(async ({ page }) => {
    // Define credentials
    const username = config.user
    const pwd = config.pwd

    const loginPage = new LoginPage(page)

    await loginPage.goTo()
    await loginPage.login(username, pwd)
})

//Upgrades handle Test data in one file or external source like JSON or CSV, instead of having hardcoded values.
// Keep tests separated but add employee could be a precondition for update and delete tests.
// Parallel execution removed as tests are interdependent.

test('The Automation Challenge - Add Employee', async ({ page }) => {

    const addEmployeePage = new AddEmployeePage(page)

    await addEmployeePage.fillForm({
        firstName: 'John',
        lastName: 'Doe',
        dependants: '0'
    })

    await addEmployeePage.verifyEmployeeAdded({
        firstName: 'John',
        lastName: 'Doe',
        dependants: '0'
    })

})

test('The Automation Challenge - Update Employee', async ({ page }) => {

    const addEmployeePage = new AddEmployeePage(page)

    // Update the employee
    await addEmployeePage.updateEmployee({
        currentFirstName: 'John',
        currentLastName: 'Doe',
        newDependants: '5'
    })

    // Verify the updated employee
    await addEmployeePage.verifyEmployeeAdded({
        firstName: 'John',
        lastName: 'Doe',
        dependants: '5'
    })

})


test('The Automation Challenge - Delete Employee', async ({ page }) => {

    const addEmployeePage = new AddEmployeePage(page)

    // Delete the employee
    await addEmployeePage.deleteEmployee({
        firstName: 'John',
        lastName: 'Doe'
    })

    // Verify the employee was deleted
    await addEmployeePage.verifyEmployeeDeleted({
        firstName: 'John',
        lastName: 'Doe'
    })

})


