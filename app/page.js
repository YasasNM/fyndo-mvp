import spots from "../data/spots.json";
import SpotDirectory from "../components/SpotDirectory";

export default function Home() {
  const areaCount = new Set(spots.map((s) => s.area)).size;

  return (
    <main>
      <section className="hero">
        <div className="container">
          <span className="hero-eyebrow">
            <span aria-hidden="true">🇱🇰</span> Video-first local discovery · Colombo
          </span>
          <h1>
            Find the <span className="accent">real</span> spots in Colombo
          </h1>
          <p>Hidden gems. Real prices. Video reviews you can trust.</p>
          <div className="hero-stats">
            <div className="stat-pill">
              <span className="num">{spots.length}</span>
              <span className="lbl">Spots</span>
            </div>
            <div className="stat-pill">
              <span className="num">{areaCount}</span>
              <span className="lbl">Areas</span>
            </div>
            <div className="stat-pill">
              <span className="num">100%</span>
              <span className="lbl">Real prices</span>
            </div>
          </div>
        </div>
      </section>
      <SpotDirectory spots={spots} />
    </main>
  );
}
