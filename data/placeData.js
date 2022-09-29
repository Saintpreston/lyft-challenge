import {data} from './data.js';

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

data.set('places', []);
data.set('placesLoaded', false);
data.set('placeFilter', '');

/**
 * Loads places and saves to the data store.
 * @return {!Promise<void>}
 */
export async function initializePlaces() {
  const placesWithImages = await loadPlacesWithImages();
  data.set('places', placesWithImages);
  data.set('placesLoaded', true);
}
async function getPlaces(){
  try{
  const imgData  = await fetch("https://byteboard.dev/api/data/places", {
  method: 'GET',
   'Content-Type': 'application/json'
});
  }
  catch(err){
    console.log(err)
  }
}
getPlaces()

/**
 * Loads the place list data and merges with place image data.
 * @return {!Promise<!Array<!Place>>}
 */



async function loadPlacesWithImages() {
  
  
/*  I1.  In order to display the list of places in our web app, we first need to get
    the place and image data from two different REST API endpoints. In
    data/placeData.js, implement

    function loadPlacesWithImages() { ... }

    The place list data can be obtained by making a GET request to
    https://byteboard.dev/api/data/places
    You can get the image URL for each place by making a GET request to
    https://byteboard.dev/api/data/img/{placeId}
  
  */
  
  
  
  // TODO: Load the place list data from https://byteboard.dev/api/data/places
  // and combine with images from https://byteboard.dev/api/data/img/{placeId}
  return [{
    id: 'example-a',
    name: 'TODO',
    address: 'TODO',
    stars: 0,
    reviews: 0,
    price: '$',
    description: 'TODO',
    img: '',
  }, {
    id: 'example-b',
    name: 'TODO',
    address: 'TODO',
    stars: 0,
    reviews: 0,
    price: '$',
    description: 'TODO',
    img: '',
  }];
}
