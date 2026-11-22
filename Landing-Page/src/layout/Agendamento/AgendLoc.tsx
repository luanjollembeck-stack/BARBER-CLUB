
export default function AgendaLoc() {
  return (
    <section className="bg-[#171717] text-white">

      {/* Agendamento e localização */}
      <section
        id="agendamento"
        className="px-6 py-24"
      >
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2">

          {/* Agendamento */}
          <div>
            <span className="text-sm font-semibold tracking-[0.3em] text-[#C6A15B]">
              SEU ESTILO COMEÇA AQUI
            </span>

            <h2 className="mt-5 text-4xl font-bold leading-tight md:text-5xl">
              PRONTO PARA
              <span className="block text-[#C6A15B]">
                RENOVAR SEU VISUAL?
              </span>
            </h2>

            <p className="mt-6 max-w-md leading-relaxed text-gray-400">
              Agende seu horário com nossos profissionais
              e tenha uma experiência exclusiva na Barber Club.
            </p>

            <a
              href="https://wa.me/5548984678115"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-3 rounded-md bg-[#C6A15B] px-7 py-4 font-semibold text-black transition hover:bg-[#ddbd7d]"
            >
              Agendar pelo WhatsApp
              <span>→</span>
            </a>
          </div>

          {/* Localização */}
          <div id="contato" className="space-y-8">

            <div>
              <h3 className="mb-3 text-xl font-bold text-[#C6A15B]">
                Nossa localização
              </h3>

              <p className="text-gray-400">
                Rua Jacinto Damásio, 447 - Serraria
              </p>

              <p className="text-gray-400">
                São José - SC
              </p>
            </div>

            <div>
              <h3 className="mb-3 text-xl font-bold text-[#C6A15B]">
                Horário de funcionamento
              </h3>

              <p className="text-gray-400">
                Segunda a sexta: 09h às 19h
              </p>

              <p className="text-gray-400">
                Sábado: 09h às 17h
              </p>

              <p className="text-gray-400">
                Domingo: Fechado
              </p>
            </div>

            <div>
              <h3 className="mb-3 text-xl font-bold text-[#C6A15B]">
                Entre em contato
              </h3>

              <p className="text-gray-400">
                WhatsApp: (48) 98460-9421
              </p>

              <p className="text-gray-400">
                Instagram: @barberclub
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Mapa */}
      {/* <section className="px-6 pb-16">
        <div className="mx-auto max-w-7xl">

          <h3 className="mb-6 text-2xl font-bold text-white">
            Como chegar até nós?
          </h3>

          <div className="overflow-hidden rounded-xl border border-white/10">
            <iframe
              title="Localização da barbearia"
              src="https://www.google.com/maps?q=Centro%20de%20Florianopolis&output=embed"
              width="100%"
              height="350"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>

        </div>
      </section> */}

      {/* Rodapé */}
      <div className="border-t border-white/10 px-6 py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 md:flex-row">

          <h2 className="text-2xl font-bold tracking-[0.2em] text-[#C6A15B]">
            BARBER CLUB
          </h2>

          <p className="text-center text-sm text-gray-500">
            © 2026 Barber Club. Todos os direitos reservados.
          </p>

          <a
            href="#inicio"
            className="text-sm text-gray-400 transition hover:text-[#C6A15B]"
          >
            Voltar ao topo ↑
          </a>

        </div>
      </div>

    </section>
  );
}
