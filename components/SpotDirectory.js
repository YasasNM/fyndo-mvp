"use client";

import { useState } from "react";
import Link from "next/link";
import { categoryTheme } from "./categoryTheme";

const CATEGORIES = ["All", "Street Food", "Cafe", "Restaurant", "Bakery", "Rice & Curry", "Seafood"];

function PlayIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="#fff" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 5.5 L18 12 L8 18.5 Z" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" xmlns="http://www.w3.org/2000/svg">
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20 L16.5 16.5" />
    </svg>
  );
}

export default function SpotDirectory({ spots }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const q = query.trim().toLowerCase();
  const filtered = spots.filter((s) => {
    const matchesCategory = category === "All" || s.category === category;
    const matchesQuery =
      q === "" ||
      s.name.toLowerCase().includes(q) ||
      s.area.toLowerCase().includes(q) ||
      s.category.toLowerCase().includes(q) ||
      (s.moods || []).some((m) => m.toLowerCase().includes(q));
    return matchesCategory && matchesQuery;
  });

  const hasActiveFilters = q !== "" || category !== "All";
  const resetFilters = () => {
    setQuery("");
    setCategory("All");
  };

  return (
    <section className="container" id="spots">
      <div className="search-wrap">
        <div className="search-box">
          <span className="search-icon">
            <SearchIcon />
          </span>
          <input
            className="search-input"
            type="text"
            placeholder='Try "Havelock", "kottu", or "rainy day"…'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search spots"
          />
          {query !== "" && (
            <button className="search-clear" onClick={() => setQuery("")} aria-label="Clear search">
              ✕
            </button>
          )}
        </div>
        <div className="chip-row">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              className={`chip ${category === c ? "active" : ""}`}
              onClick={() => setCategory(c)}
            >
              {c !== "All" && <span aria-hidden="true">{categoryTheme(c).emoji}</span>}
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="results-bar">
        <p className="count-line">
          <strong>{filtered.length}</strong> spot{filtered.length === 1 ? "" : "s"} found
          {category !== "All" && <> in <strong>{category}</strong></>}
        </p>
        {hasActiveFilters && (
          <button className="reset-filters" onClick={resetFilters}>
            Clear filters
          </button>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <span className="empty-emoji" aria-hidden="true">🔍</span>
          <p>No spots match yet — but that just means we haven&apos;t filmed it.</p>
          <p>Know a hidden gem? Tell us on Instagram or TikTok @fyndo.</p>
          <button className="reset-filters" onClick={resetFilters}>
            Show all spots
          </button>
        </div>
      ) : (
        <div className="grid">
          {filtered.map((s) => {
            const theme = categoryTheme(s.category);
            return (
              <Link href={`/spot/${s.id}`} key={s.id} className="card">
                <div className={`card-media ${theme.mediaClass}`}>
                  <span className="area-badge">📍 {s.area}</span>
                  <span className="food-emoji" aria-hidden="true">{theme.emoji}</span>
                  <div className="play">
                    <PlayIcon />
                  </div>
                  {!s.videoUrl && <span className="soon">video coming soon</span>}
                </div>
                <div className="card-body">
                  <div className="card-title">{s.name}</div>
                  <div className="card-meta">
                    <span className="tag">{s.category}</span>
                    <span className="tag price">{s.priceRange}</span>
                    {(s.moods || []).slice(0, 1).map((m) => (
                      <span className="tag mood" key={m}>
                        {m}
                      </span>
                    ))}
                  </div>
                  <p className="card-blurb">{s.blurb}</p>
                  <span className="card-cta">
                    View spot <span aria-hidden="true">→</span>
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
}
