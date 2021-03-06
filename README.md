# theapronapp

[![Deploy to Amazon ECS Production](https://github.com/raculber/theapronapp/actions/workflows/aws.yml/badge.svg?branch=main)](https://github.com/raculber/theapronapp/actions/workflows/aws.yml)

## getting started
> __note__: this repository assumes you are developing in a unix based environment (macOS, linux, WSL2, etc.) with Docker Desktop and NVM (node version manager) installed.

1. clone the repository:

    ```sh
    git clone git@github.com:raculber/theapronapp.git
    ```

2. cd into repository:

    ```sh
    cd theapronapp
    ```

3. activate nvm:

    ```sh
    source ~/.nvm/nvm.sh
    nvm use --lts
    ```

4. install node_modules for client:

    ```sh
    cd client
    npm install
    cd ..
    ```

5. install node_modules for server:

    ```sh
    cd server
    npm install
    cd ..
    ```

6. create .env file:

    ```sh
    touch ./server/.env
    ```

7. copy the contents from `server/.env.sample` to `server/.env` and update where necessary

8. build docker images:

    ```sh
    docker compose build
    ```

9. run docker containers:

    ```sh
    docker compose up -d
    ```

10. visit `http://localhost:3000` and test the sign-up

11. stop docker containers:

    ```sh
    docker compose down
    ```


## deployment process
deployments are configured with a CI/CD pipeline - it is triggered on commits to main