const axios = require("axios");
module.exports = {
  name: "github",
  alias: ["gh"],
  desc: "Search an username on github",
  category: "Coding",
  usage: `${prefa}gh <github username>`,
  react: "š",
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
                    return m.reply('š„ ERROR š„\n Failed to fetch the User')
                })

            if (userInfo === undefined) {
                return m.reply('š„ ERROR š„\n Failed to fetch the User')
            }
            let GhUserPP = userInfo.avatar_url;


            // prepare text information
            Usertext += `š *URL:* http://github.com/${username}\n`
            Usertext += `š *Username:* ${userInfo.name}\n`
            if (userInfo.email !== null) Usertext += `š§ *Email:* ${userInfo.email}\n`
            if (userInfo.location !== null) Usertext += `š *Location:* ${userInfo.location}\n`
            if (userInfo.bio !== null) Usertext += `š *Bio:* ${userInfo.bio}\n`
            Usertext += `*š„ Followers:* ${userInfo.followers}\nš« *Following:* ${userInfo.following}\n`
            Usertext += `š® *Public Repositories:* ${userInfo.public_repos}\n`
           
            
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
                    return m.reply('š„ ERROR š„\n Failed to fetch the Repo')
                })

            if (repoInfo === undefined) {
                return m.reply('š„ ERROR š„\n Failed to fetch the Repo')
            }

            // prepare text information
            Usertext += `š *URL :* http://github.com/${username}/${repo}\n`
            Usertext += `š *Repository Name :* ${repoInfo.name}\n`
            Usertext += `ā *Description:* ${repoInfo.description ?? '-'}\n`
            Usertext += `š *License:* ${repoInfo.license.name}\n`
            Usertext += `š *Stars:* ${repoInfo.stargazers_count}\n`
            Usertext += `šø *Language:* ${repoInfo.language}\n`
            Usertext += `š“ *Forks:* ${repoInfo.forks_count}\n`
            Usertext += `ā ļø *Issues:* ${repoInfo.open_issues_count}\n`
            Usertext += `š *Created on:* ${repoInfo.created_at}\n`
            Usertext += `š *Updated on:* ${repoInfo.updated_at.slice(0, 11)}\n`

            return m.reply(Usertext)
        }
  }
}