import { WeekUserLink } from './weekUserLink.model';

export interface Week {
    Id: number;
    Shopper?: number;
    Cost: number;
    Links: WeekUserLink[];
}
