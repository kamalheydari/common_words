import Head from "next/head"
import { useState } from "react"
import { toast } from "react-toastify"

const CategoryPage = (props) => {
  // states
  const [words, setWords] = useState("")
  const [checkedWords, setCheckedWords] = useState([])
  const [mode, setMode] = useState("")

  // handlers
  const handleAddWords = async (e) => {
    e.preventDefault()

    const arr = words.split(",")
    const capitalizedArr = arr.map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)

    try {
      const response = await fetch("/api/check", {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({ words: capitalizedArr }),
      })

      if (!response.ok) {
        toast.error(`Error fetching data: ${response.status}`)
        throw new Error(`Error fetching data: ${response.status}`)
      } else {
        const data = await response.json()
        setCheckedWords(data.words)
        toast.success(data.msg)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <Head>
        <title>Check Words</title>
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
              Check Words
            </button>
          </form>
          <p className='bg-gray-950/40 p-2 rounded shadow'>
            <span className='font-bold'>Words length: </span> {checkedWords.length > 0 && checkedWords.length}
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
              <p className='text-gray-400 text-xl break-words capitalize'>{checkedWords?.length > 0 && checkedWords.map((item) => item.title + ",")}</p>
            ) : (
              checkedWords?.length > 0 &&
              checkedWords.map((item, i) => (
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
