const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  message.delete();
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`**${message.author} אין ברשותך מספיק פרמישן בשביל להשתמש בפקודה זו**`);
  let voteChannel2 = message.guild.channels.find(`name`, "『🗳』votes");
  if(!voteChannel2) return message.channel.send(`**${message.author} חדר הווטס לא נמצא**`);
  if(!args[1]) return message.channel.send(`**${message.author} !אנא כתוב נושא ווט מלא**`);
  let voSubject = args.slice(0).join(" ");
  let voteEmbed2 = new Discord.RichEmbed()
  .setAuthor(`${message.author.username}'s Vote`, message.author.displayAvatarURL)
  .setThumbnail(message.guild.iconURL)
  .setColor("#b70000")
  .addField("Vote Subject", voSubject)
  .setFooter("!אז מה אתם חושבים על ההצעה? הצביעו כאן למטה", message.guild.iconURL);

  voteChannel2.send(voteEmbed2).then(m => {
     m.react('❌')
     m.react('✅')
     })


}

module.exports.help = {
  name: "vote"
}
