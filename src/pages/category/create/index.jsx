import Head from "next/head"
import { useState } from "react"
import { toast } from "react-toastify"

const HomePage = () => {
  // states
  const [category, setCategory] = useState("")

  // handlers
  const handleAddCategory = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch("/api/category", {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({ title: category }),
      })

      if (!response.ok) {
        toast.error(`Error fetching data: ${response.status}`)
        throw new Error(`Error fetching data: ${response.status}`)
      } else {
        setCategory("")
      }

      const data = await response.json()

      toast.success(data.msg)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <Head>
        <title>Create Category</title>
      </Head>
      <main className={`flex min-h-screen flex-col items-center justify-between p-24 bg-gray-900 text-white`}>
        <div className='w-full items-center justify-between font-mono text-sm'>
          <div>
            <form onSubmit={handleAddCategory} className='flex gap-4'>
              <input
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                type='text'
                placeholder='Category Name'
                className='bg-gray-800 text-white p-2 rounded shadow-md w-full'
              />
              <button
                type='submit'
                className='bg-blue-700 hover:bg-blue-600 text-white p-2 rounded font-bold shadow-md transition duration-300 ease-in-out text-nowrap'
                disabled={category.length === 0}
              >
                Add Category
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  )
}

export default HomePage
