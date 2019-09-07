import { Address } from './Address';
import { Client } from './Client';
import { Coordinates } from './Coordinates';

export interface PropertyDetail {
  data: {
    property: {
      id: number,
      price: number,
      lotSize: number,
      imageOthers: string[],
      address: Address
      coordinates: Coordinates
      createdAt: string,
      updatedAt: string,
      title: string,
      propertyType: string,
      description: string,
      listDate: string,
      isPublished: boolean,
      isSold: boolean,
      soldAt: string,
      bedrooms: string,
      bathrooms: string,
      garages: string,
      imageMain: string,
      video: string,
      viewCount: number,
      lastViewed: string,
      purchasePlan: string,
      slug: string,
      client: Client
    }
  }
}
