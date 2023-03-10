module.exports = {
    name: "akeno",
    desc: "Displays the info",
    alias: ["repo"],
    react: "🧣",
    usage: `${prefa}akeno`,
    category: "General",
    start: async(Akeno, m,{pushName,prefix}) => {

        let yup = ['https://telegra.ph/file/1c333a18f4578c924d78d.mp4',
                    'https://telegra.ph//file/f58614bfc79c7b23ad4bf.mp4',
                    'https://telegra.ph//file/efaa47b716fdce4292453.mp4',
                    'https://media.tenor.com/3hg8FNx7bOkAAAPo/excited.mp4',
                    'https://media.tenor.com/PJdw6qCLD1MAAAPo/issei-akeno.mp4',
                    'https://media.tenor.com/PaZ9sfVMTvEAAAPo/akeno.mp4',
                    'https://media.tenor.com/LKsB93W_f0EAAAPo/highschool-dxd-hs-dxd.mp4',
                    'https://media.tenor.com/floSh_t8Oj8AAAPo/akeno-himejima.mp4',
                    'https://media.tenor.com/nO3iYifu1HEAAAPo/akeno-dxd.mp4',
                    "https://media.tenor.com/EGScAjZer7gAAAPo/akeno-himejima.mp4",
                    "https://media.tenor.com/_AQARdpNUD4AAAPo/akeno.mp4"
                ]
        let rae = yup[Math.floor(Math.random() * yup.length)]
// 📒 *Guide: https://github.com/ShineiIchijo/Chitoge-Guides* \n\n 
       
        const text = `
        ⚡ *Akeno* ⚡\n\n
        🍀 *Description: A WhatsApp Bot With Rich NSFW features based on Baileys.*\n\n
        🌐 *OFFICIAL BOT URL: https://github.com/Eximinati/Akeno-md* \n\n 
        👾 *GROUP URL:Soon* \n`


        await Akeno.sendMessage(m.from,{video:{url:"https://media.tenor.com/nO3iYifu1HEAAAPo/akeno-dxd.mp4"}, gifPlayback:true, caption: text},{quoted:m})
    // await Akeno.sendMessage(m.from,{video:{url:ariani}, gifPlayback:true, caption: text},{quoted:m})
    
    }
    
    }
