export const appDates=(state={},action)=>{
  switch (action.type) {
    case 'STORE':
       return Object.assign({},action.data);

    default:
      return {};
  }
}
