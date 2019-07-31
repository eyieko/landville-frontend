import { Client } from "./Client";
import { Coordinates } from "./Coordinates";
import { Address } from "./Address";

export interface Property {
  id?: number;
  price?: number;
  lot_size?: number;
  image_others?: string[];
  address?: Address;
  coordinates?: Coordinates;
  created_at?: string;
  updated_at?: string;
  title?: string;
  property_type?: string;
  description?: string;
  list_date?: string;
  is_published?: boolean;
  is_sold?: boolean;
  sold_at?: string;
  bedrooms?: number;
  bathrooms?: number;
  garages?: number;
  image_main?: string;
  video?: string;
  view_count?: number;
  last_viewed?: string;
  purchase_plan?: string;
  slug?: string;
  client?: Client;
}

export interface PropertiesResponse extends Property {
  data: {
    properties: {
      count: number;
      next: string;
      previous: string;
      results: Property[];
    };
  };
}
