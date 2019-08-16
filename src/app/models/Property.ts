import { Client } from './Client';
import { Coordinates } from './Coordinates';
import { Address } from './Address';

export interface Property {
  id?: number;
  price?: number;
  lotSize?: number;
  imageOthers?: string[];
  address?: Address;
  coordinates?: Coordinates;
  createdAt?: string;
  updatedAt?: string;
  title?: string;
  propertyType?: string;
  description?: string;
  listDate?: string;
  isPublished?: boolean;
  isSold?: boolean;
  soldAt?: string;
  bedrooms?: number;
  bathrooms?: number;
  garages?: number;
  imageMain?: string;
  video?: string;
  viewCount?: number;
  lastViewed?: string;
  purchasePlan?: string;
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


export interface PropertiesWishlistResponse extends Property {
  data: {
    property: Property[];
  };
}
