const Discord = require('discord.js')
const client = new Discord.Client()
const dotenv = require('dotenv')
dotenv.config()

var prefix = "!"

function createEmbed(type, author = null) {
  embed = new Discord.RichEmbed()
  switch(type){
    case "halls":
      embed.setColor("RED")
      embed.addField("Lost Halls run", "Join Voice and react with :white_check_mark: if you wish to participate.\n\
        React with :key: if you have a key and are willing to pop.\n\
        Raid Leader can react with :x: to end the call.")
      embed.setFooter("Raid leader: " + author.username)
      break;
    case "hallsEnd":
      embed.setColor("RED")
      embed.addField("Lost Halls run", "Call ended. Run is in progress or complete.")
      embed.setFooter("Raid leader: " + author.username)
  }
  return embed;
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
});

client.on('message', msg => {
  if (msg.content === prefix + 'lh') {
    msg.delete()
    let call = msg.channel.send(createEmbed("halls", msg.author))
      .then(function (call) {
        call.react("✅")
        call.react("🔑")
        call.react("❌")

        let filter = (reaction, user) => {return reaction.emoji.name === "❌" && user.id === msg.author.id;}

        call.awaitReactions(filter, { max: 1 })
          .then(function(collected){
            call.edit(createEmbed("hallsEnd", msg.author))
          })
      })
    // call.react("✅"),
    // call.react("❌")
  }
});

client.login(process.env.BOT_TOKEN);