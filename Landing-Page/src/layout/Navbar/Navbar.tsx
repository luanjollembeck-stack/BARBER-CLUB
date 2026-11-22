
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const links =  [
  { name: "Início", href: "#inicio" },
  { name: "Serviços", href: "#servicos" },
  { name: "Sobre", href: "#sobre" },
  { name: "Planos", href: "#planos" },
  { name: "Contato", href: "#contato" },
];

  return (
    <nav className="w-full bg-[#111111] text-white px-6 py-5">
      <div className="mx-auto flex max-w-7xl items-center justify-between">

        {/* Logo */}
        <a
          href=""
          className="text-2xl font-bold tracking-[0.2em] text-[#C6A15B]"
        >
          BARBER CLUB
        </a>

        {/* Links desktop */}
        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm transition-colors hover:text-[#C6A15B]"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Botão menu mobile */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-2xl md:hidden"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Menu mobile */}
      {menuOpen && (
        <div className="mt-5 flex flex-col gap-4 border-t border-gray-700 pt-5 md:hidden">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="transition-colors hover:text-[#C6A15B]"
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
