//reducer
const initialLoginState={
  userid:"",
  msg:[]
}
export  const appState=(state=initialLoginState,action)=>{
    switch (action.type) {
      case 'RECORD_USER':
         return Object.assgin({},action.data);
      case "EMPTY_USER":
        return {
          userid:"",
          msg:[]
        };
      default:
        return initialLoginState;
    }
}
