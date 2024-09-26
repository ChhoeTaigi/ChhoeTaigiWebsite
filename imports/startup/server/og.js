import { Meteor } from "meteor/meteor";
import { WebApp } from "meteor/webapp";
import { encode } from "js-base64";
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
    const heading = [word.PojUnicode, word.HanLoTaibunPoj]
      .filter(Boolean)
      .join(" ");
    const title = `${heading} @ ${struct.chineseName} | ChhoeTaigi 台語辭典⁺`;
    const descriptionList = [
      word.KaisoehPoj,
      word.KaisoehHanLoPoj,
      word.KaisoehJitbunPoj,
      word.KaisoehEngbun,
    ]
      .filter(Boolean);
    const description = descriptionList.join(" $ ");
    const url = `https://chhoe.taigi.info/${dic}/${id}`;

    const slug = encodeURIComponent(
      encode(
        JSON.stringify({
          fontFamily: "Noto Sans",
          fontVariant: 600,
          // ------------------------
          imageUri: "https://chhoe.taigi.info/images/logo@2x.png",
          heading,
          text: descriptionList.join("\n"),
          footerText: `${struct.chineseName}\n${url}`,
        })
      )
    );
    const image = `https://oeanga.vercel.app/0e9893b7-bd9f-4ebc-beb8-f7dfc1d90463/${slug}/opengraph-image`;

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
