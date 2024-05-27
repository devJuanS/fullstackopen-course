# Unicafe Feedback Application

Like most companies, the student restaurant of the University of Helsinki Unicafe collects feedback from its customers. The task is to implement a web application for collecting customer feedback. There are only three options for feedback: good, neutral, and bad. The application needs to work only during a single browser session. Once you refresh the page, the collected feedback is allowed to disappear.

## Step 1: Create the course-info app with Vite+React and using states.

**Goal**: Create an application in React that consists of three buttons for collecting customer feedback and showing the statistics of feedback given.

## Step 2: Expand the application to show more statistics

**Goal**: Expand the application so that it shows more statistics about the gathered feedback: the total number of collected feedback, the average score (good: 1, neutral: 0, bad: -1) and the percentage of positive feedback.

## Step 3: Refactor the application to display the statistics into its own component

**Goal**: Refactor the application so that displaying the statistics is extracted into its own `Statistics` component. The state of the application should remain in the App root component.

## Step 4: Change the application to display statistics only once feedback has been gathered

**Goal**: Display statistics only when feedback has been given.

## Step 5: Refactor the application to extract the `Button` and `StaticLine` components from `App`

**Goal**: Extract the components for buttons and statistic lines from `App` component into:
- Button: handles the functionality of each feedback submission button.
- StaticLine: for displaying a single statistic, e.g. the average score.