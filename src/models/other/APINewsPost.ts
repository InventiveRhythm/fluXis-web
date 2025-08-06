export type APINewsPost = {
    id: string;
    image: string;
    title: string;
    blurb: string;
    time: number;
    type: APINewsType;
};

export enum APINewsType {
    News,
    Notice
}
