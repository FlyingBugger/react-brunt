//action
export const recordUser=(datas)=>{

  return {
      type:"RECORD_USER",
      data:datas
  }
}
export const emptyUser=()=> {
  return {
      type:'EMPTY_USER'
  }
}
