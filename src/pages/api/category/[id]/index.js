import db from "@/lib/db"

import Word from "@/models/Word"
import Category from "@/models/Category"

const handler = async (req, res) => {
  switch (req.method) {
    // case 'GET':
    //   await getCategory(req, res)
    //   break

    // case 'PUT':
    //   await updateCategory(req, res)
    //   break

    case "DELETE":
      await deleteCategory(req, res)
      break

    default:
      break
  }
}

const deleteCategory = async (req, res) => {
  try {
    await db.connect()
    const { id } = req.query
    console.log(id)
    await Category.findByIdAndDelete(id)
    await Word.deleteMany({ category: id })
    res.status(200).json({ msg: "category deleted" })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Failed to delete category" })
  }
}

export default handler
