import { data } from "./data.js";

/**
 * @typedef{{
 *   id: string,
 *   name: string,
 *   address: string,
 *   stars: number,
 *   reviews: number,
 *   price: string,
 *   description: string,
 *   img?: string,
 * }}
 */
export let Place;

data.set("places", []);
data.set("placesLoaded", false);
data.set("placeFilter", "");

/**
 * Loads places and saves to the data store.
 * @return {!Promise<void>}
 */
export async function initializePlaces() {
  const placesWithImages = await loadPlacesWithImages();
  data.set("places", placesWithImages);
  data.set("placesLoaded", true);
}

/**
 * Loads the place list data and merges with place image data.
 * @return {!Promise<!Array<!Place>>}
 */

async function loadPlacesWithImages() {
  // The gotcha here is, you have to always keep in mind that promises are immutable, meaning you can't directly create a property on the places to add images, you need to create an empty variable and combine those promises at the same time

  const result = [];

  const data = await fetch("https://byteboard.dev/api/data/places");

  const jsonPlaceResult = await data.json();
  const places = jsonPlaceResult.places;
    
  const listofPromises = [];
  for (let index = 0; index < places.length; index++) {
    const currentPlace = places[index];
    const placeId = currentPlace.id;
    const promise = fetch(`https://byteboard.dev/api/data/img/${placeId}`);
    listofPromises.push(promise);
  }

  const nonJSONImages = await Promise.all(listofPromises);

  function convertToJson(img) {
    return img.json();
  }

  const promiseOfImages = nonJSONImages.map(convertToJson);
  const JSONImages = await Promise.all(promiseOfImages);

  for (let index = 0; index < places.length; index++) {
    const currentPlace = places[index];
    const currentImage = JSONImages[index];
    const currentImageURL = currentImage.img;
    const combineObject = {...currentPlace , ...{img: currentImageURL}}
    result.push(combineObject);
  }

  return result;

  return [
    {
      id: "example-a",
      name: "TODO",
      address: "TODO",
      stars: 0,
      reviews: 0,
      price: "$",
      description: "TODO",
      img: "",
    },
    {
      id: "example-b",
      name: "TODO",
      address: "TODO",
      stars: 0,
      reviews: 0,
      price: "$",
      description: "TODO",
      img: "",
    },
  ];
}
