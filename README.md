# best_team_koa

API REST Koa server to connect with mongoDB.

#### Requirements
Things what you need to install the server
- [docker](https://www.docker.com/)
- [docker-compose](https://docs.docker.com/compose/)

### Versions

Koa | Node | Npm
--- | --- | ---
***2.0.1*** | ***=8.9*** | ***5.6.0***

### Get started
- Clone the project
```
git clone https://github.com/yofr4nk/best_team_server.git
```

### run docker-compose to install application
```
docker-compose up
```

After to install the app, you can go to:
```http://localhost:3001/api/teams```

### To run tests
- make sure you have run docker-compose before run tests.
- The test run inside container: 
```
- docker exec -it team-server bash
- yarn run test
```

