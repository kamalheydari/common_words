import { useState } from "react"
import _ from "lodash"
import Head from "next/head"

const removePunctuations = /[\.\,\:\;\!?\-()\{\}\[\]\/*\+=\<>\|\@]/g
const stopWords = [
  "a",
  "an",
  "and",
  "are",
  "as",
  "at",
  "be",
  "but",
  "by",
  "for",
  "from",
  "how",
  "i",
  "in",
  "into",
  "is",
  "it",
  "its",
  "just",
  "least",
  "let",
  "most",
  "not",
  "of",
  "on",
  "or",
  "such",
  "that",
  "the",
  "their",
  "then",
  "there",
  "they",
  "this",
  "to",
  "was",
  "will",
  "with",
]

const CommonWordsPage = () => {
  // states
  const [text, setText] = useState("")
  const [commonWords, setCommonWords] = useState([])
  const [isShow, setIsShow] = useState(true)
  const [minCount, setMinCount] = useState(5)

  // handlers
  const handleAddWords = async (e) => {
    e.preventDefault()
    const cleanedText = text.replace(removePunctuations, "")
    const words = cleanedText.toLowerCase().split(" ")
    const wordFrequency = _.countBy(words)
    const sortedWords = Object.entries(wordFrequency).sort((a, b) => b[1] - a[1])
    const filteredSortedWords = sortedWords.filter(([_, count]) => count >= minCount)

    setCommonWords(filteredSortedWords)
    setText("")
    setIsShow(false)
  }

  return (
    <>
      <Head>
        <title>Common Words</title>
      </Head>
      <main className='flex min-h-screen flex-col items-center justify-between p-24 bg-gray-900 text-white'>
        <div className='w-full items-center justify-between font-mono text-sm space-y-6'>
          {isShow && (
            <form onSubmit={handleAddWords} className='flex flex-col gap-4'>
              <input
                type='number'
                placeholder='Minimum count'
                value={minCount}
                onChange={(e) => setMinCount(parseInt(e.target.value))}
                className='bg-gray-800 text-white p-2 rounded shadow-md'
              />
              <textarea
                placeholder='Your text'
                value={text}
                onChange={(e) => setText(e.target.value)}
                className='bg-gray-800 text-white p-2 rounded shadow-md w-full h-56'
              />
              <button
                type='submit'
                className='bg-blue-700 hover:bg-blue-600 h-12 text-white p-2 rounded font-bold shadow-md transition duration-300 ease-in-out text-nowrap'
                disabled={text.length === 0}
              >
                Submit
              </button>
            </form>
          )}

          <ul>
            {commonWords.map(([word, count]) => {
              const existWord = stopWords.find((stopword) => stopword === word)
              if (existWord) {
                return
              } else {
                return (
                  <li key={word} className='text-gray-400 text-xl break-words capitalize'>
                    {word}, {count}
                  </li>
                )
              }
            })}
          </ul>
        </div>
      </main>
    </>
  )
}

export default CommonWordsPage
