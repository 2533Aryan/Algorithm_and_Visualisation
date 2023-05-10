# ProfMatch

This project is a web application designed to match students with professors based on their areas of study. The application allows students to enter their areas of interest, retrieves a list of professors from a JSON file, and then calculates a matching score for each professor based on their areas of study. The top three matching professors are displayed to the user.

# Usage

- Open the index.html in your preferred web browser.
- On the main page, enter your areas of interest in the provided input fields.
- Click the "Match" button.
- Top three matching professors will be displayed on the results page.
- To return to the main page, click the "HOME" button.


# Code Structure

The project consists of the following main components:

- app object: Contains various methods and properties for initializing and running the application.
- init function: Initializes the application by adding an event listener for the DOMContentLoaded event and logging a message to the console.
- load function: Handles the page load event and calls the getData function.
- getData function: Retrieves the current page's identifier and calls the appropriate function based on the page.
- run function: Handles the click event of the "Match" button and retrieves the student's input data.
- getPosts function: Sends a GET request to the professor.json file and calls the matchProfessors function.
- matchProfessors function: Calculates a matching score for each professor based on their areas of study and the student's input. The top three matching professors are stored in the matchedProf variable.
- switch function: Switches the view from the main page to the results page.
- showResults function: Builds the results page by creating HTML elements dynamically.
- matchProf function: Displays the selected professors' information on the results page.
- err function: Handles errors by displaying an error message to the user.

