import { createElementWithHtml } from "../helpers/createElementWithHtml.js";
import { data } from "../data/data.js";
import { escapeString } from "../helpers/escapeString.js";
import { Place } from "../data/placeData.js";
import { stars } from "./stars.js";
import { navigateToPlace } from "../helpers/navigation.js";

/** {?HTMLElement} The root element for this component. */
let rootEl;

data.onChange(handleDataChange);

/**
 * @param {string} key
 */
function handleDataChange(key) {
  const prevRootEl = rootEl;
  if (!prevRootEl) return;
  const newPlaceList = placeList();
  prevRootEl.replaceWith(newPlaceList);
}

/**
 * Get all of the places that match the filter string.
 * @param {!Array<!Place>} places
 * @param {string} filter
 * @return {!Array<!Place>}
 */
export function getFilteredPlaces(places, filter) {
  if (filter === "") {
    return places;
  }
  const lowCaseSearchTerm = filter.toLowerCase();

  const filteredList = [];

  for (let i = 0; i < places.length; i++) {
    const currentPlace = places[i];
    //this down
    const { name, address, description } = currentPlace;
    const doesMatchName = name.toLowerCase().startsWith(lowCaseSearchTerm);
    const doesMatchAddress = address
      .toLowerCase()
      .startsWith(lowCaseSearchTerm);
    const doesMatchDescription = description
      .toLowerCase()
      .startsWith(lowCaseSearchTerm);

    if (doesMatchName || doesMatchAddress || doesMatchDescription) {
      filteredList.push(currentPlace);
    }
  }

  return filteredList;
}

/**
 * Renders a list of places.
 * @return {!HTMLElement}
 */
export function placeList() {
  const filter = data.get("placeFilter") || "";
  const allPlaces = data.get("places");
  const places = getFilteredPlaces(allPlaces, filter);
  rootEl = createElementWithHtml('<div class="place-list"></div>');
  if (!data.get("placesLoaded")) {
    rootEl.innerHTML = '<div class="place-list-loading">Loading</div>';
  } else {
    places.forEach((place) => {
      const placeEl = placeRow(place);
      placeEl.addEventListener("click", () =>{
        navigateToPlace(place.id);
      })
      rootEl.appendChild(placeEl)
    });
  }
  return rootEl;
}

/* export function navigateToPlace(placeId) {
  const href = `${location.href.split('?')[0]}?place=${placeId}`;
  history.pushState({}, '', href);
  window.dispatchEvent(new Event('popstate'));
}
* /


/**
 * Renders a place row.
 * @param {!Place}
 * @return {!HTMLElement}
 */
function placeRow(place) {
  return createElementWithHtml(`
    <div class="place-row" data-place-row data-place-id="${escapeString(
      place.id
    )}">
      <div class="place-row-details">
        <div class="place-row-name">${escapeString(place.name)}</div>
        <div class="place-row-address">${escapeString(place.address)}</div>
        <div class="place-row-stars">
          ${stars(place.stars).outerHTML}
          &nbsp;(${escapeString(place.reviews + "")})
          &nbsp;${escapeString(place.price)}
        </div>
      </div>
      <img class="place-row-img" src="${escapeString(place.img)}" />
    </div>
  `);
}
