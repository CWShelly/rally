const usersReducerDefaultState = [];

export default (state = usersReducerDefaultState, action)=>{
  switch(action.type){

     case 'SET_USERS':
      return action.user
     default:
      return state;
  }
}
