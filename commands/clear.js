const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`**${message.author} אין ברשותך מספיק פרמישן בשביל להשתמש בפקודה זו**`);
  if(!args[0]) return message.channel.send(`**${message.author} !אנא כתוב את מספר ההודעות שברצונך למחוק**`);
  message.channel.bulkDelete(args[0]).then(() => {
  message.channel.send(`**מחקת ${args[0]} הודעות**`).then(msg => msg.delete(2000));
});

}

module.exports.help = {
  name: "clear"
}
