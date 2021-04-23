import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";

import Button from '@material-ui/core/Button';

const Home=(props)=> {
    let data=props.buildingsData
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    today = mm + ' ' + dd + ' '+ yyyy;
    let totalRooms=data.length>0?data.reduce((acc,val)=>{
    return acc+=val.rooms.length
    },0):0
    const checkBooked=(booked)=>{ 
        let dd = String(booked.date.getDate()).padStart(2, '0');
        let mm = String(booked.date.getMonth() + 1).padStart(2, '0');
        let yyyy = booked.date.getFullYear();
        let todayBooked = mm + ' ' + dd + ' '+ yyyy;
        if(todayBooked===today) return true;
        return false
    }
    let meetings=data.length>0?data.map(building=>building.rooms).flat().filter(room=>room.bookedTimings.length>0):[];
    let todayMeetings=[];
    meetings.forEach(element => {
       todayMeetings=[...todayMeetings,element.bookedTimings.filter(booked=>checkBooked(booked))]
    });
    const checkMeetingNow=(todayMeetingObject)=>{
        const now=new Date()
        const {startTime,endTime}=todayMeetingObject;
        if(startTime.getTime()<now.getTime() && endTime.getTime()>now.getTime()) return true
        return false
    }
    let meetingsGoingNow=todayMeetings.flat().filter(todayMeetingObject=>checkMeetingNow(todayMeetingObject))

    let display=data.length>0?(
        <div className='Home__Table'>
                <Table aria-label="simple table">
                <TableBody>
                    <TableRow>
                        <TableCell align="left">
                            <TableRow>                        
                                Buildings
                            </TableRow>
                            <TableRow>
                                {`Total ${data.length}`}
                            </TableRow>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="left">
                            <TableRow>                        
                                Rooms
                            </TableRow>
                            <TableRow>
                                {`Total Rooms ${totalRooms}`}
                            </TableRow>
                            <TableRow>
                                {`Total Rooms Free Now ${totalRooms-meetingsGoingNow.length}`}
                            </TableRow>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="left">
                            <TableRow>                        
                                Meetings
                            </TableRow>
                            <TableRow>
                                {`Total Meetings Today : ${todayMeetings.flat(2).length}`}
                            </TableRow>
                            <TableRow>
                                {`Total Meeting going Now : ${meetingsGoingNow.length}`}
                            </TableRow>
                        </TableCell>
                    </TableRow>
                        <TableRow>

                        <TableCell>
                            <Link to='/addmeeting'>
                                <Button variant="contained" color="primary" >
                                        Add Meeting
                                </Button>
                            </Link>
                        </TableCell>
                        </TableRow>
                </TableBody>
                
            </Table>

        </div>
    ):null
  return  display
}

const mapStateToProps=(state)=>{
   return{
    buildingsData:state.data.buildingsData
   } 
}

export default connect(mapStateToProps)(Home)
