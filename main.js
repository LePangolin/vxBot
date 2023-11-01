const DISCORD = require("discord.js");

const CLIENT = new DISCORD.Client({
    intents: [
        DISCORD.GatewayIntentBits.Guilds,
        DISCORD.GatewayIntentBits.GuildMessages,
        DISCORD.GatewayIntentBits.MessageContent
    ]
});

CLIENT.on('messageCreate', (message) => {
    if(!message.author.bot){
        if(message.content.includes("https://x.com") || message.content.includes("https://twitter.com")){
            let content = message.content.split(" ");
            let orignalMessage = '';
            let indexLink = 0;
            let find = false;
            content.forEach((element) => {
                if(!element.includes("https://x.com") && !element.includes("https://twitter.com")){
                    if(!find){
                        indexLink++;
                    }
                }else{
                    find = true;
                }
            });
            let link = content[indexLink];
            if(indexLink != content.length-1){
              content[indexLink] = "[ LINK ]";
            }else{
              content.splice(indexLink);  
            }
            content.forEach((string) => {
                orignalMessage+= string;
                orignalMessage+= ' ';
            })
            let linkSplit = link.split("//");
            let secondPart = linkSplit[1].split("/")
            secondPart[0] = "vxtwitter.com";
            link = linkSplit[0] + "//" + secondPart[0] + '/';
            let index = 0;
            secondPart.forEach((element) => {
                if(index === 0){
                    index++;
                }else{
                    link+=element;
                    link+='/';
                }
            });
            if(secondPart.length > 2){
                message.delete();
                message.channel.send(message.author.toString() + " : " + orignalMessage);
                message.channel.send(link);
            }
        }
    }
});

CLIENT.on('ready', () => {
    console.log('Ready !');
})

CLIENT.login(process.env.DISCORD_TOKEN);

