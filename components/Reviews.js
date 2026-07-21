"use client";

import { useCallback, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

function Star({ filled }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 2.5 L14.9 9 L22 9.7 L16.7 14.4 L18.2 21.4 L12 17.8 L5.8 21.4 L7.3 14.4 L2 9.7 L9.1 9 Z"
        fill={filled ? "#FF8A1E" : "none"}
        stroke={filled ? "#FF8A1E" : "#6b6156"}
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function timeAgo(dateString) {
  const days = Math.floor((Date.now() - new Date(dateString).getTime()) / 86400000);
  if (days < 1) return "today";
  if (days === 1) return "yesterday";
  if (days < 30) return `${days} days ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} month${months === 1 ? "" : "s"} ago`;
  const years = Math.floor(months / 12);
  return `${years} year${years === 1 ? "" : "s"} ago`;
}

export default function Reviews({ spotId }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const loadReviews = useCallback(async () => {
    if (!supabase) {
      setLoading(false);
      return;
    }
    const { data, error: err } = await supabase
      .from("reviews")
      .select("id, name, rating, text, created_at")
      .eq("spot_id", spotId)
      .eq("approved", true)
      .order("created_at", { ascending: false });
    if (!err && data) setReviews(data);
    setLoading(false);
  }, [spotId]);

  useEffect(() => {
    loadReviews();
  }, [loadReviews]);

  // Supabase not configured yet — show a friendly placeholder.
  if (!supabase) {
    return (
      <>
        <p className="section-label">Reviews</p>
        <div className="reviews-placeholder">
          Reviews are almost ready — check back soon.
        </div>
      </>
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (rating === 0) {
      setError("Tap a star to give a rating.");
      return;
    }
    if (text.trim().length < 3) {
      setError("Tell us a little more — at least a few words.");
      return;
    }
    setSubmitting(true);
    const { error: err } = await supabase.from("reviews").insert({
      spot_id: spotId,
      name: name.trim() === "" ? "Anonymous" : name.trim(),
      rating,
      text: text.trim().slice(0, 1000),
    });
    setSubmitting(false);
    if (err) {
      setError("Couldn't send your review — please try again.");
      return;
    }
    setSubmitted(true);
  }

  const average =
    reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : null;

  return (
    <>
      <p className="section-label">
        Reviews{average && <span className="avg-badge">★ {average} · {reviews.length}</span>}
      </p>

      {loading ? (
        <div className="reviews-placeholder">Loading reviews…</div>
      ) : reviews.length === 0 ? (
        <div className="reviews-placeholder">
          No reviews yet — be the first to review this spot.
        </div>
      ) : (
        <div className="review-list">
          {reviews.map((r) => (
            <div className="review-card" key={r.id}>
              <div className="review-head">
                <span className="review-name">{r.name}</span>
                <span className="review-stars" aria-label={`${r.rating} out of 5 stars`}>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <Star key={n} filled={n <= r.rating} />
                  ))}
                </span>
              </div>
              <p className="review-text">{r.text}</p>
              <span className="review-date">{timeAgo(r.created_at)}</span>
            </div>
          ))}
        </div>
      )}

      {submitted ? (
        <div className="review-thanks">
          <strong>Thanks for your review! 🎉</strong>
          <span>It will appear here once it's been checked by the Fyndo team.</span>
        </div>
      ) : (
        <form className="review-form" onSubmit={handleSubmit}>
          <p className="review-form-title">Been here? Leave a review</p>

          <div className="star-picker" role="radiogroup" aria-label="Your rating">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                type="button"
                key={n}
                className="star-btn"
                role="radio"
                aria-checked={rating === n}
                aria-label={`${n} star${n === 1 ? "" : "s"}`}
                onClick={() => setRating(n)}
                onMouseEnter={() => setHoverRating(n)}
                onMouseLeave={() => setHoverRating(0)}
              >
                <Star filled={n <= (hoverRating || rating)} />
              </button>
            ))}
            {rating > 0 && (
              <span className="star-hint">
                {["", "Not worth it", "Meh", "Decent", "Really good", "Hidden gem!"][rating]}
              </span>
            )}
          </div>

          <input
            className="review-input"
            type="text"
            placeholder="Your name (optional)"
            value={name}
            maxLength={60}
            onChange={(e) => setName(e.target.value)}
          />
          <textarea
            className="review-input review-textarea"
            placeholder="What did you eat? Was it worth the price?"
            value={text}
            maxLength={1000}
            rows={4}
            onChange={(e) => setText(e.target.value)}
          />

          {error && <p className="review-error">{error}</p>}

          <button className="btn btn-primary review-submit" type="submit" disabled={submitting}>
            {submitting ? "Sending…" : "Post review"}
          </button>
        </form>
      )}
    </>
  );
}
