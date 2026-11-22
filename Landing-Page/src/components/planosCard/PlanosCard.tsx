
type CardPlanosProps = {
  nome: string;
  preco: string;
  periodo: string;
  descricao: string;
  beneficios: string[];
  destaque?: boolean;
};

export default function PlanosCard({
  nome,
  preco,
  periodo,
  descricao,
  beneficios,
  destaque = false,
}: CardPlanosProps) {
  return (
    <div
      className={`relative flex flex-col rounded-2xl border p-8 transition duration-300 hover:-translate-y-2
      ${
        destaque
          ? "border-[#C6A15B] bg-[#1C1C1C]"
          : "border-white/10 bg-[#171717] hover:border-[#C6A15B]/50"
      }`}
    >
      {/* Selo de destaque */}
      {destaque && (
        <span className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#C6A15B] px-5 py-2 text-xs font-bold uppercase tracking-wider text-black">
          Mais popular
        </span>
      )}

      {/* Nome do plano */}
      <h3 className="text-xl font-bold text-white">
        {nome}
      </h3>

      {/* Descrição */}
      <p className="mt-3 min-h-[48px] text-sm leading-relaxed text-gray-400">
        {descricao}
      </p>

      {/* Preço */}
      <div className="mt-8 flex items-end gap-2">
        <span className="text-4xl font-bold text-[#C6A15B]">
          {preco}
        </span>

        <span className="mb-1 text-sm text-gray-400">
          {periodo}
        </span>
      </div>

      {/* Divisor */}
      <div className="my-8 border-t border-white/10" />

      {/* Benefícios */}
      <ul className="flex-1 space-y-4">
        {beneficios.map((beneficio, index) => (
          <li
            key={index}
            className="flex items-start gap-3 text-sm text-gray-300"
          >
            <span className="text-[#C6A15B]">✓</span>
            <span>{beneficio}</span>
          </li>
        ))}
      </ul>

      {/* Botão */}
      <a
        href="#agendamento"
        className={`mt-10 block w-full rounded-lg py-3 text-center font-semibold transition
        ${
          destaque
            ? "bg-[#C6A15B] text-black hover:bg-[#ddbd7d]"
            : "border border-[#C6A15B] text-[#C6A15B] hover:bg-[#C6A15B] hover:text-black"
        }`}
      >
        Assinar plano
      </a>
    </div>
  );
}
