const axios = require("axios");

module.exports = {
  name: "ipinfo",
  alias: ["ip", "iplookup"],
  desc: "To get information about an IP address",
  category: "Search",
  usage: `ip <ip address>`,
  react: "🔍",
  start: async (Akeno, m, { text, prefix, args }) => {
    if (args[0]) {
      const ipAddress = args[0];
      const apiURL = `https://ipapi.co/${ipAddress}/json/`;

      try {
        const response = await axios.get(apiURL);
        const { ip, city, region, country_name, postal , latitude , longitude , timezone , languages , org } = response.data;


        const message = 
        `*IP:* ${ip}\n*City:* ${city}\n*Region:* ${region}\n*Country:* ${country_name}\n*Postal Code:* ${postal}\n  *latitude:* ${latitude} \n  *longitude:* ${longitude} \n *timezone:* ${timezone} \n *languages:* ${languages} \n `;

        await Akeno.sendMessage(m.from, { text: message }, { quoted: m });
      } catch (error) {
        console.log(error);
        await Akeno.sendMessage(
          m.from,
          { text: `An error occurred while processing your request.` },
          { quoted: m }
        );
      }
    } else {
      await Akeno.sendMessage(
        m.from,
        { text: `Please provide an IP address to look up.` },
        { quoted: m }
      );
    }
  },
};


       // *Version:* ${data.data.version} \n 
        // *City:* ${data.data.city} \n 
        // *Region:* ${data.data.region} \n 
        // *Country:* ${data.data.country_name} \n 
        // *latitude:* ${data.data.latitude} \n  
        // *longitude:* ${data.data.longitude} \n 
        // *timezone:* ${data.data.timezone} \n 
        // *languages:* ${data.data.languages} \n 
        // *asn:* ${data.data.asn} \n 
        // *org:* ${data.data.org}
        
        