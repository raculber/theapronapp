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


## deployment

> __note__: this will only work for admin users of the AWS account, this repo is additionally configured to automatically re-deploy on when a new release is created in github

1. download and install the [aws cli](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)

2. open terminal and run:

    ```sh
    aws configure
    ```

3. enter programmatic user creds:

    ```sh
    AWS Access Key ID: ....
    AWS Secret Access Key: ...
    Default Region: us-east-1
    Output: json
    ```

4. execute:

    ```sh
    bash ecs-deploy.sh
    ```
