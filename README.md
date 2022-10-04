## Table of Contents
- [📜 Introduction](#-introduction)
- [⚙️ Getting Started](#️-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
    - [With Release](#with-release)
    - [With clone project](#with-clone-project)
  - [Launching the bot](#launching-the-bot)
    - [Dev](#dev)
    - [Production](#production)
- [📄 License](#-license)

# 📜 Introduction
Bot discord to display the schedule.

# ⚙️ Getting Started
## Prerequisites
- [NodeJS](https://nodejs.org/en/) : >= v16.13.2
- [npm](https://www.npmjs.com) : >= v8.5.2

## Installation
### With Release
- Download the latest [release](https://github.com/Wakestufou/EDT-Bot/releases).

```sh
# Go to EDT-Bot
$ cd EDT-Bot

# Configure .env
$ cp .env.exemple .env
$ vim .env

# Install
$ npm i
```

⚠️ Don't forget to change the values in the .env ⚠️
<br>
### With clone project
```sh
# Clone project
$ git clone https://github.com/Wakestufou/EDT-Bot.git

# Go to EDT-Bot
$ cd EDT-Bot

# Configure .env
$ cp .env.exemple .env
$ vim .env

# Install
$ npm i
```
⚠️ Don't forget to change the values in the .env ⚠️

## Launching the bot
### Dev
```sh
$ npm run start:dev
```
### Production
```sh
# First, build project
$ npm run build

# Launch the bot
$ npm run start:prod
```

# 📄 License
[GNU GENERAL PUBLIC LICENSE Version 3](https://choosealicense.com/licenses/gpl-3.0/)