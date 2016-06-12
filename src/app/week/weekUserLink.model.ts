import { User } from '../user/user.model';

export interface WeekUserLink {
    Paid: number,
    Slices: number,
    User: User
}