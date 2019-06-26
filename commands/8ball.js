const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  //8ball <question fjdksf>
  if(!args[1]) return message.channel.send(`**${message.author} !אנא שאל שאלה מלאה**`);
  let replies = ["כן", "לא", "אני לא יודע", "אתה צוחק עלי"]

  let result = Math.floor((Math.random() * replies.length));
  let question = args.slice(0).join(" ");

  let ballembed = new Discord.RichEmbed()
  .setAuthor(`${message.author.username} השאלה של`,  message.author.displayAvatarURL)
  .setColor("RANDOM")
  .addField("**שאלה**", question)
  .addField("**תשובה**", replies[result]);

  message.channel.send(ballembed);



}

module.exports.help = {
  name: "8ball"
}
