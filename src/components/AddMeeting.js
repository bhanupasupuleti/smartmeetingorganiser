import React from 'react';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import {addMeeting} from '../reducers/meetingReducers/meetingAction';
import { Typography } from '@material-ui/core';

const AddMeeting=(props) =>{
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [startTime,setStartTime]=React.useState(new Date());
  const [endTime,setEndTime]=React.useState(new Date());
  const [startError,setStartError]=React.useState('');
  const [endError,setEndError]=React.useState('');
  const [selectedBuilding,setSelectedBuilding]=React.useState('');
  const [bookingObject,setBookingObject]=React.useState(null);
  const [disabled,setDisabled]=React.useState(false)
  const [success,setSuccess]=React.useState('')
  const bookedBuilding=bookingObject&&props.buildings?props.buildings.find(e=>e.name===bookingObject.building):null;
  const availableRooms=(room)=>{
   return room.bookedTimings.length===0?true:
     room.bookedTimings.forEach(e=>{
         if(e.date.getTime()===bookingObject.date.getTime()){
           if(bookingObject.startTime.getTime()>e.endTime.getTime()) return true
           return false
         }
         return true
     })
  }
  const rooms=bookedBuilding?.rooms.filter(room=>availableRooms(room));
  const handleDateChange = (date) => {
      setEndError('')
    setSelectedDate(date);
  };
    const handleStartTimeChange = (date) => {
        setStartError('')
        setStartTime(date);
    };
    const handleEndTimeChange  = (date) => {
        setEndError('')
        setEndTime(date);
    };
    const handleMeetingSubmit=()=>{
        let currentTime=new Date();
        if(selectedDate.getTime()<currentTime.getTime()){
            setEndError('Date Cannot be Past')
            return
        }
        if(currentTime.getTime()>startTime.getTime()){
            setStartError('Cannot add meeting for past time')
            return
        }
        if(endTime.getTime()<startTime.getTime()){
            setEndError('End Time Cannot be less than start Time')
            return
        }
        if(!selectedBuilding){
            setEndError('Please Select A building')
        }
        setBookingObject({
            date:selectedDate,
            startTime:startTime,
            endTime:endTime,
            building:selectedBuilding
        })

    }
    const handleBuildingChange=(e)=>{
        setSelectedBuilding(e.target.value)
    }
    const handleRoomSelect=(name)=>{
        setDisabled(true);
        setSuccess('Meeting Had Been Booked Please Wait While you redirect to Home Page')
        props.addMeeting({...bookingObject,room:name})
    }

  return (
      <div className='AddMeeting_Table'>
          <div>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <form>
                            
                            <div>                        
                                <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="MM/dd/yyyy"
                                margin="normal"
                                id="date-picker-inline"
                                label="Date"
                                value={selectedDate}
                                onChange={handleDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                                />
                            </div>
                            <div>
                                <KeyboardTimePicker
                                    margin="normal"
                                    id="start-time-picker"
                                    label="Start Time"
                                    value={startTime}
                                    onChange={handleStartTimeChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change time',
                                    }}
                                    />
                                    <p style={{color:'red'}}>
                                        {startError&&startError}
                                    </p>
                    
                            </div>
                            <div>

                                <KeyboardTimePicker
                                margin="normal"
                                id="end-time-picker"
                                label="End Time"
                                value={endTime}
                                onChange={handleEndTimeChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change time',
                                }}
                                />
                                <p style={{color:'red'}}>
                                    {endError&&endError}
                                </p>
                            </div>
                            <div style={{padding:10}}>
                                <select className='select' value={selectedBuilding} onChange={handleBuildingChange}>
                                    <option value=''>
                                        ---
                                    </option>
                                    {
                                        props.buildings.map(val=>(
                                            <option value={val.name}>
                                                {val.name}
                                            </option>
                                        ))
                                    }
                                </select>
                            </div>
                            <Button variant="contained" color="primary" onClick={handleMeetingSubmit}>
                                Show Available Rooms
                            </Button>
                        </form>
            </MuiPickersUtilsProvider>
          </div>
          <div className='booking'>
            {bookingObject?(
                        <div>
                            <Table aria-label="simple table">
                                    <TableBody>
                                    {
                                        rooms.map(room=>(
                                            <TableRow>
                                                <TableCell>
                                                    {room.name}
                                                    <br />
                                                    {`Floor ${room.floor}`}
                                                </TableCell>
                                            <TableCell>
                                            <Button variant="contained" color="primary" disabled={disabled} onClick={()=>handleRoomSelect(room.name)}>
                                                Book Room
                                            </Button>
                                            </TableCell>
                                            </TableRow>
                                        ))
                                    }
                                    </TableBody>
                                    
                                </Table>
                                <div>
                                    <Typography style={{color:'green'}}>
                                        {success?success:null}
                                    </Typography>
                                </div>
                        </div>
                            ):null}
          </div>
            

      </div>
  );
}

const mapStatetoProps=state=>{
    return {
        buildings:state.data.buildingsData
    }
}

export default connect(mapStatetoProps,{addMeeting})(AddMeeting)