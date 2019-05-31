# VEHICLE IDENTIFICATION SYSTEM
### Vehicles no longer parked at owners' risk

## OVERVIEW
**Project Background and Description**  
 
>    * It has become a major pain to identify various kinds of vehicles for certain purposes by a person or organization…
>    * Purposes such as keeping track of all vehicles of participants of an event, vehicles in a parking lot, vehicles for sale, vehicles belonging to employees of an organization, etc.
>    * This Project will achieve storing registration data of vehicles in order to be easily retrieved digitally at a later time from the cloud. All that is required is an internet connection. 
>    * Our target audiences are Individuals and organizations.  

**Project Scope**  

>**Users** under an **organization** will be able to log data containing the parking coordinates (if possible), license number of vehicle, picture, color, model, year, and a short description of the current state of the vehicle. 
Officials of the organization will have access to this data while the vehicle is within that vicinity until it is removed completely from that vicinity which implies logging out.
**Individual** users can store data about their personal vehicles or other vehicles
It is up to the organization’s on-ground security team to allow a vehicle enter or leave the vicinity. If you’re not using this solution, your vehicle becomes truly parked at owner’s risk!

## High-Level Requirements
> 1. Internet connection
> 2. Fingerprint scanner
> 3. SSO authentication
> 4. Web browser
> 5. Android/IOS
> 6. GPS Tracker

## Deliverables
> 1. Web Application
> 2. API
> 3. Android app
> 4. IOS app

## Affected Parties
>Organizations can use this system to enhance their existing security team and measures

## Affected Business Processes or Systems
>All organizations worldwide, events, security systems including the Police, and individuals

## Specific Exclusions from Scope
>None [To be added as due date approaches depending on unimplemented features]

## Implementation Plan
>Build an API with a cloud database to store the details of a user and all vehicles belonging to this particular user.
> * Database: `Mongo DB`
> * API stack: `Node.js, Express, Handlebars`
> * Registration of user from the web app to the database
> * Registration of vehicles under a user’s profile
> * Registration of organization by top-level admin
> * Logging in a user’s vehicle into an organizations reach with permission from the organization
> * Logging out a user’s vehicle from an organizations reach with permission from the organization
> * Retrieval of data from an authorized user within the organization.

## High-Level Timeline/Schedule
> [05-30-2019]
>
> * Github repository will be created, initialized with a `readme`. 
> * API boilerplate will be created. Handlebars will be used as the template engine of  the node.js and express app
> * Registration endpoints, permissions endpoints, and retrieval endpoints will be implemented
> * Host skeleton app on `heroku`.
> * A structure-only user interface will be implemented to test these initial endpoints
> * An organization dashboard will be created to view the data within the organization. 
> * Completion  
> 
> [06-05-2019]  

> [06-05-2019] to [Next Date]
> * To be discussed


# Getting Started
1. Fork the repository, clone it.
2. cd (change directory) into the project folder i.e Vehicle-Identification-System.
3. Run `npm install` (on your terminal) to install the dependencies.
4. Run `npm start` (on your terminal) to run the project.
5. Go to your browser `localhost:3000` to view the project.
6. When you make your changes to the repo, push to master and create a pull request, make sure there are no merge conflicts.
7. Do not merge.
 
[UI Design Link](https://www.figma.com/file/Mg3op5z77ORvPZzUM8vA219B/Vehicle-Identification-System?node-id=0%3A1)

 Getting Started

Fork the repository first and clone it
```
git clone https://github.com/Shock451/Vehicle-Identification-System.git
```

Go to the directory and install dependencies
```
cd Vehicle-Identification-System
npm install
```

Start the project
```
`npm start`
```
Visit `http://localhost:3000` to view the project. Enjoy!


Credits: Oladosu Abdullahi