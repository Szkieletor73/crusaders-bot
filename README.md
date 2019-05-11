# Crusaders Bot
A Discord bot built on Discord.js, for the use of Crusaders of Halls RotMG guild.
Bot mirrors some features of Pubhalls bot to allow guild use of those features, but does not use or copy any of their code.

Code currently specific to CoH Discord, mainly hardcoded IDs, and will need modifications to be used with other Discords.

Thanks to https://nightfirec.at/ for their RealmEye API.

### Features
Prefix all commands with `!`, ie. `!raid ot`.
`raid ["ot", "void", "cult", "thicket", "event", "shatts", "tomb"]` - calls a specified raid and deletes calling message. Functions similar to Pubhalls, but does not have any connection with Voice channels - simply mentions @here and displays reacts for the raid.

`verify` - automatic guild membership verification. Calls Realmeye Api by Nightfirecat to verify the user's membership, and ownership of the account.