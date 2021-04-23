import history from '../../misc/history';
export const ADD_MEETING='ADD_MEETING';

export const addMeeting=(meetingobject)=>(dispatch)=>{
       dispatch({
           type:ADD_MEETING,
           payload:meetingobject
       })
       setTimeout(() => {
           history.push('/');           
       }, 1000);
}