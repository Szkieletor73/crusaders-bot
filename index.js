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

var guild

// var verify = []

// Hooks

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
  guild = client.guilds.find(x => x.id == "556411675264417824")
});

client.on('message', msg => {
  if (msg.content.indexOf(config.prefix) === 0) {
    let content = msg.content.split(" ")
    var cmd = content.shift().substring(1, msg.content.length)
    var args = content
    console.log("[" + new Date() + "] Received command " + cmd + " from " + msg.author.tag + " with the following arguments: ")
    console.log(args)

    switch (cmd) {
      case "raid":
        commands.sendRaid(args, msg.author, msg.channel, msg.guild)
        msg.delete()
        break;

      case "listEmojis":
        if(msg.author.id == 95310448697548800) {
          console.log(msg.guild.emojis)
          msg.reply("Check bot logs.")
        } else {
          msg.reply("You can't do that.")
        }
        break;

      case "verify":
        commands.verify(args, msg.author)
        break;

      case "done":
        commands.verifyDone(msg.author, msg.member, guild)
        break;

      default:
        console.log("Unknown command.")
    }
  }
});

client.login(process.env.BOT_TOKEN);