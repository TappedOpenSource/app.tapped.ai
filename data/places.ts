
// web only - restricted
const googlePlacesKey = 'AIzaSyCNxMOlRATil90cBmPAkqqSMtU26q5V46U';

export async function getPlaceById(placeId: string) {
  const fields = [
    'id',
    'displayName',
    'addressComponents',
    'location',
    'photoMetadatas',
  ];
  const url = `https://places.googleapis.com/v1/places/${
    placeId
  }?fields=${
    fields.join(',')
  }?key=${
    googlePlacesKey
  }`;
  // https://places.googleapis.com/v1/places/ChIJs5ydyTiuEmsR0fRSlU0C7k0?fields=id,displayName&key=API_KEY

  const headers = {
    'Content-Type': 'application/json',
    'X-Goog-Api-Key': googlePlacesKey,
  };

  fetch(url, {
    headers: headers,
  })
    .then((response) => response.json())
    .then((result) => console.log({ result }))
    .catch((error) => console.error('Error:', error));
}
