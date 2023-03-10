module.exports = {
    name: "invite",
    alias: ["invitelink" , "linkgc"],
    desc: "Gives the current group invite link",
    react: "🧣",
    usage: `${prefa}invite`,
    category: "General",
    start: async(Akeno, m,{ prefix, isBotAdmin, isAdmin, metadata, mime }) => {
        // if (!isBotAdmin)
        // return Akeno.sendMessage(m.from, { text: "User should be admin" }, { quoted: m });
  
      var link = await Akeno.groupInviteCode(m.from);
      var linkcode = `https://chat.whatsapp.com/${link}`;
  
      try {
        ppgc = await Akeno.profilePictureUrl(m.from, "image");
      } catch {
        ppgc = "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/aa57c7a3-5c11-4370-b391-e03e9b453ade/dfiaiva-b3cd3328-ddf5-499c-967f-24a1278cc9fd.png/v1/fill/w_1280,h_1270,strp/hao_dimension___akeno_himejima_post_restoration_by_haoroku_dfiaiva-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI3MCIsInBhdGgiOiJcL2ZcL2FhNTdjN2EzLTVjMTEtNDM3MC1iMzkxLWUwM2U5YjQ1M2FkZVwvZGZpYWl2YS1iM2NkMzMyOC1kZGY1LTQ5OWMtOTY3Zi0yNGExMjc4Y2M5ZmQucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.z3rCyHqCzidRq7YwkDOz_tsoT7FXuLdGR83o936Tn1k";
      }
  
      try {
        await Akeno.sendMessage(
          m.from,
          {
            image: { url: ppgc, mimetype: "image/jpeg" },
            caption: `\n_🎀 Group Name:_ *${metadata.subject}*\n\n_🔷 Group Link:_\n${linkcode}\n`,
          },
          { quoted: m }
        );
      } catch (err) {
        Akeno.sendMessage(m.from, { text: `${mess.botadmin}` }, { quoted: m });
      }
    }
}