import { useEffect, useState } from "react"
import { Header } from "./components/Header/Header.jsx"
import { Login } from "./pages/Login/Login.jsx"
import { Home } from "./pages/Home/Home.jsx"
import { Departament } from "./pages/Departament/Departament.jsx"
import { Tenant } from "./pages/Tenant/Tenant.jsx"
import { Link } from "./router/Link/Link.jsx"
import styles from "./css/App.module.css"

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname)
  const [session, setSession] = useState("")
  const [page, setPage] = useState(<></>)
  const [statusCode, setStatusCode] = useState(0)
  const [links, setLinks] = useState(<></>)

  console.log(statusCode)

  useEffect(() => {
    fetch("http://localhost/inmobiliaria/backend/auth/Session.php", { credentials: "include" })
      .then(res => {
        setStatusCode(res.status)
        if (statusCode == 200) {
          setLinks(<><Link href={"/Tenant"} text={"Inquilinos"}></Link>
                <Link href={"/Departament"} text={"Departamentos"}></Link></>)
        }
        else {
          setLinks(<></>)
        }
        if (currentPath.includes("/Login")) { 
          setPage(<Login setCurrentPath={setCurrentPath} setSession={setSession}></Login>)
        }
        else if (currentPath.includes("/Home") && statusCode == 200) {
          setPage(<Home></Home>)
        }
        else if (currentPath.includes("/Departament") && statusCode == 200) {
          setPage(<Departament></Departament>)
        }
        else if (currentPath.includes("/Tenant") && statusCode == 200) {
          setPage(<Tenant></Tenant>)
        }
        else {
          setPage(<Login setCurrentPath={setCurrentPath} setSession={setSession}></Login>)
        }
      })
  }, [statusCode, window.location.pathname])

  return (
    <div className={styles.dashboard}>
      <Header setCurrentPath={setCurrentPath} currentPath={currentPath} statusCode={statusCode} links={links}></Header>
        {page}
    </div>
  )
}

export default App