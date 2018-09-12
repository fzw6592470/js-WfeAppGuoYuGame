import { stringify } from 'qs';
import request from '@/utils/request';

export async function queryMemberList(params) {
  return request(`/member/member_list?${stringify(params)}`);
}


export async function removeMemberList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/member/member_list?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'delete',
    },
  });
}


export async function addMemberList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/member/member_list?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'post',
    },
  });
}

export async function updateMemberList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/member/member_list?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'update',
    },
  });
}





