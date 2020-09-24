# SFU roominate

## Team Members

| Name            | Email           |
|-----------------|----------------:|
| Robin Truong    | RLT5@SFU.CA     |
| Travis Booth    | TMBOOTH@SFU.CA  |
| James McTaggart | JMCTAGGA@SFU.CA |
| **Stanley Kwok**    | **YHK4@SFU.CA**     |
| Cyndy Nguyen    | CYNDYN@SFU.CA   |
| Scott Hetland   | SHETLAND@SFU.CA |
---

## Table of contents
- [Project Outline](#project-outline)
- [Features](#features)
- [Usage](#usage)
- [Philosophy](#philosophy)
- [Technologies](#technologies)
- [WebAPP](#webapp)
- [API](#API)
- [Database](#database)
 


## Project Outline
### Objective

The goal of this project is assist students at SFU's Burnaby campus in finding study space. This project will be in the form of a web app, and will have 3 modes of operation:

1. The user will give his/her current location as a room number and a weekday, and the web application will return the nearest 5 rooms that are free (no class scheduled)

2. The user will enter a building and a room and the application will show a weekly and monthly calendar of the class times when it is occupied

3. The user will select a room and a weekday, and the web application will return a list of available times that the room will be free (no class scheduled)



## Features 
- __Find Closest Rooms:__ allows users to select a room and a time slot and returns the 5 closest rooms that are available in that time slot on rendered maps
- __Find Availability Times By Room:__ allows user to select a room and returns a calender of when the room is available
- __Find All Free Rooms:__ allows user to select a time frame and returns 20 rooms that are available at that time
- __Small API:__ only has 5 server api's to learn
- __Clean and Simple Interface:__ quick and easy for searching for a quiet place to study

## Usage

#### Option 1: Using docker-compose
1. In terminal: Clone the finalProject repository
```bash
$ git clone git@csil-git1.cs.surrey.sfu.ca:jmctagga/finalproject.git
```
2. In terminal: Enter the finalProject directory
```bash
$ cd finalProject/
```
3. In terminal: Build docker image
```bash
$ docker-compose build
```
4. In terminal: Run docker image
```bash
$ docker-compose up
```
5. In web browser: go to http://localhost:8080


#### Option2: Running Server and Client Individually

##### Running Server Individually
1. In terminal: Clone the finalProject repository
```bash
$ git clone git@csil-git1.cs.surrey.sfu.ca:jmctagga/finalproject.git
```
2. In terminal: Enter client directory
```bash
$ cd finalProject/client/
```
3. In terminal: Run the client
```bash
$ npm start
```
4. In web browser or postman: go to http://localhost:3001


##### Running Client Individually
1. In terminal: Clone the finalProject repository
```bash
$ git clone git@csil-git1.cs.surrey.sfu.ca:jmctagga/finalproject.git
```
2. In terminal: Enter server directory
```bash
$ cd finalProject/newserver/
```
3. In terminal: Run the client
```bash
$ npm start
```
4. In web browser: go to http://localhost:3000


#### Updating the database
There are two tables in the database that are used:
* roomavailability
* rooms

Once a semester an employee of SFU must update the roomavailability and rooms tables by executing the steps as listed in our companion app located at: https://csil-git1.cs.surrey.sfu.ca/shetland/room-availability


## Philosophy

During a regular school semester and especially towards the end of the term, it can be a challenge to find quiet study spaces on campus. We hope to solve this problem by creating a searchable database containing classroom availability. Users can input a room and the closest room feature will return the closest available rooms. Users can specify a start/end time/day of the week, which will be used to search a database and find holes where certain classrooms are unused. The find-by-room search function allows users to query schedules for specific classrooms displayed on a calendar. 


## Technologies

The web application will use the following technologies:

- NodeJS
- ExpressJS
- ReactJS
- React-Router
- React-Bootstrap
- Bootstrap
- PostgreSQL 
- MongoDB (Previous implementation was with MongoDB)
- Python 
- Heroku


## Front-end Client WebApp

Our front-end client WebApp was created with the open-source Javascript library ReactJS and NodeJS. ReactJS was chosen for it's ability to create light-weight highly efficient web and mobile applications. 

## Back-end Server API

The back-end server application serves as an intermediate interface for the front-end client to access data from the database. ExpressJS along side with NodeJS is used as the backend framework of the server. ExpressJS is a minimal and flexible framework that is easy to learn while maintaining robustness. The REST api design architecture was chose to sepearate the user-interface from data storage concerns. The server is stateless and the data is responses are cacheable. The back-end server is created using NodeJS and calls javascript and python functions that retrieve and process data from the database. Every semester, the back-end server can call python scripts that will update the database. Due to current global pandemics, all courses are offered online therefore all the rooms are available. For test/presentation purposes, the data is taken from the FALL 2019 semester. ExpressJS's and Python security features/libraries allow sanitization of inputs to protect from SQL injection attacks.

## Database

PostgreSQL is the database that is used to store the data. SFU schedule data is scraped using the [SFU Coure Outline API](http://www.sfu.ca/bin/wcm/course-outlines). GPS data was scraped from the [roomfinder](https://roomfinder.sfu.ca/apps/sfuroomfinder_web/). From the complete list of course offerings we can pull class info, class start times, class end times, building codes and room numbers. By comparing available rooms against booked rooms, we should be able to build our searchable schedule.


<!--https://sfuroominate.herokuapp.com/-->


## Future Work

In potential future iterations of this project we would like to automate the process of scraping the SFU class schedule API at the beginning of each term. Additional,  we were exploring the idea of adding a room rating feature so that students could rate the quality of each study space. Some rooms, large lecture halls for example, lack sufficient table space and it would nice for students to share their experience through a rating system. Another idea that did not make it into the final design was a feature where students could better track Greg Baker’s schedule. By extrapolating his teaching blocks, students could have a better idea of when they could go to his officer outside of designated office hours.  
