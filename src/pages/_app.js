import Nav from "@/components/Nav"
import "@/styles/globals.css"

import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export default function App({ Component, pageProps }) {
  return (
    <>
      <Nav />
      <Component {...pageProps} />
      <ToastContainer />
    </>
  )
}
