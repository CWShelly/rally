import database from '../firebase/firebase'


export const addMyEvent = (myEvent)=>({
  type: 'ADD_MY_EVENT',
  myEvent
})

export const startAddMyEvent = (myEventData = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;

  const {
    event_id= '',
    createdAt = 0,
   going= false,
   interested= false,



  } = myEventData;
  const myEvent = {event_id, createdAt, going, interested}
  console.log(myEvent);
  // const uid = getState().auth.uid;
  database.ref(`users/${uid}/myEvents`).push(myEvent)
  .then((ref) => {
    dispatch(addMyEvent({
      id: ref.key,
      ... myEvent
    }));
  })
  }

}


export const startRemoveMyEvent =({ id} = {})=>{
 console.log('removing');
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    database.ref(`users/${uid}/myEvents/${ id }`).remove()
    .then(() => {
      dispatch(removeMyEvent({ id }))
    })
  }
}

export const removeMyEvent = ({ id } = {}) =>({
  type: 'REMOVE_MY_EVENT',
  id
})

export const editMyEvent = (id, updates)=>({
  type:'EDIT_MY_EVENT',
  id,
  updates
})

export const startEditMyEvent = (id, updates) => {
  console.log(id);
console.log(updates);
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/myEvents/${id}`).update(updates)
   .then(() => {
     dispatch(editMyEvent(id, updates))
   })
  }

}
export const setMyEvents = (myEvents) => ({
  type: 'SET_MY_EVENTS',
  myEvents
})

export const startSetMyEvents = () => {

 return (dispatch, getState) => {
     console.log('setting my events');

  const uid = getState().auth.uid;
   return database.ref(`users/${uid}/myEvents`)
   .once('value')
   .then((snapshot) => {
     const myEvents = [];

     snapshot.forEach((childSnapshot) => {
       myEvents.push({
         id: childSnapshot.key,
         ...childSnapshot.val()
       })

     })
    dispatch(setMyEvents(myEvents))
   })

 }

}
