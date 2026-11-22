import AgendaLoc from "./layout/Agendamento/AgendLoc.tsx"
import Avaliacoes from "./layout/Avaliacoes/Avaliacoes.tsx"
import Hero from "./layout/Hero/Hero"
import Navbar from "./layout/Navbar/Navbar"
import PlanosCard from "./layout/Planos/Planos.tsx"
import Servicos from "./layout/Servicos/Servicos"
import About from "./layout/Sobre/Sobre.tsx"

function App() {

  return (
    <>
     <Navbar />
     <Hero />
     <Servicos />
     <About />
     <PlanosCard />
     <Avaliacoes />
     <AgendaLoc />
    </>
  )
}

export default App
