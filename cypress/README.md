## Instructions to run the tests

Before running the tests, please ensure you have completed the instructions to run the dashboard and
currently have an instance of the dashboard running (see root README).

Note: These commands should be run at the root of the project.

`npm e2e` (will open the Cypress )

Run Cypress in headless mode
`npm e2e-headless`


## Bugs Discovered

### 1. Navbar dropdown

When you click on **Group by Role** in the dropdown

Expected query params do not appear in the address bar

- Expected Result: The ID of **Group by Role** should be part of the query params.
- Actual Result: The ID of **Group by Function** is part of the URL query params.

Expected option is not selected

- Expected Result: The **Group by Role** option should be selected.
- Actual Result: The **Group by Function** option is selected.

### 2. Gender/Race tabs

Statistics only appear for gender statistics. Clicking on the Race tab results in the following:

- Expected Result: The data for gender statistics are rendered in the #payEquityGap, #employeeComparison, and #budget divs.
- Actual Result: The data for race statistics is rendered in the #payEquityGap, #employeeComparison, and #budget divs.

Measurements on the dashboard do not match the original style specs for both tabs

The active tab:
- Expected to have a height of 40px
- Actual result was a height of 41px

The inactive tab:
- Expected to have background of #D8D8D8
- Actual result was a background of #F8F8F8

### 3. Responsiveness

Page is not responsive and begins to break at around 1105px width

### 4. Typos

In the #budget div the text displays **$235,000** minimum recommended buget to reduce pay equity gap
- buget -> budget

## Manual test cases

Card element

- Visit the dashboard http://localhost:3000/
- Open the developer tools console
- Click on the selector tool
- Look for the card labeled "Budget" and click on the text
- Assert the label element has a font-size css property equal to 12pt
- Assert the label element has a color css property equal to #666


- Visit the dashboard http://localhost:3000/
- Open the developer tools console
- Click on the selector tool
- Look for the card labeled "Budget" and inspect the <p> tag nested within 
<div class="demographicStats" id="budget">**<p><strong>$235,000</strong> minimum recommended buget to reduce pay equity gap</p>**</div>
- Assert the <p> tag has a font-size css property equal to 18pt

Tab elements

- Visit the dashboard http://localhost:3000/
- Open the developer tools console
- Click on the selector tool
- Look for the tab labeled "Gender" and select the element
- Ensure the the button element has the .tab-active class applied
- Assert the text of the button element has a font-size css property equal to 14pt

- Visit the dashboard http://localhost:3000/
- Open the developer tools console
- Click on the selector tool
- Look for the tab labeled "Race" and select the element
- Ensure the the button element has the .tab-inactive class applied
- Assert the text of the button element has a font-size css property equal to 14pt
- Assert the button element has a color css property equal to #666
