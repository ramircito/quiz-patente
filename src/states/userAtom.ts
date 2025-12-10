// import { atomWithStorage } from 'jotai/utils';
// import type { User } from '../models/user';

// export const usersAtom = atomWithStorage<Array<User>>(
//     'users',
//     []
// );

// export const currentUser = atomWithStorage<User | null>(
//     'currentUser',
//     null
// );


import { atomWithStorage } from 'jotai/utils';
import type { User } from '../models/user.ts';

export const usersAtom = atomWithStorage<Array<User>>(
    'users',
    []
);

export const currentUser = atomWithStorage<User | null>(
    'currentUser',
    null
);
