import db from "@/lib/db"
import Word from "@/models/Word"

export default async function handler(req, res) {
  try {
    await db.connect()

    const { words } = req.body

    if (!words) {
      return res.status(400).json({ error: "Words and category are required" })
    }

    const wordsToInsert = []

    for (const word of words) {
      const formatedWord = word.trim()
      const existingWord = await Word.findOne({ title: { $regex: formatedWord, $options: "i" } })
      if (!existingWord) {
        wordsToInsert.push({ title: formatedWord })
      }
    }

    if (wordsToInsert.length > 0) {
      res.status(201).json({ msg: "Words inserted successfully", words: wordsToInsert })
    } else {
      res.status(200).json({ msg: "No new words to insert" })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Failed to insert words" })
  }
}
