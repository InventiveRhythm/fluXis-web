import type APIUser from '@/api/models/users/APIUser';
import type APIMap from '@/api/models/maps/APIMap';
import type { APIMapSetStatus } from '@/api/models/maps/APIMapSetStatus';

export type APIMapSet = {
    id: number
    creator: APIUser
    maps: APIMap[]
    title: string
    artist: string
    source: string
    tags: string[]
    flags: number
    status: APIMapSetStatus
    submitted: number
    updated: number
}