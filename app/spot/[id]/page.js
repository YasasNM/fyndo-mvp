import spots from "../../../data/spots.json";
import Link from "next/link";
import { notFound } from "next/navigation";
import { categoryTheme } from "../../../components/categoryTheme";
import Reviews from "../../../components/Reviews";

export function generateStaticParams() {
  return spots.map((s) => ({ id: s.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const spot = spots.find((s) => s.id === id);
  if (!spot) return { title: "Spot not found — Fyndo" };
  return {
    title: `${spot.name} — Fyndo`,
    description: spot.blurb,
  };
}

function PlayIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 5.5 L18 12 L8 18.5 Z" />
    </svg>
  );
}

export default async function SpotPage({ params }) {
  const { id } = await params;
  const spot = spots.find((s) => s.id === id);
  if (!spot) notFound();

  const theme = categoryTheme(spot.category);
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    spot.mapsQuery
  )}`;

  return (
    <main className="container">
      <div className="spot-page">
        <Link href="/" className="back-link">
          <span aria-hidden="true">←</span> Back to all spots
        </Link>

        <div className={`spot-hero-media ${theme.mediaClass}`}>
          <span className="food-emoji" aria-hidden="true">{theme.emoji}</span>
        </div>

        <div className="spot-title-row">
          <h1>{spot.name}</h1>
          {spot.verified ? (
            <span className="verified-badge yes">
              <span aria-hidden="true">✓</span> Verified by Fyndo
            </span>
          ) : (
            <span className="verified-badge no">Unverified listing</span>
          )}
        </div>

        <div className="spot-meta">
          <span className="tag">📍 {spot.area}</span>
          <span className="tag">{theme.emoji} {spot.category}</span>
          <span className="tag price">{spot.priceRange}</span>
          {(spot.moods || []).map((m) => (
            <span className="tag mood" key={m}>
              {m}
            </span>
          ))}
        </div>

        <div className="spot-video">
          {spot.videoUrl ? (
            <iframe
              src={spot.videoUrl}
              title={`${spot.name} video review`}
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          ) : (
            <>
              <span className="video-icon">
                <PlayIcon />
              </span>
              <strong>Video review coming soon</strong>
              <span>Follow @fyndo on TikTok &amp; Instagram to see it first</span>
            </>
          )}
        </div>

        <p className="section-label">About this spot</p>
        <p className="spot-blurb">{spot.blurb}</p>

        <p className="section-label">Details</p>
        <div className="detail-list">
          <div className="detail-row">
            <span className="label">Typical spend</span>
            <span className="value">{spot.priceLabel}</span>
          </div>
          <div className="detail-row">
            <span className="label">Area</span>
            <span className="value">{spot.area}</span>
          </div>
          <div className="detail-row">
            <span className="label">Category</span>
            <span className="value">{spot.category}</span>
          </div>
        </div>

        <Reviews spotId={spot.id} />

        <div className="btn-row">
          <a className="btn btn-primary" href={mapsUrl} target="_blank" rel="noreferrer">
            <span aria-hidden="true">🗺️</span> Open in Google Maps
          </a>
          <a
            className="btn btn-outline"
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
          >
            Suggest an edit
          </a>
        </div>
      </div>
    </main>
  );
}
