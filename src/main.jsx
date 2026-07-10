import React, { useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ChevronRight,
  Clock3,
  CreditCard,
  Instagram,
  MapPinned,
  MessageCircle,
  PackageCheck,
  Repeat2,
  Search,
  ShieldCheck,
  ShoppingBag,
  Truck,
  UserRound,
  Volume2,
  VolumeX,
} from "lucide-react";
import "./styles.css";

import sacerisSymbol from "../assets/logo.png";
import sacerisWordmark from "../assets/escrita.png";
import introMusic from "../assets/intro_music.mp3";
import heroImage from "../assets/optimized/jesus_is_still_king.webp";
import cordeiroDeDeus from "../assets/optimized/cordeiro_de_deus.webp";
import eleNaoEstaAqui from "../assets/optimized/ele_nao_esta_aqui.webp";
import eleSabia from "../assets/optimized/ele_sabia.webp";
import eleVive from "../assets/optimized/ele_vive.webp";
import eliEli from "../assets/optimized/eli_eli_lama_samabacthani.webp";
import jesusIsStillKing from "../assets/optimized/jesus_is_still_king.webp";
import peniel from "../assets/optimized/peniel.webp";
import theKing from "../assets/optimized/the_king.webp";
import yeshua33 from "../assets/optimized/yeshua_33.webp";

const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || "5519982214588";
const PAYMENT_URL = import.meta.env.VITE_MERCADO_PAGO_URL || "https://mpago.la/19P6WnE";

const products = [
  { id: "still-king", name: "Camiseta Oversized - Jesus Is Still King", price: "R$ 179,90", colors: "1 cor", image: jesusIsStillKing, tag: "Lançamento" },
  { id: "the-king", name: "Camiseta Oversized - The King", price: "R$ 179,90", colors: "1 cor", image: theKing, tag: "Mais vista" },
  { id: "yeshua-33", name: "Camiseta Oversized - Yeshua 33", price: "R$ 169,90", colors: "2 cores", image: yeshua33, tag: "Brasil" },
  { id: "peniel", name: "Camiseta Oversized - Peniel", price: "R$ 189,90", colors: "1 cor", image: peniel, tag: "Destaque" },
  { id: "ele-sabia", name: "Camiseta Oversized - Ele Sabia", price: "R$ 179,90", colors: "1 cor", image: eleSabia, tag: "Mensagem" },
  { id: "ele-vive", name: "Camiseta Oversized - Ele Vive", price: "R$ 159,90", colors: "2 cores", image: eleVive, tag: "Essencial" },
  { id: "cordeiro", name: "Camiseta Oversized - Cordeiro de Deus", price: "R$ 179,90", colors: "1 cor", image: cordeiroDeDeus, tag: "Clássica" },
  { id: "eli-eli", name: "Camiseta Oversized - Eli Eli", price: "R$ 189,90", colors: "1 cor", image: eliEli, tag: "Arte forte" },
];

const collections = [
  { name: "Lançamentos", image: jesusIsStillKing },
  { name: "Linha Essencial", image: eleVive },
  { name: "Artes de impacto", image: eleNaoEstaAqui },
];

const benefits = [
  { icon: Clock3, title: "Envio rápido", text: "Postagem organizada após a confirmação do pedido." },
  { icon: ShieldCheck, title: "Pagamento seguro", text: "Compra pelo Mercado Pago com parcelamento disponível." },
  { icon: Repeat2, title: "Troca facilitada", text: "Atendimento direto para ajustes de tamanho e pedido." },
  { icon: Truck, title: "Frete combinado", text: "Envios para todo o Brasil com suporte via WhatsApp." },
  { icon: MapPinned, title: "Brasil inteiro", text: "Pedidos individuais, grupos, eventos e revenda." },
  { icon: CreditCard, title: "Parcelamento", text: "Conforme condições liberadas no checkout." },
];

function whatsappHref(subject = "pedido SACERIS") {
  const text = encodeURIComponent(`Olá, vim pelo site da SACERIS. Quero falar sobre ${subject}.`);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

function buyHref(product) {
  return product?.paymentUrl || PAYMENT_URL;
}

function useIntroMusic() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return undefined;
    audio.volume = 0.46;

    const sync = () => setPlaying(!audio.paused);
    const unlock = () => {
      audio.play().then(sync).catch(() => setPlaying(false));
    };

    audio.play().then(sync).catch(() => setPlaying(false));
    audio.addEventListener("play", sync);
    audio.addEventListener("pause", sync);
    window.addEventListener("pointerdown", unlock, { once: true });
    window.addEventListener("keydown", unlock, { once: true });

    return () => {
      audio.removeEventListener("play", sync);
      audio.removeEventListener("pause", sync);
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
      audio.pause();
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
      return;
    }
    audio.pause();
    setPlaying(false);
  };

  return { audioRef, playing, toggle };
}

function Mark() {
  return (
    <a className="brand" href="#inicio" aria-label="SACERIS">
      <img className="brandSymbol" src={sacerisSymbol} alt="" />
      <img className="brandWordmark" src={sacerisWordmark} alt="SACERIS" />
    </a>
  );
}

function ProductCard({ product }) {
  return (
    <article className="productCard">
      <a className="productMedia" href={buyHref(product)} target="_blank" rel="noreferrer">
        <span>{product.tag}</span>
        <img src={product.image} alt={product.name} loading="lazy" decoding="async" />
      </a>
      <div className="productInfo">
        <a href={buyHref(product)} target="_blank" rel="noreferrer">
          {product.name}
        </a>
        <div className="productMeta">
          <strong>{product.price}</strong>
          <small>{product.colors}</small>
        </div>
        <a className="buyButton" href={buyHref(product)} target="_blank" rel="noreferrer">
          Comprar
        </a>
      </div>
    </article>
  );
}

function App() {
  const [query, setQuery] = useState("");
  const { audioRef, playing, toggle } = useIntroMusic();
  const filteredProducts = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return products;
    return products.filter((product) => product.name.toLowerCase().includes(term) || product.tag.toLowerCase().includes(term));
  }, [query]);

  return (
    <main id="inicio">
      <audio ref={audioRef} src={introMusic} autoPlay loop playsInline preload="auto" />

      <div className="intro" aria-hidden="true">
        <div className="introHeat" />
        <div className="introEmbers">
          {Array.from({ length: 22 }).map((_, index) => (
            <span
              key={index}
              style={{
                "--x": `${8 + ((index * 31) % 84)}%`,
                "--delay": `${(index % 8) * 0.18}s`,
                "--duration": `${2.7 + (index % 6) * 0.24}s`,
                "--size": `${0.12 + (index % 5) * 0.045}rem`,
                "--drift": `${((index * 19) % 32) - 16}px`,
              }}
            />
          ))}
        </div>
        <div className="introBrand">
          <img className="introSymbol" src={sacerisSymbol} alt="" />
          <img className="introWordmark" src={sacerisWordmark} alt="" />
        </div>
      </div>

      <div className="promoBar">
        <span>Compra segura pelo Mercado Pago.</span>
        <span>Use o WhatsApp para tamanhos, grupos e revenda.</span>
        <span>SACERIS - Fé nas ruas.</span>
      </div>

      <header className="siteHeader">
        <Mark />
        <button className="soundToggle" type="button" onClick={toggle} aria-label={playing ? "Pausar trilha" : "Tocar trilha"}>
          {playing ? <Volume2 size={20} /> : <VolumeX size={20} />}
        </button>
        <nav className="mainNav" aria-label="Principal">
          <a href="#inicio">Início</a>
          <a href="#sobre">Sobre</a>
          <a href="#produtos">Produtos</a>
          <a href="#colecoes">Coleções</a>
          <a href="#contato">Contato</a>
        </nav>
        <div className="headerActions">
          <a href="#produtos">
            <Search size={20} />
            Buscar
          </a>
          <a href={whatsappHref("atendimento")} target="_blank" rel="noreferrer">
            <UserRound size={20} />
            Atendimento
          </a>
          <a href={PAYMENT_URL} target="_blank" rel="noreferrer">
            <ShoppingBag size={20} />
            Comprar
          </a>
        </div>
      </header>

      <section className="heroStore">
        <div className="heroImage">
          <img src={heroImage} alt="Camiseta SACERIS Jesus Is Still King" />
        </div>
        <div className="heroCopy">
          <p>Drop cristão autoral</p>
          <h1>Streetwear cristão com mensagem.</h1>
          <span>Criamos estampas únicas para camisetas que expressam sua personalidade. SACERIS, estilo que fala por você.</span>
          <div className="heroButtons">
            <a className="primaryCta" href={PAYMENT_URL} target="_blank" rel="noreferrer">
              Compre agora
              <ChevronRight size={22} />
            </a>
            <a className="secondaryCta" href="#produtos">
              Ver produtos
            </a>
          </div>
        </div>
      </section>

      <section className="benefits" aria-label="Beneficios">
        {benefits.map((item) => {
          const Icon = item.icon;
          return (
            <article key={item.title}>
              <Icon size={46} strokeWidth={1.5} />
              <h2>{item.title}</h2>
              <p>{item.text}</p>
            </article>
          );
        })}
      </section>

      <section className="collections" id="colecoes">
        {collections.map((collection) => (
          <a className="collectionCard" href="#produtos" key={collection.name}>
            <img src={collection.image} alt="" loading="lazy" decoding="async" />
            <span>{collection.name}</span>
          </a>
        ))}
      </section>

      <section className="productsSection" id="produtos">
        <div className="sectionTitle">
          <h2>Lançamentos</h2>
          <label className="searchField">
            <Search size={19} />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar produto" type="search" />
          </label>
        </div>

        <div className="productGrid">
          {filteredProducts.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      </section>

      <section className="featureStrip" id="sobre">
        <img src={eleNaoEstaAqui} alt="Arte SACERIS Ele não está aqui" loading="lazy" decoding="async" />
        <div>
          <p>SACERIS</p>
          <h2>Não vestimos apenas tecido. Vestimos propósito.</h2>
          <span>
            A marca nasce para transformar convicção em imagem: camisetas com leitura urbana, acabamento visual forte e
            mensagem cristã assumida.
          </span>
          <a href={whatsappHref("SACERIS")} target="_blank" rel="noreferrer">
            Fale com a SACERIS
          </a>
        </div>
      </section>

      <section className="contactBand" id="contato">
        <PackageCheck size={42} />
        <div>
          <h2>Quer comprar, revender ou montar um pedido para grupo?</h2>
          <p>Fale direto pelo WhatsApp e receba orientação sobre tamanhos, malhas, prazo e pagamento.</p>
        </div>
        <a href={whatsappHref("revenda ou pedido em grupo")} target="_blank" rel="noreferrer">
          Chamar no WhatsApp
        </a>
      </section>

      <footer className="footer">
        <Mark />
        <span>@usesaceris</span>
        <a href="https://www.instagram.com/usesaceris/" target="_blank" rel="noreferrer">
          <Instagram size={18} />
          Instagram
        </a>
      </footer>

      <a className="whatsappFloat" href={whatsappHref("pedido")} target="_blank" rel="noreferrer" aria-label="Conversar no WhatsApp">
        <MessageCircle size={28} />
      </a>
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);
