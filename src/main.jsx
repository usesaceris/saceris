import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { ArrowUpRight, ChevronRight, Instagram, MessageCircle, Volume2, VolumeX } from "lucide-react";
import "./styles.css";
import { ProductStory3D } from "./components/ProductStory3D.jsx";

import sacerisSymbol from "../assets/logo.png";
import sacerisWordmark from "../assets/escrita.png";
import introMusic from "../assets/intro_music.mp3";
import coldHero from "../assets/frio/cria_em_mim_um_coracao_puro.png";
import cordeiroDeDeus from "../assets/tshirts/cordeiro_de_deus.png";
import eleNaoEstaAqui from "../assets/tshirts/ele_nao_esta_aqui.png";
import eleSabia from "../assets/tshirts/ele_sabia.png";
import eleVive from "../assets/tshirts/ele_vive.png";
import eliEli from "../assets/tshirts/eli_eli_lama_samabacthani.png";
import jesusIsStillKing from "../assets/tshirts/jesus_is_still_king.png";
import peniel from "../assets/tshirts/peniel.png";
import theKing from "../assets/tshirts/the_king.png";
import yeshua33 from "../assets/tshirts/yeshua_33.png";

const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || "";

const artworks = [
  { id: "the-king", name: "THE KING", verse: "Reino, honra e eternidade.", detail: "Uma peça central para quem quer uma arte cristã com presença de capa.", image: theKing },
  { id: "jesus-is-still-king", name: "JESUS IS STILL KING", verse: "A mensagem segue de pé.", detail: "Contraste forte, leitura urbana e impacto imediato para camiseta preta.", image: jesusIsStillKing },
  { id: "yeshua-33", name: "YESHUA 33", verse: "Nome acima de todo nome.", detail: "Arte vertical, densa e devocional, feita para segurar o olhar.", image: yeshua33 },
  { id: "peniel", name: "PENIEL", verse: "Face a face com o chamado.", detail: "Composição intensa para quem veste uma história, não só uma estampa.", image: peniel },
  { id: "ele-sabia", name: "ELE SABIA", verse: "Amor consciente até o fim.", detail: "Uma arte mais narrativa, com peso emocional e acabamento premium.", image: eleSabia },
  { id: "ele-vive", name: "ELE VIVE", verse: "A tumba vazia ainda fala.", detail: "Mensagem direta, energia de celebração e contraste limpo.", image: eleVive },
  { id: "cordeiro-de-deus", name: "CORDEIRO DE DEUS", verse: "Sacrifício, pureza e majestade.", detail: "Arte simbólica para uma presença mais clássica dentro da coleção.", image: cordeiroDeDeus },
  { id: "ele-nao-esta-aqui", name: "ELE NÃO ESTÁ AQUI", verse: "Ressurreição como manifesto.", detail: "Frase forte e composição enxuta para uma leitura de impacto.", image: eleNaoEstaAqui },
  { id: "eli-eli", name: "ELI ELI", verse: "Entrega até o último fôlego.", detail: "Arte dramática para uma composição de costas com leitura intensa.", image: eliEli },
];

const tickerItems = ["identidade", "propósito", "presença", "fé", "arte", "autoridade", "chama", "reino"];

function useIntroMusic() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return undefined;
    audio.volume = 0.62;

    const tryPlay = async () => {
      try {
        await audio.play();
        setPlaying(true);
      } catch {
        setPlaying(false);
      }
    };

    const onPlaying = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const unlockAudio = () => {
      if (audio.paused) tryPlay();
    };

    tryPlay();
    audio.addEventListener("playing", onPlaying);
    audio.addEventListener("pause", onPause);
    window.addEventListener("pointerdown", unlockAudio, { once: true });
    window.addEventListener("keydown", unlockAudio, { once: true });

    return () => {
      audio.removeEventListener("playing", onPlaying);
      audio.removeEventListener("pause", onPause);
      window.removeEventListener("pointerdown", unlockAudio);
      window.removeEventListener("keydown", unlockAudio);
      audio.pause();
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
      return;
    }
    audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
  };

  return { audioRef, playing, toggle };
}

function whatsappHref(artName) {
  const text = encodeURIComponent(`Olá, vim pelo site da SACERIS. Quero conversar sobre a arte ${artName}.`);
  return WHATSAPP_NUMBER ? `https://wa.me/${WHATSAPP_NUMBER}?text=${text}` : `https://wa.me/?text=${text}`;
}

function Mark({ compact = false }) {
  return (
    <div className={compact ? "mark markCompact" : "mark"} aria-label="SACERIS">
      <img className="markSymbol" src={sacerisSymbol} alt="" />
      <img className="markWordmark" src={sacerisWordmark} alt="" />
    </div>
  );
}

function IntroBrand() {
  return (
    <div className="introBrand">
      <img className="introSymbol" src={sacerisSymbol} alt="" />
      <img className="introWordmark" src={sacerisWordmark} alt="" />
    </div>
  );
}

function ProductArt({ art, featured = false }) {
  return (
    <div className={`shirt ${featured ? "shirtFeatured" : ""}`}>
      <span className="shirtEmbers" aria-hidden="true" />
      <img src={art.image} alt={`Camiseta SACERIS - ${art.name}`} />
    </div>
  );
}

function HeroCarousel({ activeIndex }) {
  const getPosition = (index) => {
    const distance = (index - activeIndex + artworks.length) % artworks.length;
    if (distance === 0) return "isCurrent";
    if (distance === 1) return "isNext";
    if (distance === 2) return "isSecond";
    if (distance === artworks.length - 1) return "isPrevious";
    return "isHidden";
  };

  return (
    <div className="heroCarousel" aria-hidden="true">
      {artworks.map((art, index) => (
        <div className={`carouselCard ${getPosition(index)}`} key={art.id}>
          <img src={art.image} alt="" />
        </div>
      ))}
    </div>
  );
}

function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const { audioRef, playing, toggle } = useIntroMusic();
  const active = artworks[activeIndex];

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % artworks.length);
    }, 4500);

    return () => window.clearInterval(interval);
  }, []);

  const selectArt = (art) => {
    const nextIndex = artworks.findIndex((item) => item.id === art.id);
    if (nextIndex >= 0) setActiveIndex(nextIndex);
  };

  return (
    <main>
      <audio ref={audioRef} src={introMusic} autoPlay loop playsInline preload="auto" />

      <div className="intro" aria-hidden="true">
        <div className="introFlameField" />
        <IntroBrand />
      </div>

      <nav className="nav">
        <a href="#top" aria-label="Início">
          <Mark compact />
        </a>
        <div className="navLinks">
          <a href="#colecao">Artes</a>
          <a href="#manifesto">Manifesto</a>
          <a href="https://www.instagram.com/usesaceris/" target="_blank" rel="noreferrer">
            <Instagram size={17} />
            Instagram
          </a>
        </div>
      </nav>

      <section className="hero" id="top">
        <img className="coldHero" src={coldHero} alt="" />
        <div className="haloGrid" />
        <div className="flameVeil" aria-hidden="true" />
        <div className="heroCopy">
          <p className="eyebrow">Camisas cristãs premium</p>
          <h1>Sua camisa fala antes de você.</h1>
          <p className="lead">Artes de fé com peso visual, acabamento editorial e presença para quem escolhe se destacar.</p>
          <div className="heroActions">
            <a className="primaryButton" href="#colecao">
              Ver artes
              <ChevronRight size={18} />
            </a>
            <a className="ghostButton" href={whatsappHref("coleção SACERIS")} target="_blank" rel="noreferrer">Chamar no WhatsApp</a>
          </div>
        </div>

        <div className="heroStage" aria-label="Camiseta em destaque">
          <div className="orbit orbitOne" />
          <div className="orbit orbitTwo" />
          <HeroCarousel activeIndex={activeIndex} />
          <div className="stageCaption">
            <span>0{activeIndex + 1}</span>
            <strong>{active.name}</strong>
          </div>
        </div>
      </section>

      <section className="ticker" aria-label="Valores da marca">
        <div className="tickerTrack">
          {[...tickerItems, ...tickerItems].map((item, index) => (
            <span key={`${item}-${index}`}>{item}</span>
          ))}
        </div>
      </section>

      <ProductStory3D />

      <section className="collection" id="colecao">
        <div className="sectionHead">
          <div>
            <p className="eyebrow">Coleção inicial</p>
            <h2>Artes que seguram o olhar.</h2>
          </div>
          <div className="collectionBrief">
            <div className="briefCopy">
              <span>Drop 01</span>
              <p>Uma seleção de artes cristãs com linguagem urbana, leitura forte nas costas e acabamento pensado para presença real.</p>
              <div>
                <strong>{artworks.length}</strong>
                <small>artes em destaque</small>
              </div>
            </div>
            <div className="briefPreview" aria-hidden="true">
              {artworks.slice(0, 3).map((art, index) => (
                <img src={art.image} alt="" key={art.id} style={{ "--preview-index": index }} />
              ))}
            </div>
          </div>
        </div>

        <div className="gallery">
          {artworks.map((art) => (
            <article className={`artCard ${active.id === art.id ? "isActive" : ""}`} key={art.id} onMouseEnter={() => selectArt(art)} onFocus={() => selectArt(art)} tabIndex="0">
              <ProductArt art={art} />
              <div className="cardCopy">
                <span>{art.verse}</span>
                <h3>{art.name}</h3>
                <p>{art.detail}</p>
                <a href={whatsappHref(art.name)} target="_blank" rel="noreferrer">
                  Falar sobre esta arte
                  <ArrowUpRight size={16} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="manifesto" id="manifesto">
        <div>
          <p className="eyebrow">SACERIS</p>
          <h2>Vista aquilo que você carrega na alma.</h2>
        </div>
        <div className="manifestoPanel">
          <div className="manifestoSeal">
            <img src={sacerisSymbol} alt="" />
            <span>Drop cristão autoral</span>
          </div>
          <p>A marca nasce para transformar convicção em imagem: camisetas com fé assumida, leitura urbana e acabamento premium.</p>
          <div className="manifestoGrid">
            <span>
              <strong>01</strong>
              Sem excesso visual.
            </span>
            <span>
              <strong>02</strong>
              Arte com mensagem.
            </span>
            <span>
              <strong>03</strong>
              Presença no cotidiano.
            </span>
          </div>
          <div className="manifestoFooter">
            <p className="manifestoNote">Sem barulho vazio. Só presença.</p>
            <a href={whatsappHref("coleção SACERIS")} target="_blank" rel="noreferrer">
              Criar minha peça
              <ArrowUpRight size={17} />
            </a>
          </div>
        </div>
      </section>

      <footer>
        <Mark compact />
        <span>@usesaceris</span>
      </footer>

      <a className="whatsappFloat" href={whatsappHref(active.name)} target="_blank" rel="noreferrer" aria-label="Conversar no WhatsApp">
        <MessageCircle size={26} />
        <span>{active.name}</span>
      </a>

      <button className="soundToggle" type="button" onClick={toggle} aria-label={playing ? "Pausar trilha" : "Ativar trilha"}>
        {playing ? <Volume2 size={18} /> : <VolumeX size={18} />}
        <span>{playing ? "Pausar trilha" : "Ativar trilha"}</span>
      </button>
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);
