# Counter app

This is a very simple (and badly written) application that keeps track of clicks for each user. A user can login with their username and use a button to increase their counter. The app then displays all counters.

# Instructions
The server and the client are separate applications. The server can be started with

```
npm install
npm run build

./scripts/prepare-local-databases.sh
npm run start
# TODO: docker-compose up --build web
```

and the client with

```
npm install
npm run start
```

Then, navigating to localhost:3000 will display the login page.

# Tasks
Your task is to fix and improve the application as much as you can. Do not spend more than a couple of hours on this. If there are still remaining tasks to do, just write down your ideas and we'll go through them in the interview.

Some ideas:
- Code quality: refactored codebase, added linting (eslint, prettier), unit tests, added logging
- Persistence: added pg + knex
- Displaying counters in a meaningful way: TODO: count ranking with styled tables (top 10)
- Security concerns
- Supporting simultaneous users: added with statically added testing users 
- Page style
- Better build pipeline: added Docker
- ...

Additional ideas or not yet implemented features:
 - better authz (e.g. certificate, CSRF token, JWT auth), access control for logged-in users / visitors
 - CI pipeline (Github Actions, more tests, code coverage)
 - Use messaging / websocket for real-time updates

# Discussion
During the interview, we'll go through your solution and discuss further topics, such as:
- How would you host this kind of application on AWS?
- How would you ensure that the application operates correctly in production?
- How could we achieve low-latency when accessing the application from different parts of the world?

# Submission
Please put your solution in a Github repository and email us a link to it. Just don't mention Elo so that other applicants can't find it.
