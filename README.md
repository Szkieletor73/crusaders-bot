# Crusaders Bot
A Discord bot built on Discord.js, providing several features helpful for Realm of the Mad God guilds.
Initially built for Crusaders of Halls.
Bot mirrors some features of Pubhalls bot to allow guild use of those features, but does not use or copy any of their code.
If you have the option of using Pubhalls code, just use that. It's way better.

Thanks to https://nightfirec.at/ for their RealmEye API.

### Configuration

Put your bot token into an environmental variable called "BOT_TOKEN".

Configure `config.json` with server-specific options.

`emoji.json` contains data related to reaction emoji - set up your own emoji names or use the defaults. If you wish to further modify your raid details, use `raids.js`.

### Features
Prefix all commands with `!`, ie. `!raid ot`.
`raid ["ot", "void", "cult", "thicket", "event", "shatts", "tomb"]` - calls a specified raid and deletes calling message. Functions similar to Pubhalls, but does not have any connection with Voice channels - simply mentions @here and displays reacts for the raid.

`verify` - automatic guild membership verification. Calls Realmeye Api by Nightfirecat to verify the user's membership, and ownership of the account.