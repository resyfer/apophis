# Apophis
![npm](https://img.shields.io/npm/v/apophis?style=for-the-badge)
![npm](https://img.shields.io/npm/dt/apophis?color=%23a020f0&style=for-the-badge)
![NPM](https://img.shields.io/npm/l/apophis?style=for-the-badge)
![GitHub top language](https://img.shields.io/github/languages/top/resyfer/apophis?style=for-the-badge)
![Lines of code](https://img.shields.io/tokei/lines/github/resyfer/apophis?style=for-the-badge)

[![NPM](https://nodei.co/npm/apophis.png)](https://www.npmjs.com/package/apophis)

CLI to talk to anyone connected to your network over HTTP, be it LAN or your hotspot. Doesn't require internet.

# Installation
Make sure you have NodeJS **(>= v16.14.0)** [installed](https://nodejs.org/en/) and have NPM as well
```
npm i -g apophis
```

# Usage

https://user-images.githubusercontent.com/74897008/196032095-3192205b-3943-4729-ac2b-e4cffd9e9f06.mp4

To create the server:
```
apophis -s
```

`IP` and `PORT` will be provided in the output and then you can join the server from another device in the network using
```
apophis -c -u USERNAME -i IP -p PORT
```
