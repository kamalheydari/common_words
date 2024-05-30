import mongoose, { models } from "mongoose"

const categorySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
  },
  {
    timestamps: true,
  }
)

const Category = models.category || mongoose.model("category", categorySchema)

export default Category
