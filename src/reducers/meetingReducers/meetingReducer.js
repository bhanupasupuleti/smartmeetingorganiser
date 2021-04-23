import {ADD_MEETING} from './meetingAction'
const intitialState={
    buildingsData:[
        {
            name:'Building 4',
            rooms:[
                {   
                    name:'Punjab',
                    floor:7,
                    bookedTimings:[]
                },
                {
                    name:'Tamil Nadu',
                    floor:7,
                    bookedTimings:[]
                },
                {
                    name:'Kaveri',
                    floor:4,
                    bookedTimings:[]
                },
                {
                    name:'AryaBhatta',
                    floor:2,
                    bookedTimings:[]
                }
            ],
        },
        {
            name:'Building 5',
            rooms:[
                {
                    name:'Punjab',
                    floor:7,
                    bookedTimings:[]
                },
                {
                    name:'Tamil Nadu',
                    floor:7,
                    bookedTimings:[]
                },
                {
                    name:'Kaveri',
                    floor:4,
                    bookedTimings:[]
                },
                {
                    name:'AryaBhatta',
                    floor:2,
                    bookedTimings:[]
                }
            ],
        },
        {
            name:'Building 6',
            rooms:[
                {
                    name:'Punjab',
                    floor:7,
                    bookedTimings:[]
                },
                {
                    name:'Tamil Nadu',
                    floor:7,
                    bookedTimings:[]
                },
                {
                    name:'Kaveri',
                    floor:4,
                    bookedTimings:[]
                },
                {
                    name:'AryaBhatta',
                    floor:2,
                    bookedTimings:[]
                }
            ],
        },
        {
            name:'Building 8',
            rooms:[
                {
                    name:'Punjab',
                    floor:7,
                    bookedTimings:[]
                },
                {
                    name:'Tamil Nadu',
                    floor:7,
                    bookedTimings:[]
                },
                {
                    name:'Kaveri',
                    floor:4,
                    bookedTimings:[]
                },
                {
                    name:'AryaBhatta',
                    floor:2,
                    bookedTimings:[]
                }
            ]
        }
    ],
}

export default (state=intitialState,action)=>{
    switch (action.type) {
        case ADD_MEETING:{
            const {building,date,startTime,endTime,room='AryaBhatta'}=action.payload
            const bookingBuilding=state.buildingsData.find(e=>e.name===building)
            const bookingRoom=bookingBuilding.rooms.find(e=>e.name===room);
            bookingRoom.bookedTimings.push({date,startTime,endTime});
            bookingBuilding.rooms=bookingBuilding.rooms.filter(e=>e.name!==room||bookingRoom);
            const newData=state.buildingsData.filter(e=>e.name!==building||bookingBuilding )
            // console.log(newData)
            return {...state,buildingsData:newData}
        }
        default:
          return state
    }
}