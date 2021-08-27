# To Do list

## Initial Steps
- ~~Start Server (`npm start`)~~
- ~~Define Schema for the Data Objects~~
- ~~Prototype the UI from [Classroom](https://classroom.google.com)~~

## Setting up Database
- ~~Create a database at MongoDB Atlas~~
- ~~Connect to the db with the database.js~~

## Setup Login
- ~~Ask for credentials before accessing the index page~~
- ~~Redirect to home if the login details are correct~~
- ~~Register page to register user if the critiria is met and redirect to home~~
- Add Sign in with Google button

## Home Page
- ~~Consists of all the classroom the user is part of with the class card in light gray~~
- ~~Shows in yellow border and a manage button if the class is owned by the user~~
- ~~Create a new class button and create unique Jitsi meet link for the class~~
- ~~Settings Button~~

## Class Page
- Implement tabs at the top to show different sections
- Discussion, Assignments, People, Marks

### Class Settings Page
- Change the Class Name
- Delete the Class

### Discussion
- Chat with other users and shows `owner` if it was made by the class owner
- With all the features just like Talk Messenger

### Assignments

#### To the owner
- Create a new assignment and give it a name and due date and link to the assignment
- Delete an assignment
- View Details of an existing assignment and view the list of students
- Give Mark the students who have submitted the assignment

#### To the students
- View the list of assignments
- Click the link and do the assignment
- Turn in to Mark as Done
- View the marks of the assignment if completed and returned

### People
- View the list of students and teachers

#### To the owner
- Add button to invite people to the class
- Add button to remove people from the class
- Make a student to be a teacher

### Marks

#### To the owner
- Create a test and give it a name and due date and link to the test
- Delete a test
- View Details of an existing test and view the list of students
- Give Mark the students who have submitted the test

#### To the Students
- View the list of tests
- Click the link and do the test
- Turn in to Mark as Done
- View the marks of the test if completed and returned

## Calendar Page
- Get the date time of the classes and add it to the calendar

## Settings Page
- Change the password
- Change the email
- Change the name