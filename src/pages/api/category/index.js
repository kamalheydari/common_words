import db from "@/lib/db"
import Category from "@/models/Category"

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      await addCategory(req, res)
      break

    case "GET":
      await getCategories(req, res)
      break

    default:
      break
  }
}

const addCategory = async (req, res) => {
  try {
    await db.connect()

    const newCategory = await new Category({ ...req.body })
    await newCategory.save()

    res.status(201).json({ msg: "New category created", newCategory })
  } catch (error) {
    res.status(400).json(error.message)
  }
}
const getCategories = async (req, res) => {
  try {
    await db.connect()

    const categories = await Category.find()

    res.status(20).json({ categories })
  } catch (error) {
    res.status(400).json(error.message)
  }
}
