//reducer
const initialLoginState={
          loginReducer:"out"
}

export  const loginReducer=(state=initialLoginState,action)=>{
    switch (action.type) {
      case 'LOGIN_USER':
        return {
          loginReducer:"online"
        }

      case "SIGNOUT_USER":
        return {
              loginReducer:"out"
        }
      
      default:
        return initialLoginState;
    }
}
