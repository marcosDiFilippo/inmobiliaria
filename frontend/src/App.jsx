import { useEffect, useState } from "react"
import { Footer } from "./components/Footer/Footer.jsx"
import { Header } from "./components/Header/Header.jsx"
import { NotFound } from "./pages/NotFound/NotFound.jsx"
import { Login } from "./pages/Login/Login.jsx"
import { Home } from "./pages/Home/Home.jsx"
import { Departament } from "./pages/Departament/Departament.jsx"
import { Tenant } from "./pages/Tenant/Tenant.jsx"

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname)

  console.log(currentPath)

  let page = <></>
  
  if (currentPath == "/") {
    page = <Login setCurrentPath={setCurrentPath}></Login>
  }
  else if (currentPath.includes("/Home")) {
    page = <Home></Home>
  }
  else if (currentPath.includes("/Departament")) {
    page = <Departament></Departament>
  }
  else if (currentPath.includes("/Tenant")) {
    page = <Tenant></Tenant>
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