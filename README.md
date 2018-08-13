# Travelist
Travelist is a web application where users can save in a map the places they have been during their trips and explore other maps.

## User stories
  **404:** As an anon/user I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault.
  
  **Signup:** As an anon I can sign up in the platform so that I can start saving favorite restaurants.
  
  **Login:** As a user I can login to the platform so that I can see my favorite restaurants.
  
  **Logout:** As a user I can logout from the platform so no one else can use it.

  **Create a trip:** As a user I can create a new map view with the name of my trip.
  
  **Add a place:** As a user I can add a place to my trip (geolocalisation).
  
  **Add a comment with each place:** As a user I can add a little description with each marker.
  
  **See maps from other users:** As a user I can see maps with marked places from other users.


## Backlog
  **Registration mail:** As I user I would like to receive a confirmation email when I register to Travelist.

  **Profile:** As a user I would like to see other users profile so I can see their trips and their favourites.

  **Favourites:** As a user I would to mark maps as favourites so I can save them in my profile.
  
  **Likes:** As I user I would to like other maps.
  
  **Wishlist markers:** As a user I would to mark places I would like to visit in a future.
  
  **Notifications**
  
# Client

## Routes

  - / - Homepage
  - /mytrips/:id - My trips detail
  - /mytrips/add - Create new trip
  - /explore - Random trips list
  - /trips/:id - Other trips detail
  - /profile/me - My details and favourite trips
  - /profile/:id - Other user's details

## Services

- Auth Service
  - auth.login(user)
  - auth.signup(user)
  - auth.logout()
  - auth.me()
  
- Profile Service
  - profile.me()
  
- Trips Service
  - trips.list() (get the name of the trips)
  - trips.detail(id) (get markers)

## Pages

- 404 Page
- Home Page
- Map Page
- List Page
- Profile Page

## Components

- Navbar component
- Footer component
- Side bar component
- Pop-up new trip component
- Pop-up new place component
- Login/Signup form component

## IO

- Login/Sign up form outputs the form to the parent component

## Guards

- if logged in cannot access home page
- if not logged in cannot access profile page, trips page and explore page
- if not the owner of the trip cannot see editing features

# Server

## Models

  User model

  ```
  username - String // required & unique
  email - String // required & unique
  password - // required
  trips - Array<Object> (Array<any>)
  ```

  Trip model

  ```
  name - String // required
  places - Array<Object> (Array<any>)
  [{
    name: String,
    geolocation,
    description: String,
    date: Date
  }]
  
```

## API Endpoints/Backend Routes

  - GET /auth/me
  - POST /auth/signup
  - POST /auth/login
  - POST /auth/me
  - GET /profile/me
  - GET /tripslist
  - GET /trip/:id
  - POST /trip/new
  - POST /trip/:id/addplace
  
  **Backlog:**
  - POST /favorite
