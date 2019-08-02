import { Address } from './Address';
import { Coordinates } from './Coordinates'
import { Client } from './Client'

export interface PropertyDetail {
    data: {
        property: {
            id: number,
            price: number,
            lot_size: number,
            image_others: string[],
            address: Address
            coordinates: Coordinates
            created_at: string,
            updated_at: string,
            title: string,
            property_type: string,
            description: string,
            list_date: string,
            is_published: boolean,
            is_sold: boolean,
            sold_at: string,
            bedrooms: string,
            bathrooms: string,
            garages: string,
            image_main: string,
            video: string,
            view_count: number,
            last_viewed: string,
            purchase_plan: string,
            slug: string,
            client: Client
        }
    }
}