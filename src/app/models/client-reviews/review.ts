export interface Review {
    id: number;
    createdAt: string;
    updatedAt: string;
    review: string;
    reviewer: Reviewer;
    client: number;
    replies: string[];

}
export interface Reviewer {
    email: string;
    firstName: string;
    lastName: string;
    role: string;
}
