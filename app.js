const GOOGLE_APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwgr6huja7ybEcmFBfsfU7vTRxjyECuVdaOHEYHdXcBqonZ5QJCmMdS7opApuMMQ4TR/exec";

const reviewsConnected = GOOGLE_APPS_SCRIPT_URL.startsWith("https://script.google.com/");

const places = [
  {
    id: "The lounge nepo",
    name: "THE LOUNGE",
    neighborhood: "3F Cinema lobby, Nepo Mall, Dagupan city",
    category: "Cafe",
    rating: 0,
    price: "$$",
    visited: "2026-09-18",
    summary: "A great place for a hangout after class, A place for comfort and peace.",
    review: "",
    bestFor: "A solo coffee, a good book, a calm catch-up",
    facebookUrl: "https://www.facebook.com/redeyecoffeeph/",
    image: "https://scontent.fcrk4-1.fna.fbcdn.net/v/t39.30808-6/493292497_983581030555855_5052369009609188800_n.jpg?stp=dst-jpg_tt6&cstp=mx2048x2048&ctp=s2048x2048&_nc_cat=100&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeGpfKI8P3oV8fG88AxzcAIZrYF445lyMnytgXjjmXIyfErMtYFX8AkdU8WPbqtC03L_-3r2NblSlCHkBLL1AVvj&_nc_ohc=SHOKLN3_aQoQ7kNvwEW3zgT&_nc_oc=AdqVRmiXTSOUz8LyBrfCoKGasAOHty_kjMAwu9FhTuLe1s3PAx0n8UW7ge_9UvMSk84&_nc_zt=23&_nc_ht=scontent.fcrk4-1.fna&_nc_gid=tUqrgLJEY2glhHHZOzH4yA&_nc_ss=7b2a8&oh=00_AQNh3YjyZgJw28HiC49TzaA406Aw_bcsmZVwD5zvkOEybA&oe=6AD634E5",
    imageAlt: "Redeye coffee",
    galleryImages: [
  "https://scontent.fcrk2-1.fna.fbcdn.net/v/t39.30808-6/489927746_983581040555854_1143073116002386430_n.jpg?stp=dst-jpg_tt6&cstp=mx2048x2048&ctp=s2048x2048&_nc_cat=108&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeHIW4nPuUXRG_cwoUyjsw7TLrXVWQwssRMutdVZDCyxE0c196T9Yywb65aDafli-OlAW0MljGwNoqDKShcQVYdh&_nc_ohc=kt52DAXPL-oQ7kNvwF5T_uC&_nc_oc=AdrmBTx4ZWM3jsZdvBtuNi0t8wzCVF1LyEHfixedukUByg83fZtKJ5YF_qpjOBhEORg&_nc_zt=23&_nc_ht=scontent.fcrk2-1.fna&_nc_gid=-cc9oeA45qDxVtKdeLnPCQ&_nc_ss=7b2a8&oh=00_AQP3qYSQJVSkv4ysaCtguH3apPdsmH7iafpRrJkdLGv4Ug&oe=6AD64DF0"
]
  },
  {
    id: "Sample name",
    name: "sample name",
    neighborhood: "Sample neighborhood",
    category: "Restaurant",
    rating: 4.6,
    price: "$$$",
    visited: "2026-08-29",
    summary: "Seasonal plates that feel thoughtful rather than fussy. Save room for whatever is baked today.",
    review: "A short menu, bright flavors, and service that gets the pace exactly right. The roasted carrots were the surprise of the table; the citrus cake made the decision to share dessert an easy one.",
    bestFor: "Dinner with a friend, a small celebration",
    facebookUrl: "Url put here",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=82",
    imageAlt: "Warmly lit dining room with tables set for dinner"
  },
  {
    id: "corner-store-books",
    name: "sample name",
    neighborhood: "Sample neighborhood",
    category: "Shop",
    rating: 4.5,
    price: "$$",
    visited: "2026-08-11",
    summary: "A lovely browse, a sharp staff-picks shelf, and the kind of shop where a quick stop takes an hour.",
    review: "The selection feels personal and the staff recommendations are actually useful. I went in for one paperback and came out with a reading list for the month.",
    bestFor: "Finding your next read or a thoughtful gift",
    facebookUrl: "Url put here",
    image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1000&q=82",
    imageAlt: "Shelves of books in a neighborhood bookstore"
  },
  {
    id: "sunroom-bakery",
    name: "sample name",
    neighborhood: "Sample neighborhood",
    category: "Bakery",
    rating: 4.7,
    price: "$",
    visited: "2026-07-22",
    summary: "Flaky pastries, strong coffee, and a morning line that moves faster than it looks.",
    review: "The laminated pastry is the real draw: crisp outside, soft through the middle, never too sweet. Get there before noon for the full case, and take an extra one for later.",
    bestFor: "A pastry run, an easy breakfast",
    facebookUrl: "Url put here",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1000&q=82",
    imageAlt: "Freshly baked bread arranged on a bakery counter"
  },
  {
    id: "stillwater-park",
    name: "sample name",
    neighborhood: "Sample neighborhood",
    category: "Outdoors",
    rating: 4.4,
    price: "$",
    visited: "2026-06-14",
    summary: "A pocket of green with a shady loop, a pond, and enough benches to make an afternoon of it.",
    review: "Best in the late afternoon, when the paths quiet down and the light gets soft. Bring something to read and take the longer loop around the water.",
    bestFor: "A walk, a reset, a picnic in the shade",
    facebookUrl: "Url put here",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1000&q=82",
    imageAlt: "Green walking path winding through a leafy park"
  },
  {
    id: "good-days-noodles",
    name: "sample name",
    neighborhood: "Sample neighborhood",
    category: "Restaurant",
    rating: 4.3,
    price: "$$",
    visited: "2026-05-30",
    summary: "A comforting bowl, a short menu, and a quick lunch that does not taste like one.",
    review: "The broth has real depth and the chili oil is worth adding. It gets busy at lunch, but the line turns over quickly. Go hungry and keep the afternoon clear for a walk.",
    bestFor: "A quick lunch or a rainy-day bowl",
    facebookUrl: "Url put here",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=1000&q=82",
    imageAlt: "A steaming bowl of noodles ready to eat"
  }
];

const priceLevelImages = {
  "$": "Images/Low price.jpg",
  "$$": "Images/Med price.jpg",
  "$$$": "Images/High price.jpg",
  Free: "Images/Low price.jpg"
};
const priceLevelLabels = {
  "$": "Low price",
  "$$": "Moderate price",
  "$$$": "High price",
  Free: "Free"
};

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

  const imageWrap = document.createElement("button");
  imageWrap.className = "card-image";
  imageWrap.type = "button";
  imageWrap.dataset.openGallery = place.id;
  imageWrap.setAttribute("aria-label", `View photos of ${place.name}`);
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
  if (place.facebookUrl) {
    const nameLink = document.createElement("a");
    nameLink.className = "place-name-link";
    nameLink.href = place.facebookUrl;
    nameLink.target = "_blank";
    nameLink.rel = "noopener noreferrer";
    nameLink.textContent = place.name;
    title.append(nameLink);
  } else {
    title.textContent = place.name;
  }
  const summary = document.createElement("p");
  summary.className = "card-summary";
  summary.textContent = place.summary;

  const footer = document.createElement("div");
  footer.className = "card-footer";
  const readButton = document.createElement("button");
  readButton.className = "text-button";
  readButton.type = "button";
  readButton.dataset.openPlace = place.id;
  readButton.textContent = "Read the review \u2192";

  if (place.price) {
    const price = document.createElement("span");
    price.className = "price-level";
    price.setAttribute("aria-label", priceLevelLabels[place.price] || "Price not listed");
    const priceImage = document.createElement("img");
    priceImage.className = "price-level-icon";
    priceImage.src = priceLevelImages[place.price] || priceLevelImages["$"];
    priceImage.alt = "";
    price.append(priceImage);
    if (place.price === "Free") price.append("Free");
    footer.append(price);
  }
  footer.append(readButton);

  body.append(topline, title, summary);
  body.append(footer);
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

function openPlace(place, showGallery = true) {
  dialogContent.replaceChildren();
  if (showGallery) {
    const photos = [place.image, ...(place.galleryImages || []).filter(Boolean)];
    const gallery = document.createElement("section");
    gallery.className = "dialog-gallery";
    gallery.setAttribute("aria-label", `Photos of ${place.name}`);
    const photo = document.createElement("img");
    photo.className = "dialog-photo";
    photo.src = photos[0];
    photo.alt = place.imageAlt;
    gallery.append(photo);

    if (photos.length > 1) {
      let activePhoto = 0;
      const controls = document.createElement("div");
      controls.className = "dialog-gallery-controls";
      const previous = document.createElement("button");
      previous.type = "button";
      previous.className = "gallery-arrow";
      previous.setAttribute("aria-label", "Previous photo");
      previous.textContent = "\u2190";
      const count = document.createElement("span");
      count.className = "gallery-count";
      const next = document.createElement("button");
      next.type = "button";
      next.className = "gallery-arrow";
      next.setAttribute("aria-label", "Next photo");
      next.textContent = "\u2192";
      const thumbnails = document.createElement("div");
      thumbnails.className = "dialog-gallery-thumbnails";

      const selectPhoto = (index) => {
        activePhoto = (index + photos.length) % photos.length;
        photo.src = photos[activePhoto];
        photo.alt = activePhoto === 0 ? place.imageAlt : `${place.name}, photo ${activePhoto + 1}`;
        count.textContent = `${activePhoto + 1} / ${photos.length}`;
        thumbnails.querySelectorAll("button").forEach((button, buttonIndex) => {
          button.setAttribute("aria-pressed", String(buttonIndex === activePhoto));
        });
      };

      photos.forEach((source, index) => {
        const thumbnail = document.createElement("button");
        thumbnail.type = "button";
        thumbnail.className = "gallery-thumbnail";
        thumbnail.setAttribute("aria-label", `Show photo ${index + 1}`);
        thumbnail.setAttribute("aria-pressed", String(index === 0));
        const thumbnailImage = document.createElement("img");
        thumbnailImage.src = source;
        thumbnailImage.alt = "";
        thumbnail.append(thumbnailImage);
        thumbnail.addEventListener("click", () => selectPhoto(index));
        thumbnails.append(thumbnail);
      });

      previous.addEventListener("click", () => selectPhoto(activePhoto - 1));
      next.addEventListener("click", () => selectPhoto(activePhoto + 1));
      selectPhoto(0);
      controls.append(previous, count, next);
      gallery.append(controls, thumbnails);
    }
    dialogContent.append(gallery);
  } else {
    const image = document.createElement("img");
    image.className = "dialog-photo";
    image.src = place.image;
    image.alt = place.imageAlt;
    dialogContent.append(image);
  }

  const copy = document.createElement("div");
  copy.className = "dialog-copy";
  const kicker = document.createElement("p");
  kicker.className = "dialog-kicker";
  kicker.textContent = place.category.toUpperCase();
  const titleRow = document.createElement("div");
  titleRow.className = "dialog-title-row";
  const heading = document.createElement("h2");
  heading.id = "dialog-title";
  if (place.facebookUrl) {
    const nameLink = document.createElement("a");
    nameLink.className = "place-name-link";
    nameLink.href = place.facebookUrl;
    nameLink.target = "_blank";
    nameLink.rel = "noopener noreferrer";
    nameLink.textContent = place.name;
    heading.append(nameLink);
  } else {
    heading.textContent = place.name;
  }
  titleRow.append(heading, makeRating(place.rating));
  const meta = document.createElement("p");
  meta.className = "dialog-meta";
  meta.textContent = `${place.neighborhood}  \u00b7  ${priceLevelLabels[place.price] || "Price not listed"}  \u00b7  Visited ${new Date(`${place.visited}T12:00:00`).toLocaleDateString(undefined, { month: "long", year: "numeric" })}`;
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
  dialogContent.append(copy);
  dialog.showModal();
}

grid.addEventListener("click", (event) => {
  const photoButton = event.target.closest("button[data-open-gallery]");
  if (photoButton) {
    const place = places.find((entry) => entry.id === photoButton.dataset.openGallery);
    if (place) openPlace(place, true);
    return;
  }
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
