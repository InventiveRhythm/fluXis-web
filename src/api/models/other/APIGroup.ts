import type APIUser from '@/api/models/users/APIUser';

export type APIGroup = {
    id: string
    name: string
    tag: string
    color: string
    members?: [APIUser]
}