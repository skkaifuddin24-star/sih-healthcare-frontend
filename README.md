# Smriti - Login & Signup Frontend

Frontend-only Login and Signup screens for a cognitive assistance and memory
support platform for elderly dementia patients (SIH healthcare project).

No backend, database, API, real authentication, AI integration, or offline
sync is implemented. Signup shows a simulated success state after passing
frontend validation; Login navigates to a placeholder dashboard route.

## Setup

```bash
npm install
npm run dev
```

## Structure

```
src/
  components/
    Logo.jsx
    TextInput.jsx
    PasswordInput.jsx
    Button.jsx
    RoleCard.jsx
  pages/
    Login.jsx
    Signup.jsx
    Dashboard.jsx   (placeholder route after login)
  styles/
    auth.css
  App.jsx
  main.jsx
```
