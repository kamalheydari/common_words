import { useState } from "react"
import _ from "lodash"
import Head from "next/head"

// Contraction mappings
const contractions = {
  "ain't": "is not",
  "aren't": "are not",
  "can't": "cannot",
  "couldn't": "could not",
  "didn't": "did not",
  "doesn't": "does not",
  "don't": "do not",
  "hadn't": "had not",
  "hasn't": "has not",
  "haven't": "have not",
  "he'd": "he would",
  "he'll": "he will",
  "he's": "he is",
  "i'd": "i would",
  "i'll": "i will",
  "i'm": "i am",
  "i've": "i have",
  "isn't": "is not",
  "it's": "it is",
  "let's": "let us",
  "mustn't": "must not",
  "shan't": "shall not",
  "she'd": "she would",
  "she'll": "she will",
  "she's": "she is",
  "shouldn't": "should not",
  "that's": "that is",
  "there's": "there is",
  "they'd": "they would",
  "they'll": "they will",
  "they're": "they are",
  "they've": "they have",
  "we'd": "we would",
  "we're": "we are",
  "we've": "we have",
  "weren't": "were not",
  "what'll": "what will",
  "what're": "what are",
  "what's": "what is",
  "what've": "what have",
  "where's": "where is",
  "who'd": "who would",
  "who'll": "who will",
  "who're": "who are",
  "who's": "who is",
  "who've": "who have",
  "won't": "will not",
  "wouldn't": "would not",
  "you'd": "you would",
  "you'll": "you will",
  "you're": "you are",
  "you've": "you have"
}

// Text cleaning patterns
const textCleaner = {
  // Basic punctuation
  basic: /[\.\,\:\;\!?\-\(\)\{\}\[\]\/*\+=\<\>\|\@]/g,
  
  // Extended punctuation and special characters
  extended: /[""''„""‹›«»¿¡—–´`]/g,
  
  // Numbers
  numbers: /\d+/g,
  
  // Special characters
  specialChars: /[^\w\s-']/g,
  
  // Multiple spaces and line breaks
  spaces: /\s+/g,
  
  // HTML entities
  htmlEntities: /&[a-zA-Z]+;/g,
  
  // Unicode punctuation
  unicode: /[\u2000-\u206F\u2E00-\u2E7F\u3000-\u303F]/g
}

const stopWords = [
  "a", "an", "and", "are", "as", "at", "be", "but", "by",
  "for", "from", "how", "i", "in", "into", "is", "it", "its",
  "just", "least", "let", "most", "not", "of", "on", "or",
  "such", "that", "the", "their", "then", "there", "they",
  "this", "to", "was", "will", "with"
]

// Function to expand contractions
const expandContractions = (text) => {
  return text.toLowerCase().split(' ').map(word => {
    return contractions[word] || word;
  }).join(' ');
}

const CommonWordsPage = () => {
  // States
  const [text, setText] = useState("")
  const [commonWords, setCommonWords] = useState([])
  const [isShow, setIsShow] = useState(true)
  const [minCount, setMinCount] = useState(10)
  const [options, setOptions] = useState({
    includeNumbers: false,
    includeSpecialChars: false,
    expandContractions: true,
    caseSensitive: false
  })

  // Clean text based on options
  const cleanText = (text, options) => {
    let processedText = options.caseSensitive ? text : text.toLowerCase()

    // Handle contractions if option is enabled
    if (options.expandContractions) {
      processedText = expandContractions(processedText)
    }

    // Remove numbers if option is disabled
    if (!options.includeNumbers) {
      processedText = processedText.replace(textCleaner.numbers, '')
    }

    // Remove special characters if option is disabled
    if (!options.includeSpecialChars) {
      processedText = processedText.replace(textCleaner.specialChars, '')
    }

    // Clean remaining text
    return processedText
      .replace(textCleaner.htmlEntities, ' ')
      .replace(textCleaner.extended, ' ')
      .replace(textCleaner.basic, ' ')
      .replace(textCleaner.unicode, ' ')
      .replace(textCleaner.spaces, ' ')
      .trim()
  }

  // Handlers
  const handleAddWords = async (e) => {
    e.preventDefault()
    
    const cleanedText = cleanText(text, options)
    const words = cleanedText.split(" ").filter(word => word.length > 0)
    const wordFrequency = _.countBy(words)
    const sortedWords = Object.entries(wordFrequency).sort((a, b) => b[1] - a[1])
    const filteredSortedWords = sortedWords.filter(([_, count]) => count >= minCount)

    setCommonWords(filteredSortedWords)
    setText("")
    setIsShow(false)
  }

  const handleOptionChange = (optionName) => {
    setOptions(prev => ({
      ...prev,
      [optionName]: !prev[optionName]
    }))
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
              <div className="flex flex-col gap-2 bg-gray-800 p-4 rounded">
                <h3 className="text-lg font-bold mb-2">Processing Options</h3>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={options.includeNumbers}
                    onChange={() => handleOptionChange('includeNumbers')}
                    className="form-checkbox h-4 w-4"
                  />
                  <span>Include Numbers</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={options.includeSpecialChars}
                    onChange={() => handleOptionChange('includeSpecialChars')}
                    className="form-checkbox h-4 w-4"
                  />
                  <span>Include Special Characters</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={options.expandContractions}
                    onChange={() => handleOptionChange('expandContractions')}
                    className="form-checkbox h-4 w-4"
                  />
                  <span>Expand Contractions</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={options.caseSensitive}
                    onChange={() => handleOptionChange('caseSensitive')}
                    className="form-checkbox h-4 w-4"
                  />
                  <span>Case Sensitive</span>
                </label>
              </div>
              
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
                return null
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