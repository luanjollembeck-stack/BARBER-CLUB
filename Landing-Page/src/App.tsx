import AgendaLoc from "./layout/Agendamento/AgendLoc/AgendLoc.tsx"
import Avaliacoes from "./layout/Avaliacoes/Avaliacoes.tsx"
import Hero from "./layout/Hero/Hero"
import Navbar from "./layout/Navbar/Navbar"
import Servicos from "./layout/Servicos/Servicos"
import About from "./layout/Sobre/Sobre.tsx"

function App() {

  return (
    <>
     <Navbar />
     <Hero />
     <Servicos />
     <About />
     <Avaliacoes />
     <AgendaLoc />
    </>
  )
}

export default App
