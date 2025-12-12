import { atomWithStorage } from 'jotai/utils';
import type { User } from '../models/user';

export const currentUserAtom = atomWithStorage<User | null>(
    'currentUserAtom',
    null
);
