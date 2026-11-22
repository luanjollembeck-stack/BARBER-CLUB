
import CardAvaliacao from "../../components/avaliacoesCard/AvaliacoesCard";

const avaliacoes = [
  {
    nome: "Lucas Mendes",
    avaliacao: "5",
    comentario:
      "Excelente atendimento! O corte ficou exatamente como eu queria. Ambiente muito confortável.",
  },
  {
    nome: "Gabriel Oliveira",
    avaliacao: "5",
    comentario:
      "Profissionais muito atenciosos e cuidadosos. Com certeza voltarei mais vezes!",
  },
  {
    nome: "Matheus Costa",
    avaliacao: "5",
    comentario:
      "Melhor barbearia da região. Serviço de qualidade e preço justo.",
  },
  {
    nome: "Pedro Henrique",
    avaliacao: "5",
    comentario:
      "Fiz o corte e a barba. Gostei muito do resultado e da experiência.",
  },
  {
    nome: "Rafael Santos",
    avaliacao: "5",
    comentario:
      "Ambiente moderno, atendimento excelente e profissionais muito capacitados.",
  },
  {
    nome: "Felipe Almeida",
    avaliacao: "5",
    comentario:
      "Ótima experiência! Atendimento de primeira e acabamento impecável.",
  },
];

export default function Avaliacoes() {
  return (
    <section
      id="avaliacoes"
      className="bg-[#111111] px-6 py-24"
    >
      <div className="mx-auto max-w-7xl">

        {/* Cabeçalho */}
        <div className="mb-14 text-center">

          <span className="text-sm font-semibold tracking-[0.3em] text-[#C6A15B]">
            DEPOIMENTOS
          </span>

          <h2 className="mt-4 text-4xl font-bold text-white md:text-5xl">
            O QUE NOSSOS CLIENTES DIZEM
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-gray-400">
            A satisfação dos nossos clientes é o que
            nos motiva a oferecer sempre o melhor.
          </p>

        </div>

        {/* Grid de avaliações */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

          {avaliacoes.map((item) => (
            <CardAvaliacao
              key={item.nome}
              nome={item.nome}
              avaliacao={item.avaliacao}
              comentario={item.comentario}
            />
          ))}

        </div>

      </div>
    </section>
  );
}
