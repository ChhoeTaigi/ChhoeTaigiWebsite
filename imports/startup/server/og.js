import { Meteor } from "meteor/meteor";
import { WebApp } from "meteor/webapp";
import dicStruct from "../../api/dicts/dictionary-struct";

/**
 * @see https://forums.meteor.com/t/meteor-change-og-meta-tags-dynamically/41822/20
 */
function sendOgTagsOnly(req, res, next) {
  const ua = req.headers["user-agent"];
  if (!/bot|facebook|twitter|google/i.test(ua)) {
    return false;
  }
  const matchedResult = req.url.match(/\/(\S+)\/(\d+)/);
  if (!matchedResult) {
    return false;
  }
  const [, dic, id] = matchedResult;
  const struct = dicStruct.find((struct) => struct.name === dic);
  if (!struct) {
    return false;
  }
  Meteor.call("search.dicAndId", dic, id, onSearchDicAndId);
  return true;

  function onSearchDicAndId(error, result) {
    if (error) {
      console.log(err);
      next();
      return;
    }
    const [word] = result;
    const title = `${[word.PojUnicode, word.HanLoTaibunPoj]
      .filter(Boolean)
      .join(" ")} @ ${struct.chineseName} | ChhoeTaigi 台語辭典⁺`;
    const description = [
      word.KaisoehPoj,
      word.KaisoehHanLoPoj,
      word.KaisoehJitbunPoj,
      word.KaisoehEngbun,
    ]
      .filter(Boolean)
      .join(" $ ");
    const url = `https://chhoe.taigi.info/${dic}/${id}`;
    const image = "https://chhoe.taigi.info/preview.jpg";

    const html = `
<!html>
<head>
  <title>${title}</title>
  <meta name="description" content="${description}" />
  <meta property="og:url" content="${url}"/>
  <meta property="og:type" content="website"/>
  <meta property="og:title" content="${title}"/>
  <meta property="og:description" content="${description}"/>
  <meta property="og:image" content="${image}"/>
  <meta property="fb:app_id" content="306448440105903"/>
</head>
<body>
</body>
  `;
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.end(html);
  }
}

WebApp.connectHandlers.use((req, res, next) => {
  try {
    if (sendOgTagsOnly(req, res, next)) {
      return;
    }
  } catch (err) {
    console.log(err);
  }
  next();
});
