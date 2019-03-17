const Discord = require('discord.js')
const client = new Discord.Client()
const config = require('./config')
const loc = require('./locale')
const dotenv = require('dotenv')

dotenv.config()

var raids = config.raids

var prefix = "!"

function createEmbed(type, leader = null) {
  embed = new Discord.RichEmbed()
  switch(type){
    case "cult":
    case "void":
    case "event":
    case "ot":
    case "thicket":
    case "tomb":
    case "shatts":
      embed.setColor(loc[type].color)
      embed.addField(loc[type].name, loc[type].desc + loc.generic.end)
      embed.setFooter(loc[type].footer + leader.username + loc.generic.footer)
      break;
    case "cultEnd":
    case "voidEnd":
    case "eventEnd":
    case "otEnd":
    case "thicketEnd":
    case "tombEnd":
    case "shattsEnd":
      console.log(type.substring(0, type.length - 4))
      embed.setColor(loc[type.substring(0, type.length - 3)].color)
      embed.addField(loc[type.substring(0, type.length - 3)].name, loc.generic.ended)
      embed.setFooter(loc[type.substring(0, type.length - 3)].footer + leader.username + loc.generic.footer)
      break;
  }
  return embed;
}

function sendRaid(type, leader, channel, guild) {
  let filter = (reaction, user) => { return reaction.emoji.name === "❌" && user.id === leader.id; }
  
  channel.send("@here - " + type.charAt(0).toUpperCase() + type.slice(1) + " run started by " + leader + ".")

  channel.send(createEmbed(type, leader))
    .then(function (call) {
      call.react("❌").then().catch(console.error)

      loc[type].reacts.forEach(el => {
        call.react(guild.emojis.find(emoji => emoji.name == el)).then().catch(console.error)
      })

      call.awaitReactions(filter, { max: 1 })
        .then(function (collected) {
          call.edit(createEmbed(type + "End", leader))
        })
        .catch(console.error)
    })
    .catch(console.error)
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
});

client.on('message', msg => {
  if (msg.content.indexOf(prefix) === 0) {
    cmd = msg.content.substring(1, msg.content.length)
    console.log(cmd)

    if (cmd.split(" ")[0] == "raid" && msg.member.roles.find(r => r.name === "Raid Leader")) {
      let type = cmd.split(" ")[1]
      if (raids.includes(type)) {
        msg.delete()
        sendRaid(type, msg.author, msg.channel, msg.guild);
      }
    }

    if (cmd == "listEmoji" && msg.author.id == 95310448697548800){
      console.log(msg.guild.emojis)
      msg.reply("Check bot logs.")
    }
  }
});

client.login(process.env.BOT_TOKEN);