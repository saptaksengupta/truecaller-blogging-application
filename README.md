# Truecaller-blogging-application

Web application to read Wordpress blogs using rest react and nestjs.

## Directory Structure

The main directory name is as per the requirements.
Inside the root directory their is two diffrent folder one is for backend (`Nestjs`) and the other is for fronend (`ReactJs`).

## To get started with backend api

First `cd` into the `truecallerBlog-node` folder and create a `.env` file inside that directory and put this environment variables

```bash
PORT=9999
SITE_ID=107403796
TRUE_CALLER_API_BASE_URL=https://public-api.wordpress.com/rest/v1.1/sites
CURRENT_BLOG_PROVIDER=TRUECALLER
```

and then you can follow that native readme.md instructions as well to install all the dependencies and start the server or just apply this command inside `truecallerBlog-node` folder

```bash
# install dependencies
npm install

# start the dev server
npm run start:dev
```

It will spin up your local backend `rest-api` server at the localtion [http://localhost:9999](http://localhost:9999)

## To get started with frontend application

Open up a second terminal window and `cd` into the `truecallerBlog-react` directory and you can follow that native readme.md instructions as well to install all the dependencies and start the server or just apply this command inside `truecallerBlog-react` folder

```bash
# install dependencies
npm install

# start the dev server
npm run start
```

It will spin up your local frontend `react web application` server at the localtion [http://localhost:3000](http://localhost:3000)

## Points to be noted

<b>Front End</b>

Just to speed up the development process used some existing libraries like [`react Styled Component`](https://styled-components.com) and on top of that i have already made my own library components to use it quickly.
