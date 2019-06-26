const Discord = require("discord.js");
let cooldown = new Set();
let cdseconds = 300;

module.exports.run = async (bot, message, args) => {

  if(cooldown.has(message.author.id)){
    message.delete();
    return message.channel.send(`**${message.author} !אתה צריך לחכות 5 דקות בשביל להשתמש בפקודה זו שוב**`)
  }
  //if(!message.member.hasPermission("ADMINISTRATOR")){
    cooldown.add(message.author.id);
//  }

  setTimeout(() => {
    cooldown.delete(message.author.id)
  }, cdseconds * 1000)


  let helpers = message.guild.roles.find(`name`, "Helpers");
  let sHelpers = message.guild.roles.find(`name`, "Senior Helpers");
  let staff = message.guild.roles.find(`name`, "Staff");
  if(!message.member.voiceChannel) return message.channel.send(`
**${helpers} ${sHelpers} ${staff} ${message.author} !צריך את עזרתכם**
**📛 !המשתמש לא נמצא בשום חדר**
    `);

  return message.channel.send(`
**${helpers} ${sHelpers} ${staff} ${message.author} !צריך את עזרתכם**
**\`${message.member.voiceChannel.name}\` :המשתמש נמצא בחדר 🔔**
    `);

}

module.exports.help = {
  name: "helpme"
}
