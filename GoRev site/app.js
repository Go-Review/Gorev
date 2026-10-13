const GOOGLE_APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwgr6huja7ybEcmFBfsfU7vTRxjyECuVdaOHEYHdXcBqonZ5QJCmMdS7opApuMMQ4TR/exec";

const reviewsConnected = GOOGLE_APPS_SCRIPT_URL.startsWith("https://script.google.com/");

const places = [
  {
    id: "morrow-coffee",
    name: "Morrow Coffee",
    neighborhood: "Sample neighborhood",
    category: "Cafe",
    rating: 4.8,
    price: "$$",
    visited: "2026-09-18",
    summary: "A slow-morning kind of coffee shop, with excellent espresso and room to stay awhile.",
    review: "The espresso is balanced, the playlist is gentle, and nobody minds if you take the window seat for an extra hour. Come for a quiet start and the cardamom bun.",
    bestFor: "A solo coffee, a good book, a calm catch-up",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1000&q=82",
    imageAlt: "Coffee and a pastry on a cafe table"
  },
  {
    id: "little-fern",
    name: "The Little Fern",
    neighborhood: "Sample neighborhood",
    category: "Restaurant",
    rating: 4.6,
    price: "$$$",
    visited: "2026-08-29",
    summary: "Seasonal plates that feel thoughtful rather than fussy. Save room for whatever is baked today.",
    review: "A short menu, bright flavors, and service that gets the pace exactly right. The roasted carrots were the surprise of the table; the citrus cake made the decision to share dessert an easy one.",
    bestFor: "Dinner with a friend, a small celebration",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=82",
    imageAlt: "Warmly lit dining room with tables set for dinner"
  },
  {
    id: "corner-store-books",
    name: "Corner Store Books",
    neighborhood: "Sample neighborhood",
    category: "Shop",
    rating: 4.5,
    price: "$$",
    visited: "2026-08-11",
    summary: "A lovely browse, a sharp staff-picks shelf, and the kind of shop where a quick stop takes an hour.",
    review: "The selection feels personal and the staff recommendations are actually useful. I went in for one paperback and came out with a reading list for the month.",
    bestFor: "Finding your next read or a thoughtful gift",
    image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1000&q=82",
    imageAlt: "Shelves of books in a neighborhood bookstore"
  },
  {
    id: "sunroom-bakery",
    name: "Sunroom Bakery",
    neighborhood: "Sample neighborhood",
    category: "Bakery",
    rating: 4.7,
    price: "$",
    visited: "2026-07-22",
    summary: "Flaky pastries, strong coffee, and a morning line that moves faster than it looks.",
    review: "The laminated pastry is the real draw: crisp outside, soft through the middle, never too sweet. Get there before noon for the full case, and take an extra one for later.",
    bestFor: "A pastry run, an easy breakfast",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1000&q=82",
    imageAlt: "Freshly baked bread arranged on a bakery counter"
  },
  {
    id: "stillwater-park",
    name: "Stillwater Gardens",
    neighborhood: "Sample neighborhood",
    category: "Outdoors",
    rating: 4.4,
    price: "Free",
    visited: "2026-06-14",
    summary: "A pocket of green with a shady loop, a pond, and enough benches to make an afternoon of it.",
    review: "Best in the late afternoon, when the paths quiet down and the light gets soft. Bring something to read and take the longer loop around the water.",
    bestFor: "A walk, a reset, a picnic in the shade",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1000&q=82",
    imageAlt: "Green walking path winding through a leafy park"
  },
  {
    id: "good-days-noodles",
    name: "Good Days Noodles",
    neighborhood: "Sample neighborhood",
    category: "Restaurant",
    rating: 4.3,
    price: "$$",
    visited: "2026-05-30",
    summary: "A comforting bowl, a short menu, and a quick lunch that does not taste like one.",
    review: "The broth has real depth and the chili oil is worth adding. It gets busy at lunch, but the line turns over quickly. Go hungry and keep the afternoon clear for a walk.",
    bestFor: "A quick lunch or a rainy-day bowl",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=1000&q=82",
    imageAlt: "A steaming bowl of noodles ready to eat"
  }
];

const grid = document.querySelector("#place-grid");
const filterRow = document.querySelector("#category-filters");
const searchInput = document.querySelector("#search-input");
const sortSelect = document.querySelector("#sort-select");
const guideCount = document.querySelector("#guide-count");
const resultStatus = document.querySelector("#result-status");
const emptyState = document.querySelector("#empty-state");
const dialog = document.querySelector("#place-dialog");
const dialogContent = document.querySelector("#dialog-content");
const reviewForm = document.querySelector("#review-form");
const reviewPlace = document.querySelector("#review-place");
const reviewStatus = document.querySelector("#review-status");
const reviewSubmit = document.querySelector("#review-submit");
const reviewFrame = document.querySelector("#review-submit-frame");

let activeCategory = "All places";
let reviewTimeout;

function setupReviewForm() {
  places.forEach((place) => {
    const option = document.createElement("option");
    option.value = place.id;
    option.textContent = place.name;
    reviewPlace.append(option);
  });

  const requestedPlace = new URLSearchParams(window.location.search).get("place");
  if (places.some((place) => place.id === requestedPlace)) reviewPlace.value = requestedPlace;

  if (!reviewsConnected) {
    reviewStatus.textContent = "Review collection is not connected yet. Follow the Google Sheets setup in README.md before publishing.";
    reviewSubmit.disabled = true;
  }
}

function makeRating(rating) {
  const wrapper = document.createElement("span");
  wrapper.className = "rating";
  wrapper.setAttribute("aria-label", `${rating} out of 5 stars`);
  const star = document.createElement("span");
  star.className = "rating-star";
  star.setAttribute("aria-hidden", "true");
  star.textContent = "\u2605";
  const value = document.createElement("span");
  value.textContent = rating.toFixed(1);
  wrapper.append(star, value);
  return wrapper;
}

function makeCard(place, index) {
  const article = document.createElement("article");
  article.className = "review-card";
  article.style.animationDelay = `${Math.min(index, 5) * 55}ms`;

  const imageWrap = document.createElement("div");
  imageWrap.className = "card-image";
  const image = document.createElement("img");
  image.src = place.image;
  image.alt = place.imageAlt;
  image.loading = "lazy";
  image.decoding = "async";
  const category = document.createElement("span");
  category.className = "card-tag";
  category.textContent = place.category;
  imageWrap.append(image, category);

  const body = document.createElement("div");
  body.className = "card-body";
  const topline = document.createElement("div");
  topline.className = "card-topline";
  const location = document.createElement("span");
  location.className = "card-location";
  location.textContent = place.neighborhood;
  topline.append(location, makeRating(place.rating));

  const title = document.createElement("h3");
  title.textContent = place.name;
  const summary = document.createElement("p");
  summary.className = "card-summary";
  summary.textContent = place.summary;

  const footer = document.createElement("div");
  footer.className = "card-footer";
  const price = document.createElement("span");
  price.className = "price-label";
  price.textContent = place.price;
  const readButton = document.createElement("button");
  readButton.className = "text-button";
  readButton.type = "button";
  readButton.dataset.openPlace = place.id;
  readButton.textContent = "Read the review \u2192";
  footer.append(price, readButton);

  body.append(topline, title, summary, footer);
  article.append(imageWrap, body);
  return article;
}

function renderFilters() {
  const categories = ["All places", ...new Set(places.map((place) => place.category))];
  filterRow.replaceChildren();
  categories.forEach((category) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "filter-chip";
    button.textContent = category;
    button.setAttribute("aria-pressed", String(category === activeCategory));
    button.addEventListener("click", () => {
      activeCategory = category;
      renderFilters();
      renderPlaces();
    });
    filterRow.append(button);
  });
}

function renderPlaces() {
  const query = searchInput.value.trim().toLowerCase();
  const matchingPlaces = places.filter((place) => {
    const matchesCategory = activeCategory === "All places" || place.category === activeCategory;
    const searchable = `${place.name} ${place.neighborhood} ${place.category} ${place.summary} ${place.bestFor}`.toLowerCase();
    return matchesCategory && searchable.includes(query);
  });

  if (sortSelect.value === "rating") matchingPlaces.sort((a, b) => b.rating - a.rating);
  if (sortSelect.value === "recent") matchingPlaces.sort((a, b) => b.visited.localeCompare(a.visited));

  grid.replaceChildren(...matchingPlaces.map(makeCard));
  guideCount.textContent = `${places.length} ${places.length === 1 ? "PLACE" : "PLACES"}`;
  resultStatus.textContent = `Showing ${matchingPlaces.length} of ${places.length} ${places.length === 1 ? "place" : "places"}`;
  emptyState.hidden = matchingPlaces.length > 0;
  grid.hidden = matchingPlaces.length === 0;
}

function openPlace(place) {
  dialogContent.replaceChildren();
  const image = document.createElement("img");
  image.className = "dialog-photo";
  image.src = place.image;
  image.alt = place.imageAlt;

  const copy = document.createElement("div");
  copy.className = "dialog-copy";
  const kicker = document.createElement("p");
  kicker.className = "dialog-kicker";
  kicker.textContent = place.category.toUpperCase();
  const titleRow = document.createElement("div");
  titleRow.className = "dialog-title-row";
  const heading = document.createElement("h2");
  heading.id = "dialog-title";
  heading.textContent = place.name;
  titleRow.append(heading, makeRating(place.rating));
  const meta = document.createElement("p");
  meta.className = "dialog-meta";
  meta.textContent = `${place.neighborhood}  \u00b7  ${place.price}  \u00b7  Visited ${new Date(`${place.visited}T12:00:00`).toLocaleDateString(undefined, { month: "long", year: "numeric" })}`;
  const review = document.createElement("p");
  review.className = "dialog-review";
  review.textContent = `\u201c${place.review}\u201d`;
  const details = document.createElement("div");
  details.className = "dialog-detail";
  const bestFor = document.createElement("p");
  const bestForLabel = document.createElement("strong");
  bestForLabel.textContent = "BEST FOR";
  bestFor.append(bestForLabel, document.createTextNode(place.bestFor));
  const score = document.createElement("p");
  const scoreLabel = document.createElement("strong");
  scoreLabel.textContent = "THE VERDICT";
  score.append(scoreLabel, document.createTextNode(`${place.rating.toFixed(1)} / 5`));
  details.append(bestFor, score);
  copy.append(kicker, titleRow, meta, review, details);
  dialogContent.append(image, copy);
  dialog.showModal();
}

grid.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-open-place]");
  if (!button) return;
  const place = places.find((entry) => entry.id === button.dataset.openPlace);
  if (place) openPlace(place);
});

searchInput.addEventListener("input", renderPlaces);
sortSelect.addEventListener("change", renderPlaces);
document.querySelector("#reset-filters").addEventListener("click", () => {
  activeCategory = "All places";
  searchInput.value = "";
  renderFilters();
  renderPlaces();
  searchInput.focus();
});
document.querySelector("#dialog-close").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});

window.addEventListener("message", (event) => {
  const fromGoogle = event.origin === "https://script.google.com" || event.origin.endsWith(".googleusercontent.com");
  if (!fromGoogle || event.data?.source !== "gorev-review") return;
  clearTimeout(reviewTimeout);
  reviewSubmit.disabled = false;
  if (event.data.ok) {
    reviewForm.reset();
    reviewStatus.textContent = "Thanks. Your review is in the moderation queue.";
  } else {
    reviewStatus.textContent = "We couldn't save that review. Please try again in a moment.";
  }
});

reviewForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!reviewsConnected) {
    reviewStatus.textContent = "Review collection is not connected yet. Follow the Google Sheets setup in README.md.";
    return;
  }

  const formData = new FormData(reviewForm);
  if (formData.get("website")) {
    reviewForm.reset();
    reviewStatus.textContent = "Thanks. Your review is in the moderation queue.";
    return;
  }

  reviewSubmit.disabled = true;
  reviewStatus.textContent = "Sending your review...";
  reviewForm.action = GOOGLE_APPS_SCRIPT_URL;
  reviewForm.method = "POST";
  reviewForm.target = reviewFrame.name;
  reviewTimeout = setTimeout(() => {
    reviewSubmit.disabled = false;
    reviewStatus.textContent = "We couldn't confirm delivery. Check your connection and try again.";
  }, 20000);
  reviewForm.submit();
});

setupReviewForm();
renderFilters();
renderPlaces();

if (window.location.hash === "#write-review") {
  window.requestAnimationFrame(() => {
    document.querySelector("#write-review").scrollIntoView({ block: "start" });
  });
}