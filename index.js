const botconfig = require("./botconfig.json");
const tokenfile = require("./token.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();


fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }

  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);
  });
});

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online on ${bot.guilds.size} servers!`);
  bot.user.setActivity("Made By BigLight", {type: "WATCHING"});

});


bot.on("guildMemberAdd", async member => {
  console.log(`${member.id} Joined The Server.`);

  let welcomechannel2 = member.guild.channels.find(`name`, "〖👋〗welcome-leave");
  let wEmbed = new Discord.RichEmbed()
  .setTitle(`Welcome ${member.user.username}`)
  .setThumbnail(member.user.displayAvatarURL)
  .setColor("RANDOM")
  .setDescription(`
  **!K.N. D ברוך הבא לשרת של**
  **${member}**
  `)
  .setTimestamp(Date.now());

  welcomechannel2.send(wEmbed);
  member.send("**🎉😉!K.N.D תודה רבה שהצטרפת לשרת של😉🎉**");
});


bot.on("guildMemberRemove", async member => {
  console.log(`${member.id} Leaved The Server.`);

  let welcomechannel = member.guild.channels.find(`name`, "〖👋〗welcome-leave");
  welcomechannel.send(`${member} Leaved The Server`);
  let wEmbed = new Discord.RichEmbed()
  .setTitle(`${member.user.username} Leave`)
  .setThumbnail(member.user.displayAvatarURL)
  .setColor("RANDOM")
  .setDescription(`**עזב את השרת ${member}`)
  .setTimestamp(Date.now());

  welcomechannel2.send(wEmbed);
  member.send("**😥!חבל שעזבת את השרת😥**");
});


bot.on("message", async message => {
  let banned_links = ['https://', 'www', 'com', 'co.il', 'net'] // etc, etc... Array
  if(message.member.hasPermission("MANAGE_MESSAGES")) return;
  if (banned_links.some(link => message.content.toLowerCase().includes(link)) ) {
  message.delete()
  message.channel.send(`${message.author} אסור לשלוח לינקים בשרת`);
  } // Yeetus that deletus
});


bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;



  if(!message.content.startsWith("+")) return;
  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot,message,args);
})

bot.login(tokenfile.token);
