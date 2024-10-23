type PlaceType = "locality" | "administrative_area_level_1" | "country" | "street_number" | "route" | "postal_code";
type AddressComponent = {
  name: string;
  shortName: string;
  types: string[];
};

export function getAddressComponent(
  addressComponents: AddressComponent[],
  {
    type = "locality",
    defaultIdent = "Unknown",
    longName = false,
  }: {
    type: PlaceType;
    defaultIdent?: string;
    longName: boolean;
  },
): string {
  const addressComponent = addressComponents?.filter((element) => element.types.includes(type));
  // final political =
  //  shortNames?.where((element) => element.types.contains('political'));

  if (addressComponent === null || addressComponent.length === 0) {
    return defaultIdent;
  }

  if (longName) {
    return addressComponent[0].name;
  }

  return addressComponent[0].shortName;
}

export function formattedFullAddress(addressComponents: AddressComponent[]) {
  const streetNumber = getAddressComponent(addressComponents, {
    type: "street_number",
    longName: true,
  });

  const street = getAddressComponent(addressComponents, {
    type: "route",
    longName: true,
  });

  const city = getAddressComponent(addressComponents, {
    type: "locality",
    longName: true,
  });

  const zipCode = getAddressComponent(addressComponents, {
    type: "postal_code",
    longName: true,
  });

  if (!streetNumber && !street) {
    return `${city} ${zipCode}`;
  }

  return `${streetNumber} ${street}, ${city} ${zipCode}`;
}
