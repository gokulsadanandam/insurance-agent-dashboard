  export interface Notification {
    message?: string;
    open: boolean
  }

  export interface Policy{
      policy_id: number;
      customer_id: number;
      fuel: string;
      vehicle_segment: string;
      premium: number;
      bodily_injury_liability: boolean;
      personal_injury_protection: boolean;
      property_damage_liability: boolean;
      collision: boolean;
      comprehensive: boolean;
      date_of_purchase: number;
  }
  
  export interface appState {
    header : {
      text: string;
    },
    query: {
      value: string;
      type: string;
      skip:number;
      limit:number;
      endOfRecords:boolean;
      results: object[];
    },
    selectedPolicyForEdit?: Policy
  }
  
  export const initialState: appState = {
    header : {
      text: 'Agent Login'
    },
    selectedPolicyForEdit: {
      "policy_id": 12345,
      "customer_id": 400,
      "fuel": "CNG",
      "vehicle_segment": "A",
      "premium": 958,
      "bodily_injury_liability": false,
      "personal_injury_protection": false,
      "property_damage_liability": false,
      "collision": true,
      "comprehensive": true,
      "date_of_purchase": 1516060800
    },
    query: {
      value : '',
      type: '',
      skip:0,
      limit:25,
      endOfRecords:false,
      results: []
    }
  };
  
  export function reducer(
    state: any,
    action: { type: string; payload?: any }
  ) {
    console.log(state)
    switch (action.type) {
      case 'update/header':
        return{
          ...state,
          header: {
            text : action.payload
          }
        }
      case "query/update":
        return {
          ...state,
          query : {
            ...state.query,
            ...action.payload
          }
        }
        case "query/results":
        return {
          ...state,
          query : {
            ...state.query,
            results : action.payload
          }
        }
        case "update/editPolicy":
          return {
            ...state,
            selectedPolicyForEdit: {
              ...action.payload
            }
          }
        case "app/loader":
            return {
              ...state,
              loader: action.payload
            }
      default:
        // throw new Error();
    }
  }