export interface PersonajeFavoritoInterface {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    image: string;
    created: string;
    origin: { name: string; url: string };
    location: { name: string; url: string };
    episode: string[];
    url: string;
}