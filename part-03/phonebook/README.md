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
