const economyModel = require('../../Handlers/economy')
const Group = require("../../Handlers/group")

module.exports = {
    name: 'leaderboard',
    alias: ['lb'],
    usage: `${prefa}leaderboard`,
    desc: 'Displays the economy leaderboard.',
    category: 'Economy',
    react: '📈',
    cool:3,
    start: async (client, m, { prefix }) => {
        const topUsers = await economyModel.find().sort({ wallet: -1 , userId: m.pushName }).limit(10);

        let response = `💰 Economy Leaderboard 💰\n`;
        for (let i = 0; i < topUsers.length; i++) {
            const user = topUsers[i];
            const name = user.userId;
            const wallet = user.wallet;
            response += `${i+1}. ${name}: ${wallet} coins\n`;
        }
//, mentions: user
       
        await client.sendMessage(m.from , { text: response , mentions:topUser})
    }
}
