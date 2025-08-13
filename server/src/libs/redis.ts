import Redis from 'ioredis';
import { HOST } from '../constants/constants';

export const pubServer = new Redis({ host: HOST }); 
export const subServer = new Redis({ host: HOST }); 