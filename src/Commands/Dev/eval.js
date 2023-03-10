require("../../settings/config")
module.exports = {
    name: "eval",
    alias: ["eval"],
    desc: "Evulate Javascript",
    react: "📊",
    usage:  `${prefa}eval <Your code>`,
    category: "Dev",
    start:async(Akeno,m,{text,ban,pushName,mentionByTag,isCreator,args,body,quoted,mime})=>{
    if(!isCreator) return Akeno.sendMessage(m.from,{text:'*Only mods can use this command*'},{quoted:m})
    let out
    try {
        const output = eval(text) || 'Executed JS Successfully!'
        // console.log(output)
        out = JSON.stringify(output)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err) {
        out = err.message
    }
    return (await m.reply(out))
}


}