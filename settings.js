import { watchFile, unwatchFile } from "fs"
import chalk from "chalk"
import { fileURLToPath } from "url"
import fs from "fs"

global.botNumber = ""

// المالك الوحيد — عدّل الرقم هنا فقط
global.owner = [
  ["966572371042", "Owner", true],
]

global.mods = []
global.suittag = ["966572371042"]
global.prems = []

global.libreria = "Baileys Multi Device"
global.vs = "^1.3.3"
global.nameqr = "QR"
global.sessions = "Sessions/Principal"
global.jadi = "Sessions/SubBot"
global.MichiJadibts = false

global.botname = "NOX BOT"
global.textbot = "NOX BOT"
global.dev = "Owner"
global.author = "Owner"
global.etiqueta = "NOX"
global.currency = "عملة"

try {
  global.catalogo = fs.readFileSync("./lib/catalogo.jpg")
} catch {
  global.catalogo = Buffer.alloc(0)
}
global.michipg = ""
global.icono = ""

global.group = ""
global.community = ""
global.channel = ""
global.github = ""
global.gmail = ""
global.ch = { ch1: "", ch2: "" }

// مفاتيح API — ضع مفتاح Groq هنا
global.APIs = {
  groq: '',
  vreden: { url: "https://api.vreden.web.id", key: null },
  delirius: { url: "https://api.delirius.store", key: null },
  zenzxz: { url: "https://api.zenzxz.my.id", key: null },
  siputzx: { url: "https://api.siputzx.my.id", key: null },
}
global.groqModel = "openai/gpt-oss-20b"

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("Update settings.js"))
  import(`${file}?update=${Date.now()}`)
})
