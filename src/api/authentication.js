import { post } from './fetch';

export const login = (email, password) => {
  //console.log( email, password);
  return post('/auth/login', {
    user: { email, password },
  });
};

export const createAccount = (email, password) => {
  return post('/users', {
    user: { email, password },
  });
};