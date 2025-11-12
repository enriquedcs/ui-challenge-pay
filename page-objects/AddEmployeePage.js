/**
 * Author: Enrique A Decoss
 * File: AddEmployeePage.js
 * Description: Page Object Model for the Add Employee functionality of the Automation Challenge website.
 *              Handles the form filling and update and delete employees.
 */


class AddEmployeePage {

    constructor(page) {
        this.page = page;

        // Locators within the login modal
        this.addEmployee = page.getByRole('button', { name: 'Add Employee' })
        this.firstNameInput = page.locator('#firstName')
        this.lastNameInput = page.locator('#lastName')
        this.dependantsInput = page.locator('#dependants')
        this.addButton = page.locator('#addEmployee')
        this.updateButton = page.locator('#updateEmployee')
        this.deleteButton = page.locator('#deleteEmployee')
        this.employeesTable = page.locator('#employeesTable')

    }

    async fillForm({ firstName, lastName, dependants }) {
        await this.page.waitForLoadState('networkidle')
        await this.addEmployee.click()
        await this.firstNameInput.fill(firstName)
        await this.lastNameInput.fill(lastName)
        await this.dependantsInput.fill(dependants)
        await this.addButton.click()
    }

    async verifyEmployeeAdded({ firstName, lastName, dependants }) {
        // Wait for the table to be visible
        await this.employeesTable.waitFor({ state: 'visible' })

        // Find the row that contains the employee data
        const row = this.page.locator(`#employeesTable tbody tr:has-text("${lastName}"):has-text("${firstName}")`)
        await row.waitFor({ state: 'visible', timeout: 10000 })

        // Verify the dependants value in the row
        const dependantsCell = row.locator('td').nth(3)
        await dependantsCell.waitFor({ state: 'visible' })
    }

    async updateEmployee({ currentFirstName, currentLastName, newFirstName, newLastName, newDependants }) {
        // Find the row with the current employee data
        await this.page.waitForLoadState('networkidle')
        const row = this.page.locator(`#employeesTable tbody tr:has-text("${currentLastName}"):has-text("${currentFirstName}")`)
        await row.waitFor({ state: 'visible', timeout: 10000 })

        // Click the edit icon in the Actions column
        const editIcon = row.locator('.fa-edit')
        await editIcon.click()

        // Clear and fill only the fields that have new values
        if (newFirstName !== undefined && newFirstName !== null) {
            await this.firstNameInput.clear()
            await this.firstNameInput.fill(newFirstName)
        }
        if (newLastName !== undefined && newLastName !== null) {
            await this.lastNameInput.clear()
            await this.lastNameInput.fill(newLastName)
        }
        if (newDependants !== undefined && newDependants !== null) {
            await this.dependantsInput.clear()
            await this.dependantsInput.fill(newDependants)
        }

        // Click the same button used for adding (it becomes Update when editing)
        await this.updateButton.click()
    }

    async deleteEmployee({ firstName, lastName }) {
        // Find the row with the employee data
        await this.page.waitForLoadState('networkidle')
        const row = this.page.locator(`#employeesTable tbody tr:has-text("${lastName}"):has-text("${firstName}")`)
        await row.waitFor({ state: 'visible', timeout: 10000 })

        // Click the delete icon in the Actions column
        const deleteIcon = row.locator('.fa-times')
        await deleteIcon.click()

        // Click the confirm delete button
        await this.deleteButton.click()
    }

    async verifyEmployeeDeleted({ firstName, lastName }) {
        // Verify the employee row is no longer visible
        const row = this.page.locator(`#employeesTable tbody tr:has-text("${lastName}"):has-text("${firstName}")`)
        await row.waitFor({ state: 'hidden', timeout: 10000 })
    }

}
module.exports = { AddEmployeePage }