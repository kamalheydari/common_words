import db from "@/lib/db"
import Word from "@/models/Word"

export default async function handler(req, res) {
  try {
    await db.connect()

    const { words, category } = req.body

    if (!words || !category) {
      return res.status(400).json({ error: "Words and category are required" })
    }

    const wordsToInsert = []

    for (const word of words) {
      const formatedWord = word.trim()
      const existingWord = await Word.findOne({ title: { $regex: formatedWord, $options: "i" } })
      if (!existingWord) {
        wordsToInsert.push({ title: formatedWord, category })
      }
    }

    if (wordsToInsert.length > 0) {
      await Word.insertMany(wordsToInsert)
      res.status(201).json({ msg: "Words inserted successfully" })
    } else {
      res.status(200).json({ msg: "No new words to insert" })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Failed to insert words" })
  }
}
