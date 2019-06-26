const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  //!warn @daeshan <reason>
  message.delete().catch(O_o=>{});
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`**${message.author} אין ברשותך מספיק פרמישן בשביל להשתמש בפקודה זו**`);
  let wUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!wUser) return message.channel.send(`**${message.author} אנא תייג את הבנאדם שברצונך להזהיר**`);
  if(wUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`**${message.author} !אני לא יכול להזהיר איש צוות**`);
  let reason = args.join(" ").slice(22);
  if(!reason) return message.channel.send(`**${message.author} !אנא כתוב סיבה**`);



  return message.channel.send(`**<@${wUser.id}> Has Been Warned Because: ${reason}.**`);

}

module.exports.help = {
  name: "warn"
}
