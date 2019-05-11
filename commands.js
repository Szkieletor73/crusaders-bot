/***
 * 
 * Main module for processing commands, and command-specific functions.
 * 
***/
const Discord = require('discord.js')

const raids = require('./raids')
const util = require('./utils')

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

// if (cmd.split(" ")[0] == "verify") {
//   console.log("Verification started for user: " + msg.author.tag)
//   let player = cmd.split(" ")[1]
//   let tag = genVerifyTag(8)
//   verify.push({ "user": msg.author.tag, "player": player, "tag": tag })
//   msg.author.send("Verification started. Please go to your RealmEye profile and add the following to *any* line of your description: `" + tag + "`\nWhen you're done, reply with `" + prefix + "done`")
// }

// else if (cmd == "done") {
//   if (verify.find(x => x.user == msg.author.tag))
//     msg.author.send("You have not started verification yet. Please use `" + prefix + "verify` first.")
//   else {
//     entry = verify.find(x => x.user == msg.author.tag)
//     realmeye = getRealmEye(entry.player)
//     console.log(realmeye)
//     if ((realmeye.desc1.includes(entry.tag) || realmeye.desc2.includes(entry.tag) || realmeye.desc3.includes(entry.tag)) && realmeye.guild == "Crusaders of Halls") {
//       msg.author.addRole(guild.roles.find(role => role.name == realmeye.guild_rank))
//       msg.author.send("Verification successful. Welcome!")
//     } else {
//       msg.author.send("Verification failed. DM any Owner to verify manually.")
//     }
//   }

// }


