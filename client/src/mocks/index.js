import * as userHandlers from './handlers/user';
import * as storageHandlers from './handlers/storage';
import * as chatHandlers from './handlers/chat';

export const handlers = [
	...Object.values(userHandlers),
	...Object.values(storageHandlers),
	...Object.values(chatHandlers),
];
