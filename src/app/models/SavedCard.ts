export interface SavedCardResponse {
    data: {
        saved_cards: SavedCard[];
        message: string;
    };
}

export interface SavedCard {
    id: number;
    user_detail: {
        email: string,
        first_name: string,
        last_name: string,
        role: string,
        image: string
    };
    created_at: string;
    updated_at: string;
    embed_token: string;
    card_number: string;
    card_expiry: string;
    card_brand: string;
    user: number;
}
