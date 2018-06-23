import database from '../firebase/firebase'
import moment from 'moment';
const now = moment()

export const response = {};


export const addEvent = (_event)=>({
  type: 'ADD_EVENT',
  _event
})

export const startAddEvent = (eventData = {}) => {

  return (dispatch, getState) => {
    const uid = getState().auth.uid;

  const {
    event_name='',
    street_address='',
    city='',
    _state='',
    zip=0,

    time='',
    createdAt = 0,
    event_image= '',
    tags = {},
    creator_id=uid,
    people_interested={},
    people_going={}

  } = eventData;
  const theEvent = { people_going, people_interested, street_address, event_name, event_image, city, _state, time, zip, createdAt, tags, creator_id}

    database.ref(`events`).push(theEvent)

  .then((ref) => {
    console.log(ref.key);

    response['key'] = ref.key;

    response['time'] =  moment().format('MMMM Do YYYY, h:mm:ss a')
    dispatch(addEvent({
      id: ref.key,
      ... theEvent
    }));
  })



  }

}


export const startRemoveEvent =({ id} = {})=>{
  const event_id = id;

  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    // database.ref(`events/${uid}/events/${ id }`).remove()
        database.ref(`events/${ id }`).remove()
    .then(() => {
      dispatch(removeEvent({ id }))
    })
  }
}

export const removeEvent = ({ id } = {}) =>({
  type: 'REMOVE_EVENT',
  id
})

export const editEvent = (id, updates)=>({
  type:'EDIT_EVENT',
  id,
  updates
})

export const startEditEvent = (id, updates) => {
   console.log(updates);
  return (dispatch, getState) => {
    let uid = getState().auth.uid;

    // return database.ref(`events/${uid}/events/${id}`).update(updates)
  return database.ref(`events/${id}`).update(updates)
   .then(() => {
     dispatch(editEvent(id, updates))
   })
  }

}



export const setEvents = (events) => ({
  type: 'SET_EVENTS',
  events
})

export const startSetEvents = () => {

 return (dispatch, getState) => {
     console.log('setting events');
   let auth_id = getState().auth.uid
   // const browse_id = localStorage.getItem('browse_id') || auth_id;

   // console.log('browse_id === auth_id? ', browse_id === auth_id);

   let uid = getState().auth.uid

   // return database.ref(`events/${uid}/events`)
  return database.ref(`events`)
   .once('value')
   .then((snapshot) => {
     const events = [];

     snapshot.forEach((childSnapshot) => {
       events.push({
         id: childSnapshot.key,
         ...childSnapshot.val()
       })

     })
    dispatch(setEvents(events))
   })

 }

}
