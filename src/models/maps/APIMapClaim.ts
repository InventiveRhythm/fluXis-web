import type APIClub from "../clubs/APIClub";
import type { APIScore } from "../scores/APIScore";

export type APIMapClaim = {
    club: APIClub;
    score: APIScore;
};
