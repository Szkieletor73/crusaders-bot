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

const handleCommand = (msg) => {
  if (msg.content.indexOf(config.prefix) === 0) {
    let content = msg.content.split(" ")
    var cmd = content.shift().substring(1, msg.content.length)
    var args = content
    if (msg.guild != null)
      console.log("[" + new Date() + "][" + msg.guild.name + "] Received command " + cmd + " from " + msg.author.tag + " with arguments: " + content.join(" "))
    else
      console.log("[" + new Date() + "][DM] Received command " + cmd + " from " + msg.author.tag + " with arguments: " + content.join(" "))

    switch (cmd) {
      case "raid":
        sendRaid(args, msg.author, msg.channel, msg.guild)
        msg.delete()
        break;

      case "listEmojis":
        if (msg.author.id == 95310448697548800) {
          console.log(msg.guild.emojis)
          msg.reply("Check bot logs.")
        } else {
          msg.reply("You can't do that.")
        }
        break;

      case "verify":
        verify(args, msg.author, msg.member, msg.guild)
        msg.delete()
        break;

      case "done":
        verifyDone(msg.author)
        break;

      case "cancel":
        verifyCancel(msg.author)
        break;

      default:
        console.log("Unknown command.")
    }
  }
}

const sendRaid = (args, leader, channel, guild) => {
  /***
   * Handles raid messages.
   * @param args - an array in the following format: raid type, raid time (HH:MM), date (in wolfram alpha format, optional, timezone (UTC-0 if not specified)
   * @param leader - raid leader user object
   * @param channel - raid channel object
   * @param guild - guild object
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
          try{
            await call.react(guild.emojis.find(emoji => emoji.name == el)).then().catch(console.error)
          } catch(TypeError) {
            console.error("Missing emoji: " + el)
          }
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

const verify = (args, author, member, guild) => {
  if(args.length != 0){
    console.log("Verification started for user: " + author.tag)
    let player = args[0]
    let tag = util.genVerifyTag(8)
    verify.push({ "user": author.tag, "player": player, "tag": tag, "member": member, "guild": guild })
    author.send("Verification started. Please go to your RealmEye profile and add the following to *any* line of your description: `" + tag + "`\nWhen you're done, reply with `" + config.prefix + "done`\nIf something went wrong, use `" + config.prefix + "cancel` and try again")
  } else {
    author.send("Please include your full name as visible on RealmEye, like this: `!verify " + author.username + "`")
  }
}

const verifyDone = (author) => {
  if (verify.find(x => x.user == author.tag)) {
    entry = verify.find(x => x.user == author.tag)
    util.getRealmEye(entry.player).then(res => {
      if ((res.desc1.includes(entry.tag) || res.desc2.includes(entry.tag) || res.desc3.includes(entry.tag))) {
        if ((res.guild == "Crusaders of Halls" && entry.guild.name == "Crusaders of Halls") || (res.guild == "I Never Nexus" && entry.guild.name == "Never Nexus")) {
          // if member of current server's guild
          entry.member.addRole(entry.guild.roles.find(role => role.name == res.guild_rank))
          author.send("Verification for " + res.guild + " " + res.guild_rank + " " + res.player + " successful. Welcome!")
          verify = verify.filter(function (obj) {
            return obj.user !== author.tag;
          });
        } else if (entry.guild.name == "Never Nexus" && (res.guild == "Crusaders of Halls" || res.guild == "I Never Nexus")) {
          // if member of allied guild on Never Nexus server
          entry.member.addRole(entry.guild.roles.find(role => role.name == "Raider"))
          author.send("Verification for Never Nexus ally " + res.player + " successful. Welcome!")
          verify = verify.filter(function (obj) {
            return obj.user !== author.tag;
          });
        }
      } else {
        author.send("Verification failed - couldn't find the verification tag in your description, or you're not a member of the guild. Try again, or DM any Owner to verify manually.\nTry !cancel if you need a new tag.")
      }
    })
  } else {
    author.send("You have not started verification yet. Please use `" + config.prefix + "verify InGameName` first.")
  }
}

const verifyCancel = (author) => {
  if(verify.find(x => x.user == author.tag)) {
    verify = verify.filter(function (obj) {
      return obj.user !== author.tag;
    });
    author.send("Okay, cancelled your verification.")
  } else {
    author.send("You have no active verification.")
  }
}
  


