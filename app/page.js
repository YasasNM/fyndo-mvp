import spots from "../data/spots.json";
import SpotDirectory from "../components/SpotDirectory";

const TICKER_ITEMS = [
  "Cheese Kottu",
  "Isso Wade",
  "Biryani",
  "Fish Buns",
  "Crab Curry",
  "Milk Tea",
  "Havelock Town",
  "Galle Face",
  "Mount Lavinia",
  "Rice & Curry",
  "Nugegoda",
  "Short Eats",
];

export default function Home() {
  const areaCount = new Set(spots.map((s) => s.area)).size;

  return (
    <main>
      <section className="hero">
        <div className="container hero-inner">
          <span className="watermark" aria-hidden="true">COLOMBO</span>
          <span className="hero-eyebrow">Video-first local discovery</span>
          <h1>
            Find the <span className="accent">real</span> spots in Colombo
          </h1>
          <p>Hidden gems. Real prices. Video reviews you can trust — no paid rankings, no tourist traps.</p>
          <div className="hero-stats">
            <div className="stat-pill">
              <span className="num">{spots.length}<em>+</em></span>
              <span className="lbl">Spots filmed</span>
            </div>
            <div className="stat-pill">
              <span className="num">{areaCount}</span>
              <span className="lbl">Areas covered</span>
            </div>
            <div className="stat-pill">
              <span className="num">100<em>%</em></span>
              <span className="lbl">Real prices</span>
            </div>
          </div>
        </div>
        <div className="ticker" aria-hidden="true">
          <div className="ticker-track">
            {TICKER_ITEMS.map((item) => (
              <span className="ticker-item" key={item}>{item}</span>
            ))}
            {TICKER_ITEMS.map((item) => (
              <span className="ticker-item" key={`${item}-2`}>{item}</span>
            ))}
          </div>
        </div>
      </section>
      <SpotDirectory spots={spots} />
    </main>
  );
}
