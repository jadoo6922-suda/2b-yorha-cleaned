/*
  تنفيذ أوامر النظام — للمالك فقط
  استخدم بحذر على Termux
*/
import cp, { exec as _exec } from "child_process"
import { promisify } from "util"

const exec = promisify(_exec).bind(cp)

function isOwnerSender(sender) {
  const num = String(sender || "").replace(/\D/g, "")
  const owners = (global.owner || []).map((o) => String(Array.isArray(o) ? o[0] : o).replace(/\D/g, ""))
  return owners.some((o) => o && (num.endsWith(o) || o.endsWith(num)))
}

const handler = async (m, { conn, text }) => {
  if (!isOwnerSender(m.sender)) return
  if (global.conn?.user?.jid && global.conn.user.jid != conn.user.jid) return

  const cmd = (text || "").trim()
  if (!cmd) return m.reply("استخدم: $ <أمر>")

  // منع أوامر مدمرة شائعة بالخطأ
  if (/\brm\s+-rf\s+[\/~]|\bmkfs\b|\bdd\s+if=/i.test(cmd)) {
    return m.reply("أمر مرفوض لأسباب أمنية.")
  }

  await m.reply("جاري التنفيذ...")
  try {
    const o = await exec(cmd, { timeout: 60000, maxBuffer: 1024 * 1024 })
    if (o.stdout?.trim()) await m.reply(o.stdout.trim().slice(0, 3500))
    if (o.stderr?.trim()) await m.reply(o.stderr.trim().slice(0, 1500))
    if (!o.stdout?.trim() && !o.stderr?.trim()) await m.reply("تم بدون مخرجات.")
  } catch (e) {
    await m.reply(String(e?.stdout || e?.stderr || e.message || e).slice(0, 2000))
  }
}

handler.customPrefix = /^[$]/
handler.command = new RegExp()
handler.help = ["$ <أمر>"]
handler.tags = ["owner"]
export default handler
