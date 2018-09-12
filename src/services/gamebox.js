import { stringify } from 'qs';
import request from '@/utils/request';

export async function queryGameList(params) {
  return request(`/game/gameList?${stringify(params)}`);
}


export async function removeGameList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/game/gameList?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'delete',
    },
  });
}


export async function addGameList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/game/gameList?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'post',
    },
  });
}

export async function updateGameList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/game/gameList?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'update',
    },
  });
}

export async function queryDollList(params) {
  return request(`/doll/dollList?${stringify(params)}`);
}


export async function removeDollList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/doll/dollList?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'delete',
    },
  });
}


export async function addDollList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/doll/dollList?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'post',
    },
  });
}

export async function updateDollList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/doll/dollList?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'update',
    },
  });
}



export async function queryMedalList(params) {
  return request(`/medal/medalList?${stringify(params)}`);
}


export async function removeMedalList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/medal/medalList?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'delete',
    },
  });
}


export async function addMedalList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/medal/medalList?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'post',
    },
  });
}

export async function updateMedalList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/medal/medalList?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'update',
    },
  });
}





