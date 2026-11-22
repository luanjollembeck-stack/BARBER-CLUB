
type CardAvaliacaoProps = {
  nome: string;
  avaliacao: string;
  comentario: string;
};

export default function avaliacoesCard({
  nome,
  avaliacao,
  comentario,
}: CardAvaliacaoProps) {
  return (
    <div className="group rounded-xl border border-white/10 bg-[#1C1C1C] p-6 transition duration-300 hover:-translate-y-2 hover:border-[#C6A15B]">

      {/* Estrelas */}
      <div className="mb-4 flex gap-1 text-xl text-[#C6A15B]">
        {Array.from({ length: 5 }).map((_, index) => (
          <span key={index}>★</span>
        ))}
      </div>

      {/* Comentário */}
      <p className="min-h-24 leading-relaxed text-gray-300">
        "{comentario}"
      </p>

      {/* Cliente */}
      <div className="mt-6 border-t border-white/10 pt-4">
        <h3 className="font-bold text-white">
          {nome}
        </h3>

        <span className="text-sm text-[#C6A15B]">
          Cliente Barber Club
        </span>
      </div>

    </div>
  );
}
