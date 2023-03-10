module.exports = {
    name: "profile",
    alias: ["p"],
    desc: "Shows the user profile",
    react: "🧣",
    usage: `${prefa}profile`,
    category: "General",
    start: async(Akeno, m,{pushName,prefix}) => {
        let pfp
        try {
            pfp = await this.client.getProfilePicture(user)
        } catch (err) {
            m.reply(`Profile Picture not Accessible of ${username}`)
            pfp =
                'https://www.linkpicture.com/q/OIP-depositphotos-bgremover.png'
        }
    }
}