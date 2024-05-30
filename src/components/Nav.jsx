import Link from "next/link"
import { useRouter } from "next/router"

const Nav = () => {
  const router = useRouter()

  return (
    <nav className='flex justify-center space-x-6 mx-auto w-full h-full bg-gray-900 py-6 text-white'>
      <Link
        className={`bg-gray-800 hover:bg-gray-700 text-white p-2 rounded font-bold shadow-md transition duration-300 ease-in-out ${
          router.pathname === "/category/create" ? "bg-gray-700" : ""
        }`}
        href={"/category/create"}
      >
        Create category
      </Link>
      <Link
        className={`bg-gray-800 hover:bg-gray-700 text-white p-2 rounded font-bold shadow-md transition duration-300 ease-in-out ${
          router.pathname === "/category" ? "bg-gray-700" : ""
        }`}
        href={"/category"}
      >
        Categories
      </Link>
      <Link
        className={`bg-gray-800 hover:bg-gray-700 text-white p-2 rounded font-bold shadow-md transition duration-300 ease-in-out ${
          router.pathname === "/check" ? "bg-gray-700" : ""
        }`}
        href={"/check"}
      >
        Check
      </Link>
      <Link
        className={`bg-gray-800 hover:bg-gray-700 text-white p-2 rounded font-bold shadow-md transition duration-300 ease-in-out ${
          router.pathname === "/check" ? "bg-gray-700" : ""
        }`}
        href={"/common_words"}
      >
        Common Words
      </Link>
    </nav>
  )
}

export default Nav
