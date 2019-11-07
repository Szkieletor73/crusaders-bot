const config = require('./config')
const emoji = require('./emoji')

module.exports = {
  "common": {
    "end": "\nRaid leader can react with ${guild.emojis.find(emoji => emoji.name == 'no')} to end the call.",
    "voice": "\nVoice channel: ",
    "ended": "Run is in progress or complete.",
    "raidLeader": "Raid leader: "
  },
  "event": {
    "icon": "https://static.drips.pw/rotmg/wiki/Environment/Portals/Forest%20Maze%20Portal.png",
    "color": "WHITE",
    "name": "Event Dungeons",
    "desc": "React with ${guild.emojis.find(emoji => emoji.name == 'pcave')} and join voice to participate.\nReact with ${guild.emojis.find(emoji => emoji.name == 'thicckey')} if you have any event keys and are willing to pop.\nReact with a class or ability if you plan to bring it to the run.",
    "reacts": [
      emoji.portal.pcave,
      emoji.key.thicket,
      emoji.class.paladin,
      emoji.class.warrior,
      emoji.class.knight,
      emoji.class.mystic,
      emoji.class.priest,
      emoji.item.planewalker,
      emoji.generic.cancel
    ]
  },
  "cult": {
    "icon": "https://i.imgur.com/nPkovWR.png",
    "color": "RED",
    "name": "Lost Halls - Cult",
    "desc": "React with ${guild.emojis.find(emoji => emoji.name == 'cult')} and join voice to participate.\nReact with ${guild.emojis.find(emoji => emoji.name == 'lostHalls')} if you have a key and are willing to pop.\nReact with a class and ability if you plan to bring it to the run.",
    "reacts": [
      emoji.portal.cult,
      emoji.key.losthalls,
      emoji.class.paladin,
      emoji.class.warrior,
      emoji.class.knight,
      emoji.item.ogmur,
      emoji.item.mseal,
      emoji.class.mystic,
      emoji.item.planewalker,
      emoji.class.priest,
      emoji.item.puri,
      emoji.generic.cancel
    ]
  },
  "void": {
    "icon": "https://i.imgur.com/kbzthE4.png",
    "color": "BLUE",
    "name": "Lost Halls - Void",
    "desc": "React with ${guild.emojis.find(emoji => emoji.name == 'void')} and join voice to participate.\nReact with ${guild.emojis.find(emoji => emoji.name == 'lostHalls')} if you have a key and are willing to pop.\nReact with ${guild.emojis.find(emoji => emoji.name == 'vial')} if you have a vial and are willing to pop.\nReact with a class and ability if you plan to bring it to the run.",
    "reacts": [
      emoji.portal.void,
      emoji.key.losthalls,
      emoji.key.vial,
      emoji.class.paladin,
      emoji.class.warrior,
      emoji.class.knight,
      emoji.item.ogmur,
      emoji.item.mseal,
      emoji.class.mystic,
      emoji.item.planewalker,
      emoji.class.priest,
      emoji.item.puri,
      emoji.generic.cancel
    ]
  },
  "tomb": {
    "icon": "https://static.drips.pw/rotmg/wiki/Environment/Portals/Tomb%20of%20the%20Ancients%20Portal.png",
    "color": "YELLOW",
    "name": "Tomb of the Ancients",
    "desc": "React with ${guild.emojis.find(emoji => emoji.name == 'tomb')} and join voice to participate.\nReact with ${guild.emojis.find(emoji => emoji.name == 'tombkey')} if you have a key and are willing to pop.\nReact with a class and ability if you plan to bring it to the run.",
    "reacts": [
      emoji.portal.tomb,
      emoji.key.tomb,
      emoji.class.mystic,
      emoji.item.planewalker,
      emoji.generic.cancel
    ]
  },
  "thicket": {
    "icon": "https://i.imgur.com/8vEAT8t.png",
    "color": "GREEN",
    "name": "Secluded Thicket",
    "desc": "React with ${guild.emojis.find(emoji => emoji.name == 'thicc')} and join voice to participate.\nReact with ${guild.emojis.find(emoji => emoji.name == 'thicckey')} if you have a key and are willing to pop.",
    "reacts": [
      emoji.portal.thicket,
      emoji.key.thicket,
      "no"
    ]
  },
  "ot": {
    "icon": "https://static.drips.pw/rotmg/wiki/Environment/Portals/Ocean%20Trench%20Portal.png",
    "color": "BLUE",
    "name": "Ocean Trench",
    "desc": "React with ${guild.emojis.find(emoji => emoji.name == 'ot')} and join voice to participate.\nReact with ${guild.emojis.find(emoji => emoji.name == 'otkey')} if you have a key and are willing to pop.\nReact with ${guild.emojis.find(emoji => emoji.name == 'planewalker')} if you can and want to rush.",
    "reacts": [
      emoji.portal.ot,
      emoji.key.ot,
      emoji.item.planewalker,
      emoji.generic.cancel
    ]
  },
  "shatts": {
    "icon": "https://static.drips.pw/rotmg/wiki/Environment/Portals/The%20Shatters.png",
    "color": "GREEN",
    "name": "Shatters",
    "desc": "React with " + emoji.portal.shatters + " if you wish to participate.\nReact with " + emoji.key.shatters + " if you're willing to pop a key.\nReact with an item or class if you want to bring it to the run.",
    "reacts": [
      emoji.portal.shatters,
      emoji.key.shatters,
      emoji.class.mystic,
      emoji.item.planewalker,
      emoji.class.priest,
      emoji.generic.cancel
    ]
  }
}