import db from "@/lib/db"
import Word from "@/models/Word"

export default async function handler(req, res) {
  try {
    await db.connect()

    const { words, category } = req.body

    if (!words || !category || !Array.isArray(words)) {
      return res.status(400).json({ error: "Words (array) and category are required" })
    }

    const formattedWords = [...new Set(words.map(w => w.trim().toLowerCase()))]

    const existingWords = await Word.find({
      title: { $in: formattedWords.map(w => new RegExp(`^${w}$`, "i")) }
    })

    const existingTitles = new Set(existingWords.map(w => w.title.toLowerCase()))

    const wordsToInsert = formattedWords
      .filter(w => !existingTitles.has(w))
      .map(w => ({ title: w, category }))

    if (wordsToInsert.length > 0) {
      await Word.insertMany(wordsToInsert)
      return res.status(201).json({ msg: "Words inserted successfully" })
    } else {
      return res.status(200).json({ msg: "No new words to insert" })
    }
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: "Failed to insert words" })
  }
}