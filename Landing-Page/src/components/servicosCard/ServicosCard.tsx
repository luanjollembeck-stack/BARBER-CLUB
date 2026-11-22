
type CardServicoProps = {
  nome: string;
  descricao: string;
  preco: string;
  imagem: string;
};

export default function CardServico({
  nome,
  descricao,
  preco,
  imagem,
}: CardServicoProps) {
  return (
    <div className="group overflow-hidden rounded-xl border border-white/10 bg-[#1C1C1C] transition duration-300 hover:-translate-y-2 hover:border-[#C6A15B]">

      {/* Imagem */}
      <div className="h-52 overflow-hidden">
        <img
          src={imagem}
          alt={nome}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
        />
      </div>

      {/* Conteúdo */}
      <div className="p-5">

        <h3 className="text-xl font-bold text-white">
          {nome}
        </h3>

        <p className="mt-2 text-sm text-gray-400">
          {descricao}
        </p>

        {/* Preço e botão */}
        <div className="mt-6 flex items-center justify-between">

          <span className="text-xl font-bold text-[#C6A15B]">
            {preco}
          </span>

          <a
            href="#agendamento"
            className="rounded-md bg-[#C6A15B] px-4 py-2 text-sm font-semibold text-black transition hover:bg-[#ddbd7d]"
          >
            Agendar
          </a>

        </div>
      </div>
    </div>
  );
}
