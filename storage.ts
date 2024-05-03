import { Storage } from '@plasmohq/storage';

export const sessionStorage = new Storage({ area: 'session' });
export const syncStorage = new Storage();
