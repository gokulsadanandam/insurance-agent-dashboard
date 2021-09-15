  export interface Notification {
    message?: string;
    open: boolean
  }
  
  export interface appState {
    header : {
      text: string;
    },
    query: {
      value: string;
      type: string;
      results: object[];
    }
  }
  
  export const initialState: appState = {
    header : {
      text: 'Agent Login'
    },
    query: {
      value : '',
      type: '',
      results:[]
    }
  };
  
  export function reducer(
    state: any,
    action: { type: string; payload?: any }
  ) {
    console.log(state)
    switch (action.type) {
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
      default:
        // throw new Error();
    }
  }