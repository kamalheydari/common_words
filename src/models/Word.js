import mongoose, { Schema, models } from "mongoose"

const wordSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: { index: true, collation: { locale: "en", strength: 2 } } },
    category: {
      type: Schema.Types.ObjectId,
      ref: "category",
    },
  },
  {
    timestamps: true,
  }
)

const Word = models.word || mongoose.model("word", wordSchema)
export default Word
