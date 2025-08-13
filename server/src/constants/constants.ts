/**
 * Can be AS/US/EU
 */
export const REGION = process.env.REGION || 'US'; 
/**
 * Can be 3000, 3001, 3002
 */
export const PORT = process.env.PORT || 3000;
/**
 * When redis runs in docker, it runs on redis.
 * 
 * When redis runs locally, it uses localhost.
 */
export const HOST = process.env.NODE_ENV === 'development' ? 'localhost' : 'redis';