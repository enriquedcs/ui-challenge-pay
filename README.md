<a href="https://github.com/">
   <img alt="Tested with Playwright" src="https://img.shields.io/static/v1?style=for-the-badge&message=Playwright&color=2EAD33&logo=Playwright&logoColor=FFFFFF&label=">
</a>

# Paylocity Automation Challenge
**Author: Enrique A Decoss**

The purpose of this Repo is to solve the following Automation challenge:

1. **Automate the Workflow:**
Build an automated script using Playwright in Javascript.


2. **Login:**
The script performs automated login before every test run.


## Project Structure

### Page Object Model Architecture
```
page-objects/
├── LoginPage.js     # Handles user authentication and login functionality
├── AddEmployeePage.js   # Main challenge automation, form filling data
```

### Test Files
```
tests/
├── UIChallenge.spec.js   # Main test automation script
├── config.json               # Configuration file with credentials and URLs
```

## Setup Instructions

### Prerequisites
```bash
npm install
```

### Configuration
Update `tests/config.json` with your credentials:
```json
{
    "URL1": "https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/Account/Login",
    "email": "your-email@example.com", 
    "pwd": "your-password"
}
```

## Running Tests

### All Tests
```bash
npx playwright test
```

### Single Test (Challenge Solution)
```bash
npx playwright test tests/UIChallenge.spec.js --headed
```












