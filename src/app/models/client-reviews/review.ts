export interface Review {
    id: number;
    created_at: string;
    updated_at: string;
    review: string;
    reviewer: Reviewer; 
    client: number;
    replies: string[];

}
export interface Reviewer { 
    email: string;
    first_name: string;
    last_name: string;
    role: string;
}
