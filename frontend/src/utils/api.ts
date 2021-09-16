import { Policy } from '../+state/reducer';
import { BACKEND_URL, GET_POLICY_DETAIL_API , GET_USER_POLICY_DETAIL_API, UPDATE_USER_POLICY_DETAIL_API} from '../config';

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

  if(response.status === 404) {
    return Promise.reject('No Records Found in Database for the Query.')
  }

  const data = await response.json();

  if (data) {
    return data;
  }

  return Promise.reject('Failed to get message from backend');

}

export  const getUserPoliciesDetail = async(userId: string, skip = 0, limit = 25) => {
  const response = await fetch(`${BACKEND_URL}${GET_USER_POLICY_DETAIL_API}/${userId}?skip=${skip}&limit=${limit}`);
  const data = await response.json();
  
  if(response.status === 404) {
    return Promise.reject('No Records Found in Database for the Query.')
  }
  
  if (data) {
    return data;
  }
  return Promise.reject('Failed to get message from backend');
}

type keyType = keyof Policy; 

export const updatePolicyInDb = async(policy: Policy) => {
  let formData = new FormData();
  for( let key in policy ){
    formData.append(key ,`${policy[(key as keyType)]}`)
  }
  const response = await fetch(BACKEND_URL + UPDATE_USER_POLICY_DETAIL_API + policy.policy_id , { method : 'PUT' , headers :  { "Content-Type" : "application/json" } ,  body : JSON.stringify(policy) } );
  if(response.ok){
    const data = await response.json();
    if (data) {
      return data;
    }
  }else{
    return Promise.reject('Failed to get message from backend');
  }
}