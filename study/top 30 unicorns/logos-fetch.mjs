// 30개 유니콘 로고를 unavatar/favicon으로 수집해 logos/ 에 저장
import { writeFile, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = join(HERE, "logos");
const UA = "unicorns-doc/0.1";
const EXT = { "image/png":"png","image/jpeg":"jpg","image/webp":"webp","image/svg+xml":"svg","image/x-icon":"ico","image/vnd.microsoft.icon":"ico","image/gif":"gif" };

const MAP = {
  anthropic:"anthropic.com", openai:"openai.com", bytedance:"bytedance.com", stripe:"stripe.com",
  "ant-group":"antgroup.com", databricks:"databricks.com", waymo:"waymo.com", reliance:"relianceretail.com",
  revolut:"revolut.com", shein:"shein.com", anduril:"anduril.com", jio:"jio.com", ramp:"ramp.com",
  canva:"canva.com", ripple:"ripple.com", checkout:"checkout.com", figure:"figure.ai", ssi:"ssi.inc",
  fanatics:"fanatics.com", vast:"vastdata.com", "scale-ai":"scale.com", anysphere:"cursor.com",
  cognition:"cognition.ai", okx:"okx.com", fnz:"fnz.com", ymtc:"ymtc.com", juul:"juul.com",
  "epic-games":"epicgames.com", xiaohongshu:"xiaohongshu.com",
};

async function get(url){ const r = await fetch(url,{headers:{"User-Agent":UA},redirect:"follow"}); if(!r.ok) throw new Error(r.status); const ct=(r.headers.get("content-type")||"").split(";")[0].trim(); const buf=Buffer.from(await r.arrayBuffer()); if(buf.length<300) throw new Error("empty"); return {buf,ext:EXT[ct]||"png"}; }

await mkdir(OUT,{recursive:true});
for(const [slug,domain] of Object.entries(MAP)){
  let saved=false;
  for(const url of [`https://unavatar.io/${domain}`, `https://www.google.com/s2/favicons?domain=${domain}&sz=128`]){
    try{ const {buf,ext}=await get(url); await writeFile(join(OUT,`${slug}.${ext}`),buf); console.log(`✓ ${slug} (${(buf.length/1024|0)}KB ${ext})`); saved=true; break; }catch(e){}
  }
  if(!saved) console.log(`✗ ${slug} 실패`);
  await new Promise(r=>setTimeout(r,150));
}
console.log("완료");
