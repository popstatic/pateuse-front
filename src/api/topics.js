import { get } from './fetch';

export const getTopics = () => {  
  return get('/topics/getAllTopics');
};