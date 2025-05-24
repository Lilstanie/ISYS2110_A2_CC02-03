## Requirements

Version used: 
- npm: 10.9.2

Packages installed: 
- [React Router DOM](https://reactrouter.com/en/main)

## Running Project 

How to run file/Setup: 
1. Clone or download the repository.
2. Open terminal and navigate to the project root folder.
3. Install dependencies: `npm install`
4. Build the project: `npm run build`
5. Start the server: `npm start`

## Home 

The home page displays different content based on user roles. Users can access quick action cards to navigate to events, testimonies, calendar, and account.  For different roles of users,(eg: Sermon Planner) We had it's own add event section. Moderators see a special dashboard for reviewing testimonies.

![alt text](readme_images/home-user.png)
*User home page with action cards*

![alt text](readme_images/home-planner.png)
*Sermon Planner with additioanl feature*

![alt text](readme_images/home-moderator.png)
*Moderator home page with review dashboard*

## Login 

The login page features username/password authentication with password visibility toggle. Users can sign in with their credentials or use test buttons for quick access during development.


Login credentials: 
| Username             | Password      |
| -------------------- | ------------- |
| User                 | pass          |
| SermonPlanner        | pass          |
| Moderator            | pass          |
| EmergencyCoordinator | pass          |


![alt text](readme_images/login-page.png)
*Login page with authentication form and test buttons*

![alt text](readme_images/lock.png)
![alt text](readme_images/unlock.png)
*Implementation of hidden/visible password for better user security*


## Sign Up 
The registration page allows new users to create accounts with form validation. Users enter username, email, password, and password confirmation. Includes biblical quote and password visibility toggles.

![alt text](readme_images/signup-pages.png)
*Sign up page with registration form and validation*

## Alert
Alert page is a page where emergency prayer meeting is scheduled or updates for the website will be shown
![alt text](readme_images/alert-1.png)

## Events 
The events page is accessible for all users 

Users can scroll through dates and apply filters by location and event type.
![alt text](readme_images/image.png)

Clicking an event opens a detail popup with time, location, description, and RSVP options.
![alt text](readme_images/image-1.png)

Users can RSVP by entering their details in the popup form.
![alt text](readme_images/image-2.png)

When clicking "View Upcoming", a calendar will show. This is also accessible from the navigation sidebar. The calendar highlights registered events using visual indicators below the dates.
![alt text](readme_images/image-3.png)

The "Add Events" button is only accessible for the sermon planner. 
![alt text](readme_images/image-4.png)

![alt text](readme_images/image-5.png)


## Review and Approve


## Testimonies
Testimonies pages are accessible to all users.
![alt text](readme_images/testimony-1.png)

Where users can see everyone testimonies on this page.
![alt text](readme_images/testimony-2.png)

If you want to see your own testimonies, click "View your posts", where you have the option to delete your testimonies. Which gives you a popup to delete.
![alt text](readme_images/testimony-3.png)

If you like add your testimony, click on "Add Testimony", (Option to add few supported files) You have to compulsory add your title and description to post (should be approved by the moderator)
![alt text](readme_images/testimony-4.png)


## Account
All users are able to access their account details. They are able to search through their posted testimonies and their history. 
![alt text](readme_images/image-6.png)

When clicking on the edit button (the pencil) users are able to modify their details.
![alt text](readme_images/image-7.png)
