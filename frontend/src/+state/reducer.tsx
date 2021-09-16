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
    error?: string;
    query: {
      value: string;
      type: string;
      skip:number;
      limit:number;
      endOfRecords:boolean;
      results: object[];
    },
    selectedPolicyForEdit?: Policy,
    loader:boolean;
    notifications : {
      message?: string,
      open: boolean
    }
  }
  
  export const initialState: appState = {
    header : {
      text: 'Agent Login'
    },
    selectedPolicyForEdit: undefined,
    error: undefined,
    loader:false,
    notifications: {
      open: false
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
    switch (action.type) {
      case 'update/header':
        return{
          ...state,
          header: {
            text : action.payload
          }
        }
      case 'update/selectedPolicy':
        return{
          ...state,
          selectedPolicyForEdit : {
            ...(state.selectedPolicyForEdit || {}),
            ...action.payload
          }
        }
      case "query/update":
        return {
          ...state,
          error: undefined,
          query : {
            ...state.query,
            ...action.payload
          }
        }
        case "app/notification":
          return {
            ...state,
            notifications: {
              open: true,
              message: action.payload
            }
          }
        case "app/closeNotificationMessage": 
          return {
            ...state,
            notifications: {
              open: false
            }
          }
        case "query/results":
        return {
          ...state,
          error: undefined,
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
          case "update/error":
            return{
              ...state,
              error : action.payload,
              query: {
                ...state.query,
                results: []
              }
            }
         case "app/resetState":
           return {
             ...initialState
           }
      default:
        // throw new Error();
    }
  }