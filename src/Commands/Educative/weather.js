const axios= require("axios")
module.exports = {
    name: "weather",
    desc: "Give the weater of give city",
    alias:["wther"],
    react: "🌪️",
    usage: `${prefa}weather [place_name]`,
    category: "Educative",
    start: async(Akeno, m,{text ,pushName,prefix}) => {
        if (!text) return void M.reply('Please provide me the place name.')
        await axios
            .get(
                `https://api.openweathermap.org/data/2.5/weather?q=${text}&units=metric&appid=e409825a497a0c894d2dd975542234b0&language=tr`
            )
            /* Note
  If you want to add some response, we'd recommend you to explore the json itself which provided link returns.
  This stability of the url and API KEY is not guaranteed.
  Regards: Team Kaoi
 */
            .then((response) => {
                // console.log(response);
                const wether = `🔎 Weather for the place *${text}* found\n\n🌸 *Place:* ${response.data.name}\n*💮 Country:* ${response.data.sys.country}\n🌈 *Weather:* ${response.data.weather[0].description}\n🌡️ *Temperature:* ${response.data.main.temp}°C\n❄️ *Minimum Temperature:* ${response.data.main.temp_min}°C\n📛 *Maximum Temperature:* ${response.data.main.temp_max}°C\n💦 *Humidity:* ${response.data.main.humidity}%\n🎐 *Wind:* ${response.data.wind.speed} km/h\n`
                m.reply(wether)
            })
            .catch((err) => {
                m.reply(`Sorry, couldn't find any state or place name related to *${text}*.`)
            })
    }
}