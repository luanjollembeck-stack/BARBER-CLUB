
import CardServico from "../../components/servicosCard/ServicosCard";
import CorteCabelo from "../../assets/corte de cabelo.png"
import CorteBarba from "../../assets/barba.png"
import CorteSobrancelha from "../../assets/sobrancelha.png"
import PinturaCabelo from "../../assets/pintura.png"

const servicos = [
  {
    nome: "Corte de cabelo",
    descricao: "Cortes modernos, degradê e acabamento profissional.",
    preco: "R$ 45,00",
    imagem: CorteCabelo,
  },
  {
    nome: "Barba",
    descricao: "Modelagem, alinhamento e toalha quente.",
    preco: "R$ 30,00",
    imagem: CorteBarba,
  },
  {
    nome: "Sobrancelha",
    descricao: "Design e acabamento para valorizar seu olhar.",
    preco: "R$ 15,00",
    imagem: CorteSobrancelha,
  },
  {
    nome: "Pintura de cabelo",
    descricao: "Coloração e transformação do seu visual.",
    preco: "R$ 60,00",
    imagem: PinturaCabelo,
  },
];

export default function Servicos() {
  return (
    <section
      id="servicos"
      className="bg-[#111111] px-6 py-24"
    >
      <div className="mx-auto max-w-7xl">

        {/* Cabeçalho */}
        <div className="mb-14 text-center">

          <span className="text-sm font-semibold tracking-[0.3em] text-[#C6A15B]">
            NOSSOS SERVIÇOS
          </span>

          <h2 className="mt-4 text-4xl font-bold text-white md:text-5xl">
            CUIDADO EM CADA DETALHE
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-gray-400">
            Oferecemos serviços exclusivos para você
            renovar seu estilo e elevar sua autoestima.
          </p>

        </div>

        {/* Cards dos serviços */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">

          {servicos.map((servico) => (
            <CardServico
              key={servico.nome}
              nome={servico.nome}
              descricao={servico.descricao}
              preco={servico.preco}
              imagem={servico.imagem}
            />
          ))}

        </div>

      </div>
    </section>
  );
}
