import { useEffect, useState } from "react"
import { Footer } from "./components/Footer/Footer.jsx"
import { Header } from "./components/Header/Header.jsx"
import { Login } from "./pages/Login/Login.jsx"
import { Home } from "./pages/Home/Home.jsx"

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname)
  const [session, setSession] = useState("")
  const [page, setPage] = useState(<></>)
  const [statusCode, setStatusCode] = useState(0)

  console.log(statusCode)

  useEffect(() => {
    fetch("http://localhost/inmobiliaria/backend/auth/Session.php", { credentials: "include" })
      .then(res => {
        setStatusCode(res.status)
        if (currentPath.includes("/Login")) { 
          setPage(<Login setCurrentPath={setCurrentPath} setSession={setSession}></Login>)
        }
        else if (currentPath.includes("/Home") && statusCode == 200) {
          setPage(<Home></Home>)
        }
        else {
          setPage(<Login setCurrentPath={setCurrentPath} setSession={setSession}></Login>)
        }
      })
  }, [statusCode, window.location.pathname])

  return (
    <>
      <Header setCurrentPath={setCurrentPath} currentPath={currentPath} statusCode={statusCode}></Header>
        {page}
      <Footer></Footer>
    </>
  )
}

export default App