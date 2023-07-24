import cheerio from "cheerio";
import axios from "axios";
export async function getOGFromPrefer(prefer) {
  const ogObj = {}
  const result = await axios.get(prefer);
  const $ = cheerio.load(result.data);
  $("meta").each((_, el) => {
    if ($(el).attr("property")) {
      const key = $(el).attr("property").split(":")[1];
      const value = $(el).attr("content");
      ogObj[key] = value
    }
  });
  return ogObj;
}
