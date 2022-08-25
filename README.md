# mAIspace

<br>

## Description

AI space to do a lot of stuff depending on what you want :)

## User Stories

- **404:** As a user I get to see a 404 page with a feedback message if I try to reach a page that does not exist so that I know it's my fault.
- **Signup:** As an anonymous user I can sign up on the platform so that I can start creating and managing tournaments.
- **Login:** As a user I can login to the platform so that I can access my profile and start creating and managing tournaments.
- **Logout:** As a logged in user I can logout from the platform so no one else can use it.
- **Profile Page**: As a logged in user I can visit my profile page so that I can access the edit page and see the list of tournaments I have created.
- **App:** As a logged in user I can access the app.
- **Edit App results:** As a logged in user I can access the edit app page so that I can edit the results I got from the app.
- **Delete App results:** As a user I want to be able to delete the app results.

<br>

# Client / Frontend

## React Router Routes (React App)

| Path               | Component       | Permissions                | Behavior                                          |
| ------------------ | --------------- | -------------------------- | ------------------------------------------------- |
| `/login`           | LoginPage       | anon only `<AnonRoute>`    | Login form, navigates to home page after login.   |
| `/signup`          | SignupPage      | anon only `<AnonRoute>`    | Signup form, navigates to home page after signup. |
| `/`                | HomePage        | public `<Route>`           | Home page.                                        |
| `/profile`         | ProfilePage     | user only `<PrivateRoute>` | User and player profile for the current user.     |
| `/profile/edit`    | EditProfilePage | user only `<PrivateRoute>` | Edit user profile form.                           |
| `/:appId`          | App             | user only `<PrivateRoute>` | App form.                                         |
| `/:resultsId` | ResultsApp  | user only `<PrivateRoute>` | App results cards.                                 |

<br>

## Components

Pages:

- LoginPage

- SignupPage

- HomePage

- ProfilePage

- EditProfilePage

- EditAppResults

Components:

- Navbar
- App

<br>

## Services

- **Auth Service**

  - `authService` :
    - `.login(user)`
    - `.signup(user)`
    - `.logout()`
    - `.validate()`

- **User Service**

  - `userService` :
    - `.updateCurrentUser(id, userData)`
    - `.getCurrentUser()`

- **App Service**

  - `App` :
    - `.addApp(AppData)`
    - `.getApp()`
    - `.getOneApp(id)`

<br>

# Server / Backend

## Models:

<br>

**User model**

```javascript
{
  name: { 
    type: String, 
    required: true
    }
  email: { 
    type: String, 
    required: true, 
    unique: true 
    },
  password: { 
    type: String, 
    required: true 
    },
  profileImg: {
      type: String,
      default: 'https://res.cloudinary.com/dvzekm9zq/image/upload/v1660147231/cards/avatar_bpem8o.png'
    },
  field: { 
    type: String, 
    required: true,
    enum: ['Fun', 'Business', 'Programmer', 'Teacher']},
    createdResults: [{ type: Schema.Types.ObjectId, ref:'Requests' }]

}
```

**App model**

```javascript
 {
   appDescription: { type: String },
   appName: { type: String }
 }
```


**Result model**

```javascript
  {
    appName: { type: String },
    userInput: { type: String },
    result: { type: String }
  }

```

<br>

## API Endpoints (backend routes)

| HTTP Method | URL                    | Request Body                 | Success status | Error Status | Description                                                                                                                     |
| ----------- | ---------------------- | ---------------------------- | -------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| POST        | `/auth/signup`         | {name, email, password, field, profileImg}      | 201            | 404          | Checks if fields not empty (422) and user not exists (409), then create user with encrypted password, and store user in session |
| POST        | `/auth/login`          | {email, password}         | 200            | 401          | Checks if fields not empty (422), if user exists (404), and if password matches (404), then stores user in session              |
| GET         | `/profile/:id`     |                              |                |              | show specific profile                                                                                                            |
| PUT         | `/profile/:id`     | { name, profileImg }                | 201            | 400          | edit profile                                                                                                                     |
| DELETE      | `/profile/:id`     |                              | 200            | 400          | delete profile                                                                                                                   |
| GET         | `/:app`             |                              |                | 400          | Show all apps                                                                                                            |
| POST        | `/:app`             | { model, prompt, temperature, max_tokens, top_p, frequency_penalty, presence_penalty }       | 201            | 400          | Create and save a new app                                                                                                |
| GET         | `/:app/:id`         |                              |                |              | Show specific app                                                                                                        |
| GET         | `/:app/:id/:results` |                              | 201            | 400          | show specific app results                                                                                                       |
| POST        | `/:app/:id/:results` | {appName, results } |                |              | add results                                                                                                                     |

<br>

## API's

<a href="https://openai.com/api/">OpenAI</a>

<br>

## Packages
Preicos instalar o cloudinary back e frontend?

<br>

### Git

[Client repository Link](https://github.com/lzaquine/third-project-client)

[Server repository Link](https://github.com/lzaquine/third-project-server)

[Deployed App Link](http://heroku.com)

<br>


### Contributors

Lucas Zaquine - [GitHub](https://github.com/lzaquine) - [LinkedIn](https://www.linkedin.com/in/lucaszaquine/)
