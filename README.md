- /api/v1/auth/verify-account

- /api/v1/users
- - GET

- /api/v1/users/:id
- - GET
- - PUT (ADMIN)
- - DELETE (ADMIN)

- /api/v1/users/me
- - GET
- - PUT
- - PATCH
- - DELETE

- /api/v1/auth/login
- - POST

- /api/v1/auth/register
- - POST

- /api/v1/auth/password-recovery
- - POST
- - PATCH


---- BLOG ----

- /api/v1/posts
- - POST
- - GET

- /api/v1/posts/:id
- - GET

- /api/v1/users/me/posts
- - GET

- /api/v1/users/me/posts/:id
- - GET
- - PUT
- - DELETE