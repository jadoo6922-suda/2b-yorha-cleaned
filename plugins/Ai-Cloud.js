import axios from "axios"

async function askGroq(text) {
  const key = global.APIs?.groq || process.env.GROQ_API_KEY
  if (!key) throw new Error("ضع مفتاح Groq في settings.js → global.APIs.groq")

  const models = [
    global.groqModel,
    "openai/gpt-oss-20b",
    "openai/gpt-oss-120b",
  ].filter(Boolean)

  let last
  for (const model of [...new Set(models)]) {
    try {
      const res = await axios.post(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          model,
          messages: [
            { role: "system", content: "أجب بوضوح. إذا السؤال بالعربي أجب بالعربي." },
            { role: "user", content: text },
          ],
          max_tokens: 2048,
          temperature: 0.6,
        },
        {
          headers: {
            Authorization: `Bearer ${key}`,
            "Content-Type": "application/json",
          },
          timeout: 90000,
        }
      )
      const out = res.data?.choices?.[0]?.message?.content
      if (out) return String(out).trim()
    } catch (e) {
      last = e.response?.data?.error?.message || e.message
      if (/does not exist|decommissioned|404/i.test(String(last))) continue
      throw new Error(last)
    }
  }
  throw new Error(last || "فشل Groq")
}

let handler = async (m, { text, usedPrefix, command }) => {
  if (!text) {
    return m.reply(
      `*الذكاء الاصطناعي*\n${usedPrefix}${command} سؤالك\nمثال:\n${usedPrefix}ai كم مساحة سوريا؟`
    )
  }
  try {
    await m.react("⚡").catch(() => {})
    const answer = await askGroq(text)
    await m.reply(answer)
  } catch (e) {
    await m.reply("❌ " + (e.message || e))
  }
}

handler.help = ["ai", "اسال", "كلود", "groq"]
handler.tags = ["ai"]
handler.command = /^(ai|اسال|ذكاء|كلود|claude|groq|gpt|gemini|جيميني)$/i
export default handler
