import type { APIModdingAction } from './APIModdingAction';

export type APIQueueInfo = {
    votes: boolean[];
    last_action: APIModdingAction;
};
