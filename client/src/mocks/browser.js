import { setupWorker } from 'msw';
import { handlers } from './index';

export const serviceWorker = setupWorker(...handlers);
