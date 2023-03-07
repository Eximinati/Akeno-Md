const { lyricsv2 } = require("@bochilteam/scraper");

module.exports = {
  name: "lyrics",
  alias: ["songlysics"],
  desc: "To get any song lyrics",
  category: "Search",
  usage: `lyrics <song name>`,
  react: "🍁",
  start: async (Akeno, m, { text, prefix, args }) => {
    if (!args[0])
      return Akeno.sendMessage(
        m.from,
        { text: `Please provide a Search Term !` },
        { quoted: m }
      );
    var LyricssearchTerm = args.join(" ");

    const resultlyrics = await lyricsv2(LyricssearchTerm).catch(
      async (_) => await lyricsv2(LyricssearchTerm)
    );

    let resText = `  *『  ⚡️ Lyrics Search Engine ⚡️  』*\n\n\n_Search Term:_ *${LyricssearchTerm}*\n\n\n*📍 Lyrics:* \n\n${resultlyrics.lyrics}\n\n`;

    await Akeno.sendMessage(
      m.from,
      {
        image: {
          url: botImage3,
        },
        caption: resText,
      },
      { quoted: m }
    );
  },
};
