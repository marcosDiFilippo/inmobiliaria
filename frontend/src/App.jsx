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
import { DepartamentDetails } from "./pages/DepartamentDetails/DepartamentDetails.jsx"
import { Operation } from "./pages/Operation/Operation.jsx"
import { TenantEdit } from "./pages/TenantEdit/TenantEdit.jsx"
import styles from "./css/App.module.css"

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
        <main>
          <Route path={"/Login"} component={Login} navigateTo={navigateTo} currentPath={currentPath} setCurrentPath={setCurrentPath} setSession={setSession}></Route>
          <Route path={"/Home"} currentPath={currentPath} component={Home}></Route>
          <Route path={"/Departament"} currentPath={currentPath} component={Departament} navigateTo={navigateTo}></Route>
          <Route path={"/Tenant"} currentPath={currentPath} component={Tenant} navigateTo={navigateTo}></Route>
          <Route path={"/DepartamentDetails"} currentPath={currentPath} component={DepartamentDetails}></Route>
          <Route path={"/Operation"} currentPath={currentPath} component={Operation}></Route>
          <Route path={"/Tenant/Edit/:id"} currentPath={currentPath} component={TenantEdit}></Route>
        </main>
    </>
  )
}

export default App