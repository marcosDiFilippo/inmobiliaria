import { useEffect, useState } from "react"
import { Header } from "./components/Header/Header.jsx"
import { Login } from "./pages/Login/Login.jsx"
import { Home } from "./pages/Home/Home.jsx"
import { Departament } from "./pages/Departament/Departament.jsx"
import { Tenant } from "./pages/Tenant/Tenant.jsx"
import { Link } from "./router/Link/Link.jsx"
import { Route } from "./router/Route.jsx"

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname)
  const [session, setSession] = useState("")
  const [statusCode, setStatusCode] = useState(0)
  const [links, setLinks] = useState(<></>)

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
      })
  }, [statusCode, currentPath])

  useEffect(() => {
    function handlePathChange () {
      setCurrentPath(window.location.pathname)
    }

    window.addEventListener("popstate", handlePathChange)

    return () => {
      window.removeEventListener("popstate", handlePathChange)
    }
  }, [])

  return (
    <>
      <Header setCurrentPath={setCurrentPath} currentPath={currentPath} statusCode={statusCode} links={links}>
      </Header>
        <Route path={"/Login"} component={Login} setCurrentPath={setCurrentPath} setSession={setSession}></Route>
        <Route path={"/Home"} component={Home}></Route>
        <Route path={"/Departament"} component={Departament}></Route>
        <Route path={"/Tenant"} component={Tenant}></Route>
    </>
  )
}

export default App