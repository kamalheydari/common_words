import db from "@/lib/db"
import Word from "@/models/Word"

export default async function handler(req, res) {
  try {
    await db.connect()

    const { words } = req.body

    if (!words || !Array.isArray(words)) {
      return res.status(400).json({ error: "Words must be provided as an array" })
    }

    const formattedWords = [...new Set(words.map(w => w.trim().toLowerCase()))]

    const existingWords = await Word.find({
      title: { $in: formattedWords.map(w => new RegExp(`^${w}$`, "i")) }
    })

    const existingTitles = new Set(existingWords.map(w => w.title.toLowerCase()))

    const wordsToInsert = formattedWords
      .filter(w => !existingTitles.has(w))
      .map(w => ({ title: w }))

    if (wordsToInsert.length > 0) {
      // optionally insert them here using Word.insertMany(wordsToInsert)
      return res.status(201).json({ msg: "Words ready to insert", words: wordsToInsert })
    } else {
      return res.status(200).json({ msg: "No new words to insert" })
    }
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: "Failed to process words" })
  }
}
