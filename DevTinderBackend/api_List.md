# Dev Tinder Api Lists

## AuthRouter
- POST /signup
- POST /LogIn
- POST /LogOut

## ProfileRouter

- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

## Connection Request Router

- POST /request/send/interested/:userId
- POST /request/send/ignored/:userId
- POST /request/review/accepted/:requestId
- POST /request/review/rejected/:requestId

## userRouter

- GET /user/connections
- GET /user/requests
- GET /user/feed  - gets you the profile of other users on platform