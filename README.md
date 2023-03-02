
# API do app Play-GO

## Installing

1. Clone this repository. `$ git clone <repo_link>`
2. Go to the project folder. `$ cd <repo_folder>`
3. Copy environment file `$ cp .env.example .env ` and included values
4. Copy environment docker file `$ cp .env.docker.example .env.docker ` and included values
6. Run `$ nvm use`
5. Install the dependencies. `$ npm install`

## Execute
1. Run DB using docker compose. `$ docker-compose --env-file=.env.docker up -d ` 
2. Run the server. `$ npm run dev`
    - Access: http://localhost:{portNumber}
3. Run Jest Tests `$ npm run test`


## Documentation
1. Access Swagger `http://localhost:{portNumber}/api-docs ` 

### Configure pgAdmin

1. Get Docker postgres_contaier IP address `$ docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' postgres_container ` 
2. Access: http://localhost:5050/
3. Create the server according to your environment variables

### Access RabbitMQ

1. Access: http://localhost:15672/


