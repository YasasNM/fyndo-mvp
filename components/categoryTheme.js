// One place to control how each category looks (emoji + card color).
// The class names map to the .media-* gradients in app/globals.css.
const THEMES = {
  "Street Food": { emoji: "🍢", mediaClass: "media-street-food" },
  "Cafe": { emoji: "☕", mediaClass: "media-cafe" },
  "Restaurant": { emoji: "🍽️", mediaClass: "media-restaurant" },
  "Bakery": { emoji: "🥐", mediaClass: "media-bakery" },
  "Rice & Curry": { emoji: "🍛", mediaClass: "media-rice-curry" },
  "Seafood": { emoji: "🦀", mediaClass: "media-seafood" },
};

export function categoryTheme(category) {
  return THEMES[category] || { emoji: "📍", mediaClass: "" };
}
