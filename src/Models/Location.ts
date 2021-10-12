interface Location {
  address: string;
  address2: string;
  zipCode: number;
  country: string;
  state: string;
  city: string;
  latLng: {
    latitude:number;
    longitude:number;
  };
}
export default Location;