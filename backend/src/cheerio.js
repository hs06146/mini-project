import cheerio from "cheerio";
import axios from "axios";
export async function getOGFromPrefer(prefer) {
  const ogObj = {}
  const result = await axios.get(prefer);
  // 3. 스크래핑 결과에서 OG(오픈그래프) 코드 골라내서 변수에 저장하기
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
