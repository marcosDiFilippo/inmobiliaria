import { useEffect, useState } from "react"
import { Header } from "./components/Header/Header.jsx"
import { Login } from "./pages/Login/Login.jsx"
import { Home } from "./pages/Home/Home.jsx"
import { Departament } from "./pages/Departament/Departament.jsx"
import { Tenant } from "./pages/Tenant/Tenant.jsx"
import { Route } from "./router/Route.jsx"
import { useCurrentPath } from "./hooks/useCurrentPath.jsx"
import { useLinks } from "./hooks/useLinks.jsx"

function App() {
  const { currentPath, setCurrentPath } = useCurrentPath()
  const [session, setSession] = useState("")
  const { links, statusCode, verificateStatusCode, changePath } = useLinks()

  console.log(currentPath)

  useEffect(() => {
    verificateStatusCode()
  }, [statusCode, currentPath])

  useEffect(() => {
    changePath()
  }, [])

  return (
    <>
      <Header setCurrentPath={setCurrentPath} currentPath={currentPath} statusCode={statusCode} links={links}></Header>
        <Route path={"/Login"} component={Login} setCurrentPath={setCurrentPath} setSession={setSession}></Route>
        <Route path={"/Home"} component={Home}></Route>
        <Route path={"/Departament"} component={Departament}></Route>
        <Route path={"/Tenant"} component={Tenant}></Route>
    </>
  )
}

export default App