import { useRouter } from "next/router"
import db from "@/lib/db"
import Category from "@/models/Category"
import Head from "next/head"
import Link from "next/link"
import { toast } from "react-toastify"

export const getServerSideProps = async () => {
  await db.connect()

  const categories = await Category.find({})

  return {
    props: {
      categories: JSON.parse(JSON.stringify(categories)),
    },
  }
}

const CategoriesPage = (props) => {
  const { categories } = props
  const { reload } = useRouter()

  // Handlers
  const handleDelete = async (id) => {
    const deleteResult = confirm("Are you sure you want to delete this item?")
    console.log(deleteResult)
    if (deleteResult) {
      try {
        const response = await fetch("/api/category/" + id, {
          method: "DELETE",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
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
  }
  return (
    <>
      <Head>
        <title>Categories</title>
      </Head>
      <main className='flex min-h-screen flex-col items-center justify-between p-24 bg-gray-900 text-white'>
        <div className='w-full items-center justify-between font-mono text-sm'>
          <div className='flex flex-col gap-4'>
            {categories.map((item) => (
              <div key={item._id} className='flex gap-2'>
                <Link
                  href={"/category/" + item._id}
                  className='border-2 border-blue-700 hover:border-blue-900 text-white p-2 rounded font-bold block w-full shadow-md transition duration-300 ease-in-out text-nowrap'
                >
                  {item.title}
                </Link>
                <button
                  onClick={() => handleDelete(item._id)}
                  className='border-2 border-red-700 hover:border-red-900 text-red-700 p-2 rounded font-bold shadow-md transition duration-300 ease-in-out text-nowrap'
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  )
}

export default CategoriesPage
