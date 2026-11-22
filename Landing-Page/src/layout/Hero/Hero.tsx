import heroImage from "../../assets/hero-barber.png";

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-[calc(100vh-80px)] items-center overflow-hidden bg-[#111111]"
    >
      {/* Imagem de fundo */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Barbeiro realizando um corte de cabelo"
          className="h-full w-full object-cover object-center"
        />

        {/* Overlay escuro */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/20" />
      </div>

      {/* Conteúdo */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-20">

        <span className="mb-6 block text-sm font-semibold tracking-[0.3em] text-[#C6A15B]">
          BARBEARIA • EST. 2018
        </span>

        <h1 className="max-w-3xl text-5xl font-bold leading-tight text-white md:text-7xl lg:text-8xl">
          ESTILO NÃO SE EXPLICA.
          <span className="block text-[#C6A15B]">
            SE VIVE.
          </span>
        </h1>

        <p className="mt-6 max-w-xl text-lg text-gray-300 md:text-xl">
          Mais que um corte, uma experiência.
          Seu estilo começa aqui.
        </p>

        {/* Botões */}
        <div className="mt-10 flex flex-wrap gap-4">

          <a
            href="#agendamento"
            className="flex items-center gap-3 rounded-md bg-[#C6A15B] px-7 py-4 font-semibold text-black transition duration-300 hover:bg-[#ddbd7d]"
          >
            Agende seu horário
            <span>→</span>
          </a>

          <a
            href="#servicos"
            className="rounded-md border border-white/40 px-7 py-4 text-white transition duration-300 hover:border-[#C6A15B] hover:text-[#C6A15B]"
          >
            Conheça nossos serviços ↓
          </a>

        </div>
      </div>
    </section>
  );
}