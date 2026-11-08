import { canLevelUp, xpRange } from '../lib/levelling.js'

let handler = m => m

handler.before = async function (m, { conn }) {
  try {
    if (!m?.sender) return !0
    if (!global.db?.data) return !0
    if (!global.db.data.users) global.db.data.users = {}

    const id = m.sender
    let user = global.db.data.users[id]
    if (!user || typeof user !== 'object') {
      user = global.db.data.users[id] = {
        exp: 0,
        level: 0,
        coin: 0,
      }
    }

    if (typeof user.level !== 'number' || Number.isNaN(user.level)) user.level = 0
    if (typeof user.exp !== 'number' || Number.isNaN(user.exp)) user.exp = 0
    if (typeof global.multiplier !== 'number') global.multiplier = 1

    const before = user.level
    let guard = 0
    while (canLevelUp(user.level, user.exp, global.multiplier) && guard < 100) {
      user.level++
      guard++
    }

    if (before !== user.level) {
      if (user.level % 5 === 0) {
        user.coin = (user.coin || 0) + (Math.floor(Math.random() * 3001) + 5000)
        user.exp = (user.exp || 0) + (Math.floor(Math.random() * 401) + 100)
      }
      try {
        xpRange(user.level, global.multiplier)
      } catch {}
    }
  } catch (e) {
    console.error('[_level]', e?.message || e)
  }
  return !0
}

export default handler
