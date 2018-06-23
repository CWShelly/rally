const profilesReducerDefaultState = [];

export default (state = profilesReducerDefaultState, action)=>{
  switch(action.type){
    case 'ADD_PROFILE':
      return [
        ...state,
        action.profile
      ];
    case 'REMOVE_PROFILE':
     return state.filter(( { id }) =>{

       return id !== action.id
     }

     )

    case 'EDIT_PROFILE':
     return state.map((profile)=>{

       if(profile.id === action.id){
         return{
           ...profile,
           ...action.updates
         };
       } else{

         return profile;
       }
     })
     case 'SET_PROFILES':
      return action.profiles
     default:
      return state;
  }
}
