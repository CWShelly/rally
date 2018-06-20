const myEventsReducerDefaultState = [];

export default (state = myEventsReducerDefaultState, action)=>{
  switch(action.type){
    case 'ADD_MY_EVENT':
      return [
        ...state,
        action.myEvent
      ];
    case 'REMOVE_MY_EVENT':
     return state.filter(( { id }) =>{

       return id !== action.id
     }

     )

    case 'EDIT_MY_EVENT':
     return state.map((myEvent)=>{

       if(myEvent.id === action.id){
         return{
           ...myEvent,
           ...action.updates
         };
       } else{

         return myEvent;
       }
     })
     case 'SET_MY_EVENTS':
      return action.myEvents
     default:
      return state;
  }
}
