/***
 *
 * Smaller, universal utility functions
 *
***/
const Discord = require('discord.js')

const raids = require('./raids')

function genVerifyTag(length) {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

function getRealmEye(player) {

  https.get('https://nightfirec.at/realmeye-api/?player=' + player, (resp) => {
    let data = '';

    // A chunk of data has been recieved.
    resp.on('data', (chunk) => {
      data += chunk;
    });

    // The whole response has been received. Print out the result.
    resp.on('end', () => {
      console.log(JSON.parse(data));
    });

  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });
}

exports.createEmbedRaid = (type, leader = null, guild = null, time = null) => {
  var embed = new Discord.RichEmbed()
  if (type.includes("End")){
    embed.setColor(raids[type.substring(0, type.length - 3)].color)
    embed.setAuthor(raids[type.substring(0, type.length - 3)].name, raids[type.substring(0, type.length - 3)].icon)
    embed.setDescription(raids.generic.ended)
  } else {
    embed.setColor(raids[type].color)
    embed.setAuthor(raids[type].name, raids[type].icon)
    embed.setDescription(eval('`' + raids[type].desc + raids.generic.end + '`'))
  }
  embed.setFooter(raids.generic.raidLeader + leader.username)
  if(time != null && time != undefined && time != "") {
    console.log("Settings time link")
    embed.setTitle('Raid scheduled for: ' + time.toString().replace(/\+/g, ' '))
    embed.setURL('https://www.wolframalpha.com/input/?i=' + time + '+in+local+time')
  } else {

  }
  return embed;
}