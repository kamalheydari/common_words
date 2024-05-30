import db from "@/lib/db"
import Category from "@/models/Category"
import Head from "next/head"
import Link from "next/link"

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

  return (
    <>
      <Head>
        <title>Categories</title>
      </Head>
      <main className='flex min-h-screen flex-col items-center justify-between p-24 bg-gray-900 text-white'>
        <div className='w-full items-center justify-between font-mono text-sm'>
          <div className='flex flex-col gap-4'>
            {categories.map((item) => (
              <Link
                key={item._id}
                href={"/category/" + item._id}
                className='border-2 border-blue-700 hover:border-blue-900 text-white p-2 rounded font-bold shadow-md transition duration-300 ease-in-out text-nowrap'
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  )
}

export default CategoriesPage
