export interface Note {
    id: number;
    title: string;
    content: string;
    createdAt: string; // ISO string de fecha
    updatedAt: string; // ISO string de fecha
    userId: number;
    visible: boolean;
}