import barberShop from "../../assets/Barbearia Vintage.png";

export default function About() {
  return (
    <section
      id="sobre"
      className="bg-[#171717] px-6 py-24"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-14 md:grid-cols-2">

        {/* Imagem */}
        <div className="relative">
          <img
            src={barberShop}
            alt="Interior sofisticado da Barber Club"
            className="h-[450px] w-full rounded-xl object-cover"
          />

          <div className="absolute -bottom-5 -right-5 hidden rounded-lg border border-[#C6A15B] bg-[#111111] p-6 md:block">
            <span className="text-4xl font-bold text-[#C6A15B]">
              2018
            </span>
            <p className="mt-1 text-sm text-gray-300">
              Desde o início
            </p>
          </div>
        </div>

        {/* Texto */}
        <div>

          <span className="text-sm font-semibold tracking-[0.3em] text-[#C6A15B]">
            SOBRE NÓS
          </span>

          <h2 className="mt-5 text-4xl font-bold leading-tight text-white md:text-5xl">
            MAIS QUE UMA BARBEARIA,
            <span className="block text-[#C6A15B]">
              UM ESTILO DE VIDA.
            </span>
          </h2>

          <p className="mt-6 leading-relaxed text-gray-400">
            A Barber Club nasceu com o propósito de transformar
            o cuidado masculino em uma experiência única.
            Acreditamos que cada detalhe faz diferença e que
            um bom visual vai muito além de um simples corte.
          </p>

          <p className="mt-4 leading-relaxed text-gray-400">
            Nosso compromisso é oferecer qualidade, profissionalismo
            e um ambiente confortável, onde cada cliente possa
            expressar sua personalidade e encontrar seu próprio estilo.
          </p>

          {/* Diferenciais */}
          <div className="mt-8 grid grid-cols-2 gap-6">

            <div>
              <h3 className="text-lg font-bold text-[#C6A15B]">
                Qualidade
              </h3>
              <p className="mt-2 text-sm text-gray-400">
                Atenção aos detalhes em cada serviço.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-[#C6A15B]">
                Experiência
              </h3>
              <p className="mt-2 text-sm text-gray-400">
                Atendimento pensado para você.
              </p>
            </div>

          </div>

          <a
            href=""
            className="mt-10 inline-block rounded-md bg-[#C6A15B] px-7 py-4 font-semibold text-black transition hover:bg-[#ddbd7d]"
          >
            Conheça nossa barbearia
          </a>

        </div>
      </div>
    </section>
  );
}
