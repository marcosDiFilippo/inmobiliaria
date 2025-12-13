import { useEffect, useState } from "react"
import { Footer } from "./components/Footer/Footer.jsx"
import { Header } from "./components/Header/Header.jsx"
import { NotFound } from "./pages/NotFound/NotFound.jsx"
import { Login } from "./pages/Login/Login.jsx"
import { Home } from "./pages/Home/Home.jsx"

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname)

  useEffect(() => {
    setCurrentPath(window.location.pathname)
  }, [currentPath])

  let page = <></>

  if (currentPath.includes("/Login")) {
    page = <Login></Login>
  }
  else if (currentPath.includes("/Home")) {
    page = <Home></Home>
  }
  else {
    page = <NotFound></NotFound>
  }

  return (
    <>
      <Header></Header>
        {page}
      <Footer></Footer>
    </>
  )
}

export default App
