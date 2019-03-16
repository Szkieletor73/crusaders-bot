const Discord = require('discord.js')
const client = new Discord.Client()
const loc = require('./locale')
const dotenv = require('dotenv')

dotenv.config()

var prefix = "!"

function createEmbed(type, leader = null) {
  embed = new Discord.RichEmbed()
  switch(type){
    case "cult":
      embed.setColor(loc.cult.color)
      embed.addField(loc.cult.name, loc.cult.desc + loc.generic.voice + loc.generic.end)
      embed.setFooter(loc.cult.footer + leader.username + loc.generic.footer)
      break;
    case "cultEnd":
      embed.setColor(loc.cult.color)
      embed.addField(loc.cult.name, loc.generic.ended)
      embed.setFooter(loc.cult.footer + leader.username + loc.generic.footer)
      break;
    case "void":
      embed.setColor(loc.void.color)
      embed.addField(loc.void.name, loc.void.desc + loc.generic.voice + loc.generic.end)
      embed.setFooter(loc.void.footer + leader.username + loc.generic.footer)
      break;
    case "voidEnd":
      embed.setColor(loc.void.color)
      embed.addField(loc.void.name, loc.generic.ended)
      embed.setFooter(loc.void.footer + leader.username + loc.generic.footer)
      break;
  }
  return embed;
}

function sendRaid(type, leader, channel) {
  let filter = (reaction, user) => { return reaction.emoji.name === "❌" && user.id === leader.id; }

  channel.send(createEmbed(type, leader))
    .then(function (call) {
      call.react("✅").then().catch(console.error)
      call.react("🔑").then().catch(console.error)
      call.react("❌").then().catch(console.error)
      console.log("Sent, reacted");

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

    if (cmd == "void") {
      msg.delete()
      console.log("Sending void")
      sendRaid("void", msg.author, msg.channel);
    }

    if (cmd == "cult") {
      msg.delete()
      console.log("Sending cult")
      sendRaid("cult", msg.author, msg.channel);
    }

    if (cmd == "listEmoji" && msg.author.id == 95310448697548800){
      console.log(msg.guild.emojis)
      msg.reply("Check bot logs.")
    }
  }
});

client.login(process.env.BOT_TOKEN);