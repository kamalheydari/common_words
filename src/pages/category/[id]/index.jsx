import { useRouter } from "next/router"
import db from "@/lib/db"
import { useState } from "react"
import { toast } from "react-toastify"
import Word from "@/models/Word"
import Head from "next/head"

export const getServerSideProps = async ({ params }) => {
  await db.connect()
  const filteredWords = await Word.find({ category: params.id })
  const wordsLength = await Word.find({ category: params.id }).countDocuments()
  return {
    props: {
      filteredWords: JSON.parse(JSON.stringify(filteredWords)),
      wordsLength,
    },
  }
}

const CategoryPage = (props) => {
  const { filteredWords, wordsLength } = props
  // states
  const [words, setWords] = useState("")
  const [mode, setMode] = useState("")

  const { query, reload } = useRouter()

  // handlers
  const handleAddWords = async (e) => {
    e.preventDefault()

    const arr = words.split(",")
    const capitalizedArr = arr.map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)

    try {
      const response = await fetch("/api/words", {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({ words: capitalizedArr, category: query.id }),
      })

      if (!response.ok) {
        toast.error(`Error fetching data: ${response.status}`)
        throw new Error(`Error fetching data: ${response.status}`)
      } else {
        const data = await response.json()
        toast.success(data.msg)
        setTimeout(() => {
          reload()
        }, 2000)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <Head>
        <title>Single Category</title>
      </Head>
      <main className='flex min-h-screen flex-col items-center justify-between p-24 bg-gray-900 text-white'>
        <div className='w-full items-center justify-between font-mono text-sm space-y-6'>
          <form onSubmit={handleAddWords} className='flex gap-4'>
            <input
              type='text'
              placeholder='word1,word2'
              value={words}
              onChange={(e) => setWords(e.target.value)}
              className='bg-gray-800 text-white p-2 rounded shadow-md w-full'
            />
            <button
              type='submit'
              className='bg-blue-700 hover:bg-blue-600 text-white p-2 rounded font-bold shadow-md transition duration-300 ease-in-out text-nowrap'
              disabled={words.length === 0}
            >
              Add Words
            </button>
          </form>
          <p className='bg-gray-950/40 p-2 rounded shadow'>
            <span className='font-bold'>Words length: </span> {wordsLength}
          </p>
          <div className='space-x-4'>
            <button className='bg-rose-200 text-rose-900 p-1.5 rounded shadow' onClick={() => setMode("line")}>
              Line
            </button>
            <button className='bg-rose-200 text-rose-900 p-1.5 rounded shadow' onClick={() => setMode("paragraph")}>
              Paragraph
            </button>
          </div>
          <div className='mt-10'>
            {mode === "paragraph" ? (
              <p className='text-gray-400 text-xl break-words capitalize'>{filteredWords?.length > 0 && filteredWords.map((item) => item.title + ",")}</p>
            ) : (
              filteredWords?.length > 0 &&
              filteredWords.map((item, i) => (
                <div className='text-gray-400 text-xl break-words capitalize' key={i}>
                  {item.title + ","}
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </>
  )
}

export default CategoryPage
