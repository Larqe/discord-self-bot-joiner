const { Client } = require('discord.js-selfbot-v13');
const config = require('./config.json');
require('colors');

console.log(`
  _                                
 | |                               
 | |       __ _  _ __   __ _   ___ 
 | |      / _' || '__| / _' | / _ \\
 | |____ | (_| || |   | (_| ||  __/
 |______| \\__,_||_|    \\__, | \\___|
                        __/ |      
                       |___/       
             Developed by Larqe
`.cyan);

if (!config.tokens || config.tokens.length === 0) {
    console.log('[ERROR]'.red + ' config.json içinde token bulunamadı!');
    process.exit(1);
}

const games = [
    "League of Legends", "Grand Theft Auto V", "VALORANT", "Counter-Strike 2",
    "Minecraft", "Roblox", "Spotify", "Visual Studio Code", "YouTube",
    "Apex Legends", "Call of Duty: Modern Warfare III", "Fortnite",
    "Rocket League", "Rust", "FiveM", "Discord", "Grand Theft Auto VI"
];

const statuses = [
    "Hayat bir oyun, biz oyuncuyuz.", "Larqe was here.", "Busy...",
    "Working on something big 🚀", "Gülümse çekiyorum 📸", "Gençleştikçe yaşlanıyoruz.",
    "Afk.", "Coffee & Code ☕", "Chilling in voice.", "Ria Roleplay ❤️"
];

const bios = [
    "Developer & Designer", "Living the dream.", "Discord Specialist",
    "Always active, always online.", "Owner of Larqe Services.",
    "Ria Roleplay Player.", "Stay positive."
];

const login = async () => {
    for (let i = 0; i < config.tokens.length; i++) {
        const token = config.tokens[i];
        const client = new Client({ checkUpdate: false });

        client.on('ready', async () => {
            console.log(`[${'SYSTEM'.yellow}]`.white + ` Account logged in as: ${client.user.tag.green} (Index: ${i + 1})`);

            const updatePresence = async () => {
                try {
                    const randomGame = games[Math.floor(Math.random() * games.length)];
                    const randomStatusText = statuses[Math.floor(Math.random() * statuses.length)];
                    const randomBio = bios[Math.floor(Math.random() * bios.length)];
                    const statusType = config.status || ['online', 'idle', 'dnd'][Math.floor(Math.random() * 3)];

                    // 1. Bio
                    try {
                        if (client.user.setBio) await client.user.setBio(randomBio);
                        else if (client.user.setAboutMe) await client.user.setAboutMe(randomBio);
                    } catch (e) { }

                    // 2. Custom Status & Activity
                    const isStreaming = Math.random() > 0.7;
                    client.user.setPresence({
                        status: statusType,
                        activities: [
                            {
                                name: "Custom Status",
                                type: "CUSTOM",
                                state: randomStatusText
                            },
                            {
                                name: config.activity?.name || randomGame,
                                type: isStreaming ? 1 : 0,
                                url: isStreaming ? "https://www.twitch.tv/larqe" : undefined
                            }
                        ]
                    });

                    return { randomGame, randomStatusText, statusType, randomBio, isStreaming };
                } catch (err) {
                    console.log(`[${'ERROR'.red}]`.white + ` Update failed for ${client.user.tag}: ${err.message}`);
                    return null;
                }
            };

            const joinVoiceSafely = async (retryCount = 0) => {
                if (!config.joinVoice) return;
                try {
                    const guild = client.guilds.cache.get(config.guildId);
                    const channel = guild?.channels.cache.get(config.channelId);
                    if (!guild || !channel) return console.log(`[${'WARN'.yellow}]`.white + ` ${client.user.tag}: Guild/Kanal bulunamadı.`);

                    const hasCamera = Math.random() > 0.5;
                    const hasStream = Math.random() > 0.5;

                    await client.voice.joinChannel(channel, {
                        selfMute: config.selfMute ?? true,
                        selfDeaf: config.selfDeaf ?? true,
                        selfVideo: hasCamera,
                        selfStream: hasStream
                    });

                    if (hasCamera) client.voice.setSelfVideo(true).catch(() => { });
                    if (hasStream) client.voice.setSelfStream(true).catch(() => { });

                    let voiceStatus = [];
                    if (hasCamera) voiceStatus.push('Kamera 📸');
                    if (hasStream) voiceStatus.push('Yayın 📺');
                    console.log(`[${'VOICE'.blue}]`.white + ` ${client.user.tag.cyan} -> Sese Girildi! [${voiceStatus.length > 0 ? voiceStatus.join(' + ').yellow : 'Sadece Ses'}]`);
                } catch (err) {
                    if (retryCount < 3) {
                        setTimeout(() => joinVoiceSafely(retryCount + 1), 5000);
                    } else {
                        console.log(`[${'ERROR'.red}]`.white + ` ${client.user.tag} ses zaman aşımı: ${err.message}`);
                    }
                }
            };

            setTimeout(async () => {
                const info = await updatePresence();
                if (info) {
                    console.log(`[${'SUCCESS'.green}]`.white + ` ${client.user.tag.cyan} Aktif! (${info.isStreaming ? 'YAYIN' : 'OYUN'})`);
                }
                setInterval(updatePresence, 15 * 60 * 1000);
                joinVoiceSafely();
            }, 5000);
        });

        client.login(token).catch(err => {
            console.log(`[${'ERROR'.red}]`.white + ` Token #${i + 1} is invalid or has issues: ${err.message}`);
        });

        const randomDelay = Math.floor(Math.random() * 2000) + 2000;
        await new Promise(resolve => setTimeout(resolve, randomDelay));
    }
};

login();
