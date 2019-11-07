// Lib imports
const Discord = require('discord.js')
const client = new Discord.Client()
const config = require('./config')
// const loc = require('./locale')
const dotenv = require('dotenv')
const http = require('http')
const https = require('https')

// Module imports
const commands = require('./commands')
const util = require('./utils')

dotenv.config()

// Hooks
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
});

client.on('message', commands.handleCommand(msg)
);

client.login(process.env.BOT_TOKEN);