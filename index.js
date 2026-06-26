const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers
  ]
});

// ⚙️ CONFIGURATION
const PLATFORM_ROLE_NAME = "── Platform ──";

const PLATFORM_ROLES = [
  "Xbox",
  "PC",
  "Switch",
  "Tél"
];

client.on("guildMemberUpdate", async (oldMember, newMember) => {
  try {
    const guild = newMember.guild;

    const platformRole = guild.roles.cache.find(
      r => r.name === PLATFORM_ROLE_NAME
    );

    if (!platformRole) return;

    // Vérifie si le membre a au moins un rôle plateforme
    const hasAnyPlatformRole = PLATFORM_ROLES.some(roleName =>
      newMember.roles.cache.some(r => r.name === roleName)
    );

    // ✅ AJOUT
    if (hasAnyPlatformRole) {
      if (!newMember.roles.cache.has(platformRole.id)) {
        await newMember.roles.add(platformRole);
        console.log(`Ajout Platform à ${newMember.user.tag}`);
      }
    }

    // ❌ RETRAIT
    if (!hasAnyPlatformRole) {
      if (newMember.roles.cache.has(platformRole.id)) {
        await newMember.roles.remove(platformRole);
        console.log(`Retrait Platform à ${newMember.user.tag}`);
      }
    }

  } catch (err) {
    console.error(err);
  }
});

client.once("ready", () => {
  console.log(`🤖 Connecté en tant que ${client.user.tag}`);
});

client.login("MTM0MzA5MzY4NDgzMjQzNjM2Nw.GtvoTX.KGiAigniobmPWTU-HYIkUcUq18pcTE88zLEFGU");