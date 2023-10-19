# NODE OAUTH

This repo consist of implementation of Oauth along with JWT. The Oauth implementation consists of two widely used Oauth provides including google and facebook.

### Tech Stacks used:

- Passport
- JWT
- Passport-jwt
- Passport-google-oauth20
- passport-facebook

## Installation

To install this project

1. Clone the repository from GitHub:

   ```bash
   git clone https://github.com/Senor101/
   ```

2. Navigate to the project directory:

   ```bash
    cd
   ```

3. Install the required dependencies:
   ```bash
   npm install
   ```
4. Configure the environment variables:

- Create a `.env` file in the project root directory. Include the credentials provided in `.env.example` file.

5. Run the application:
   ```bash
   npm start
   ```
6. Access the application in your browser at
   ```bash
    http://localhost:3000/
   ```

## REST API

### Google Oauth

For using google oauth, access the google auth route as

```bash
 http://localhost:3000/auth/google
```

### Facebook Oauth

For using facebook oauth, access the facebook auth route as

```bash
 http://localhost:3000/auth/facebook
```
