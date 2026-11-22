
import CardPlanos from "../../components/planosCard/PlanosCard";

export default function PlanosCard() {
  return (
    <section
      id="planos"
      className="bg-[#111111] px-6 py-24"
    >
      <div className="mx-auto max-w-7xl">

        {/* Título da seção */}
        <div className="mb-16 text-center">

          <span className="text-sm font-semibold uppercase tracking-[0.3em] text-[#C6A15B]">
            Assinaturas Barber Club
          </span>

          <h2 className="mt-4 text-3xl font-bold text-white md:text-5xl">
            SEU ESTILO,
            <span className="text-[#C6A15B]">
              {" "}SEMPRE EM DIA.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-gray-400">
            Escolha seu plano e aproveite vantagens exclusivas
            para cuidar do seu visual durante todo o ano.
          </p>

        </div>

        {/* Cards dos planos */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">

          <CardPlanos
            nome="Mensal"
            preco="R$ 79,90"
            periodo="/ mês"
            descricao="Ideal para manter o visual sempre em dia."
            beneficios={[
              "2 cortes de cabelo por mês",
              "10% de desconto em produtos",
              "Agendamento prioritário",
            ]}
          />

          <CardPlanos
            nome="Trimestral"
            preco="R$ 219,90"
            periodo="/ 3 meses"
            descricao="Mais vantagens para quem gosta de cuidar do visual."
            beneficios={[
              "6 cortes de cabelo",
              "15% de desconto em produtos",
              "Agendamento prioritário",
              "1 design de sobrancelha grátis",
            ]}
            destaque={true}
          />

          <CardPlanos
            nome="Anual"
            preco="R$ 799,90"
            periodo="/ ano"
            descricao="A melhor escolha para quem é cliente frequente."
            beneficios={[
              "24 cortes de cabelo por ano",
              "20% de desconto em produtos",
              "Agendamento prioritário",
              "4 designs de sobrancelha grátis",
            ]}
          />

        </div>
      </div>
    </section>
  );
}
