/***
 * 
 * Main module for processing commands, and command-specific functions.
 * 
***/
const Discord = require('discord.js')
const config = require('./config')
const http = require('http')
const https = require('https')

const raids = require('./raids')
const util = require('./utils')

var verify = []

exports.sendRaid = (args, leader, channel, guild) => {
  /***
   * Handles raid messages.
   * Requires an `args` table with the following format:
   * @param type - raid type, required at all times
   * @param time - HH:MM. Time will be ommited entirely if not specified.
   * @param date - Wolfram Alpha format - most formats should work. Optional.
   * @param timezone - ex. UTC-7, or GMT+3; assumed UTC-0 if not specified.
   ***/
  var type = args.shift()
  if(args != [])
    var time = args.join("+")
  if (raids.hasOwnProperty(type)) {
    let filter = (reaction, user) => { return reaction.emoji.name === "no" && user.id === leader.id; }

    channel.send("@here - " + raids[type].name + " run started by " + leader + ".")

    channel.send(util.createEmbedRaid(type, leader, guild, time))
      .then(function (call) {

        raids[type].reacts.forEach(async function (el) {
          await call.react(guild.emojis.find(emoji => emoji.name == el)).then().catch(console.error)
        })

        call.awaitReactions(filter, { max: 1 })
          .then(function (collected) {
            call.edit(util.createEmbedRaid(type + "End", leader, guild, time))
          })
          .catch(console.error)
      })
      .catch(console.error)
  }
}

exports.verify = (args, author) => {
  if(args.length != 0){
    console.log("Verification started for user: " + author.tag)
    let player = args[0]
    let tag = util.genVerifyTag(8)
    verify.push({ "user": author.tag, "player": player, "tag": tag })
    author.send("Verification started. Please go to your RealmEye profile and add the following to *any* line of your description: `" + tag + "`\nWhen you're done, reply with `" + config.prefix + "done`")
  } else {
    author.send("Please include your full name as visible on RealmEye, like this: `!verify " + author.username + "`")
  }
}

exports.verifyDone = (author, guild) => {
  console.log(verify)
  if (verify.find(x => x.user == author.tag)) {
    entry = verify.find(x => x.user == author.tag)
    util.getRealmEye(entry.player).then(res => {
      if ((res.desc1.includes(entry.tag) || res.desc2.includes(entry.tag) || res.desc3.includes(entry.tag)) && res.guild == "Crusaders of Halls") {
        author.addRole(guild.roles.find(role => role.name == res.guild_rank))
        author.send("Verification for " + res.player + " successful. Welcome!")
      } else {
        author.send("Verification failed - couldn't find the verification tag in your description, or you're not a member of the guild. Try again, or DM any Owner to verify manually.")
      }
    })
  } else {
    author.send("You have not started verification yet. Please use `" + config.prefix + "verify InGameName` first.")
  }
}
  

