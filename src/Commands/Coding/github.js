const axios = require("axios");
module.exports = {
  name: "github",
  alias: ["gh"],
  desc: "Search an username on github",
  category: "Coding",
  usage: `${prefa}gh <github username>`,
  react: "🍁",
  start: async (Akeno, m, {text ,  prefix, pushName, args,mime }) => {
const terms = text.trim().split('/')
        if (terms[0] === '')
            return m.reply(`Arguments not found : Use ${prefix}gh (username/repo | username)`)
        const username = terms[0]
        const repo = terms.length > 1 ? terms[1] : null
        let Usertext = ''
        if (!repo) {
            const userInfo = await axios
                .get(`https://api.github.com/users/${username}`)
                .then((res) => res.data)
                .catch((err) => {
                    console.log(err)
                    return m.reply('🟥 ERROR 🟥\n Failed to fetch the User')
                })

            if (userInfo === undefined) {
                return m.reply('🟥 ERROR 🟥\n Failed to fetch the User')
            }
            let GhUserPP = userInfo.avatar_url;


            // prepare text information
            Usertext += `🌐 *URL:* http://github.com/${username}\n`
            Usertext += `🌟 *Username:* ${userInfo.name}\n`
            if (userInfo.email !== null) Usertext += `📧 *Email:* ${userInfo.email}\n`
            if (userInfo.location !== null) Usertext += `📍 *Location:* ${userInfo.location}\n`
            if (userInfo.bio !== null) Usertext += `🚀 *Bio:* ${userInfo.bio}\n`
            Usertext += `*👥 Followers:* ${userInfo.followers}\n💫 *Following:* ${userInfo.following}\n`
            Usertext += `💮 *Public Repositories:* ${userInfo.public_repos}\n`
           
            
            await Akeno.sendMessage(
                      m.from,
                      {
                        image: { url: GhUserPP, mimetype: "image/jpeg" },
                        caption: Usertext,
                      },
                      { quoted: m }
                    );
        } else {
            const repoInfo = await axios
                .get(`https://api.github.com/repos/${username}/${repo}`)
                .then((res) => res.data)
                .catch((err) => {
                    console.log(err)
                    return m.reply('🟥 ERROR 🟥\n Failed to fetch the Repo')
                })

            if (repoInfo === undefined) {
                return m.reply('🟥 ERROR 🟥\n Failed to fetch the Repo')
            }

            // prepare text information
            Usertext += `🌐 *URL :* http://github.com/${username}/${repo}\n`
            Usertext += `📂 *Repository Name :* ${repoInfo.name}\n`
            Usertext += `❄ *Description:* ${repoInfo.description ?? '-'}\n`
            Usertext += `🎀 *License:* ${repoInfo.license.name}\n`
            Usertext += `🌟 *Stars:* ${repoInfo.stargazers_count}\n`
            Usertext += `🌸 *Language:* ${repoInfo.language}\n`
            Usertext += `🍴 *Forks:* ${repoInfo.forks_count}\n`
            Usertext += `⚠️ *Issues:* ${repoInfo.open_issues_count}\n`
            Usertext += `📅 *Created on:* ${repoInfo.created_at}\n`
            Usertext += `📅 *Updated on:* ${repoInfo.updated_at.slice(0, 11)}\n`

            return m.reply(Usertext)
        }
  }
}