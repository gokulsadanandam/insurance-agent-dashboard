import { BACKEND_URL, GET_POLICY_DETAIL_API , GET_USER_POLICY_DETAIL_API} from '../config';

export const getMessage = async () => {
  const response = await fetch(BACKEND_URL);

  const data = await response.json();

  if (data.message) {
    return data.message;
  }

  return Promise.reject('Failed to get message from backend');
};

export  const getPolicyDetail = async(policyId: string) => {
  const response = await fetch(BACKEND_URL + GET_POLICY_DETAIL_API + policyId);

  const data = await response.json();

  if (data) {
    return data;
  }

  return Promise.reject('Failed to get message from backend');

}

export  const getUserPoliciesDetail = async(userId: string) => {
  const response = await fetch(BACKEND_URL + GET_USER_POLICY_DETAIL_API + userId);

  const data = await response.json();

  if (data) {
    return data;
  }

  return Promise.reject('Failed to get message from backend');

}