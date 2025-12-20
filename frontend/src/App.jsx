import { useEffect } from "react"
import { Header } from "./components/Header/Header.jsx"
import { Login } from "./pages/Login/Login.jsx"
import { Home } from "./pages/Home/Home.jsx"
import { Departament } from "./pages/Departament/Departament.jsx"
import { Tenant } from "./pages/Tenant/Tenant.jsx"
import { Route } from "./router/Route.jsx"
import { useCurrentPath } from "./hooks/useCurrentPath.jsx"
import { useLinks } from "./hooks/useLinks.jsx"
import { useSession } from "./hooks/useSession.jsx"

function App() {
  const { currentPath, setCurrentPath } = useCurrentPath()
  const { session, setSession } = useSession()
  const { links, statusCode, changePath, verificateStatusCode, navigateTo } = useLinks()

  useEffect(() => {
    verificateStatusCode()
  }, [statusCode, currentPath])

  useEffect(() => {
    changePath(setCurrentPath)
  }, [])

  return (
    <>
      <Header setCurrentPath={setCurrentPath} currentPath={currentPath} statusCode={statusCode} links={links} navigateTo={navigateTo}></Header>
        <Route path={"/Login"} component={Login} navigateTo={navigateTo} currentPath={currentPath} setCurrentPath={setCurrentPath} setSession={setSession}></Route>
        <Route path={"/Home"} currentPath={currentPath} component={Home}></Route>
        <Route path={"/Departament"} currentPath={currentPath} component={Departament}></Route>
        <Route path={"/Tenant"} currentPath={currentPath} component={Tenant}></Route>
    </>
  )
}

export default App