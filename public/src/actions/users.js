import database from '../firebase/firebase'

export const setUsers = (user) => ({
  type: 'SET_USERS',
  user
})

export const getUsers = () => {

 return (dispatch, getState) => {
   const uid = getState().auth.uid

   // console.log(database.ref('users').once('value'))
   return database.ref(`users/`)
    // return database.ref()
   .once('value')
   .then((snapshot) => {


     // const profiles = [];
     const _users =[]
     snapshot.forEach((childSnapshot) => {


       _users.push({
         id: childSnapshot.key,
         ...childSnapshot.val()
       })
     })
    dispatch(setUsers(_users))
   })
 }
}
