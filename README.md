# App users GitHub

The application is a user-friendly tool that allows users to search for GitHub profiles by entering a username. Upon entering a username and clicking the search button, the application queries the GitHub API and retrieves the first 10 search results matching the input. Users can then browse through these results to find the GitHub profiles they are interested in.

When a user clicks on a specific GitHub username in the search results, they are directed to a dedicated profile page. On this profile page, they can view detailed information about the GitHub user, such as their public repositories, followers, and following.

One notable feature of the application is the "Export" button located on the profile page. When users click this button, it triggers a service that saves all the user's GitHub profile information into a database. This functionality allows users to keep a record of their favorite GitHub profiles or track profiles of interest for later reference.

In summary, this application streamlines the process of searching for GitHub profiles, provides detailed profile information, and offers a convenient way to save and manage GitHub profile data in a database.

### Pre-requirements 📋

- [Git](https://git-scm.com/downloads)
- [Node.js and npm](https://nodejs.org) Node >= 18.15 LTS, npm >= 9.5.x - Install with Volta.sh

## Starting 🚀

1. Clone the repository

2. Run `npm install` to install server dependencies.

3. Configure the env running `cp .env.example .env`

4. Update `.env` with the required info

5. Run `npm run dev` to start the development server.

### Installation 🔧

1. Clone the reposito

```
git clone https://github.com/jesusdavid24/front-technical-test.git

2. Execute npm install
```

npm install

```
3. Configure the .env
```

VITE_BASE_URL=http://localhost:3002/api
VITE_BASE_URL_GITHUB=https://api.github.com

```
4. Execute the project
```

npm run dev

```

## Built with 🛠️

_Menciona las herramientas que utilizaste para crear tu proyecto_

- [React](https://react.dev/docs/) - El framework web usado
- [NPM](https://www.npmjs.com/) - Manejador de dependencias

## Author ✒️

- **Jesus David Bravo Vergara** - [jesusdavid24](www.linkedin.com/in/jesusdavidb)

## Licencia 📄

[MIT](LICENSE)

```
