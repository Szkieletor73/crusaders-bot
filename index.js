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
    case "void":
      embed.setColor(loc[type].color)
      embed.addField(loc[type].name, loc[type].desc + loc.generic.voice + loc.generic.end)
      embed.setFooter(loc[type].footer + leader.username + loc.generic.footer)
      break;
    case "cultEnd":
    case "voidEnd":
      console.log(type.substring(0, type.length - 4))
      embed.setColor(loc[type.substring(0, type.length - 3)].color)
      embed.addField(loc[type.substring(0, type.length - 3)].name, loc.generic.ended)
      embed.setFooter(loc[type.substring(0, type.length - 3)].footer + leader.username + loc.generic.footer)
      break;
  }
  return embed;
}

function sendRaid(type, leader, channel) {
  let filter = (reaction, user) => { return reaction.emoji.name === "❌" && user.id === leader.id; }
  
  channel.send("@here - " + type.charAt(0).toUpperCase() + type.slice(1) + " run started by " + leader + ".")

  channel.send(createEmbed(type, leader))
    .then(function (call) {
      call.react("✅").then().catch(console.error)
      call.react("🔑").then().catch(console.error)
      call.react("❌").then().catch(console.error)

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

    if(cmd.split(" ")[0] == "raid") {
      if (cmd.split(" ")[1] == "void") {
        msg.delete()
        sendRaid("void", msg.author, msg.channel);
      }

      if (cmd.split(" ")[1] == "cult") {
        msg.delete()
        sendRaid("cult", msg.author, msg.channel);
      }
    }

    if (cmd == "listEmoji" && msg.author.id == 95310448697548800){
      console.log(msg.guild.emojis)
      msg.reply("Check bot logs.")
    }
  }
});

client.login(process.env.BOT_TOKEN);