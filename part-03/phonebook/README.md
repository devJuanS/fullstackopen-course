# Phonebook Backend Application

## Step 1: Implement a Node application that returns a hardcoded list of phonebook entries.

**Goal**: Implement a simple web server using Express to return a hardcoded list of phonebook entries.

## Step 2: Implement an info page showing the number of entries in the phonebook and the time of the request.

**Goal**: Add a single route to an info page showing the time that the request was received and how many entries are in the phonebook at the time of processing the request.

## Step 3: Implement the functionality for displaying the information for a single phonebook entry.

**Goal**: Add a route to get the information for a single phonebook entry based on its Id.

## Step 4: Implement functionality that makes it possible to delete a single phonebook entry.

**Goal**: Add the functionality to delete a single phonebook entry by making an HTTP DELETE request to the unique URL of that phonebook entry.

## Step 5: Expand the backend so that new phonebook entries can be added.

**Goal**: Include the functionality to add a new phonebook entry by making HTTP POST request.

## Step 6: Implement error handling for creating new entries.

**Goal**: Implement error handling for creating new entries. The request is not allowed to succeed, if: the name or number is missing, or the name already exists in the phonebook.

## Step 7: Add the morgan middleware to the application for logging.

**Goal**: Add the morgan middleware to log messages to the console based on the _tiny_ configuration.

## Step 8: Configure morgan so that it also shows the data sent in HTTP POST requests.

**Goal**: Create a morgan token to show the data sent in HTTP POST requests.

## Step 9: Make the backend work with the phonebook frontend.

**Goal**: Add in the backend what is neccessary so that the frontend can access the data from Persons list.

## Step 10: Deploy the backend to the internet.

**Goal**: Configure the PaaS platform (in this cases Render) to deploy the Phonebook backend.

Access to the backend data for the app in _[Phonebook backend link](https://fso-phonebook-kx0u.onrender.com/api/persons)_.

## Step 11: Deploy full stack Phonebook application to internet.

**Goal**: Make configuration in frontend and backend files to deploy the entire application to internet.

# Phonebook Command-line database

## Create a cloud-based MongoDB database for the phonebook application with MongoDB Atlas.

**Goal**: Create a cloud-based MongoDB database and create a `mongo.js` file to save and fetch objects for the Phonebook app.

# Phonebook database

## Step 1: Change the fetching of all phonebook entries so that the data is fetched from the database.

**Goal**: Modify the backend routes so that phonebook entries are fetched from the MongoDB database.

## Step 2: Change the backend so that new numbers are saved to the database.

**Goal**: Modify the backend route to post new registers to MongoDB database.
