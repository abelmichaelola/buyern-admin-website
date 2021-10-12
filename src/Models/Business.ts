import Location from "./Location";

interface BUSINESS_TYPE {}
class Business {
  id?: string;
  name?: string;
  shortName?: string;
  email?: string;
  phone?: number;
  about?: string;
  type?: BUSINESS_TYPE;
  HQ_Location?: Location;
  contacts?: {
    emails?: string[];
    phones?: number[];
    linkedLocationId?: string;
  }[];
  logo?: string;
  coverImage?: string;
  subBusinesses?: Business[];

  constructor() {}
}
export default Business;
