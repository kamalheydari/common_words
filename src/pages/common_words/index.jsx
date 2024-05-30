import { useState } from "react"
import _ from "lodash"
import Head from "next/head"

const removePunctuations = /[\.\,\:\;\!?\-()\{\}\[\]\/*\+=\<>\|\@]/g

const pronouns = [
  // Personal Pronouns
  "I",
  "you",
  "he",
  "she",
  "it",
  "we",
  "they",

  // Possessive Pronouns
  "mine",
  "yours",
  "his",
  "hers",
  "its",
  "ours",
  "theirs",

  // Reflexive Pronouns
  "myself",
  "yourself",
  "himself",
  "herself",
  "itself",
  "ourselves",
  "themselves",

  // Demonstrative Pronouns
  "this",
  "that",
  "these",
  "those",

  // Interrogative Pronouns
  "who",
  "what",
  "which",
  "whom",
  "whose",

  // Indefinite Pronouns
  "all",
  "another",
  "any",
  "anybody",
  "anyone",
  "anything",
  "both",
  "each",
  "few",
  "many",
  "much",
  "neither",
  "nobody",
  "none",
  "one",
  "other",
  "others",
  "some",
  "somebody",
  "someone",
  "something",

  // Reciprocal Pronouns
  "each other",
  "one another",

  // Distributive Pronouns
  "each",
  "every",

  // Impersonal Pronouns
  "it",
]
const otherWordsToBeRemoved = [...pronouns]
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
  ...otherWordsToBeRemoved,
]

const CommonWordsPage = () => {
  // states
  const [text, setText] = useState("")
  const [commonWords, setCommonWords] = useState([])

  // handlers
  const handleAddWords = async (e) => {
    e.preventDefault()
    const cleanedText = text.replace(removePunctuations, "")
    const words = cleanedText.toLowerCase().split(" ")
    const wordFrequency = _.countBy(words)
    const sortedWords = Object.entries(wordFrequency).sort((a, b) => b[1] - a[1])
    setCommonWords(sortedWords)
  }

  return (
    <>
      <Head>
        <title>Common Words</title>
      </Head>
      <main className='flex min-h-screen flex-col items-center justify-between p-24 bg-gray-900 text-white'>
        <div className='w-full items-center justify-between font-mono text-sm space-y-6'>
          <form onSubmit={handleAddWords} className='flex gap-4'>
            <textarea
              placeholder='word1,word2'
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
