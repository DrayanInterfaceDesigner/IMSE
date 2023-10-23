import React from 'react'
import StudentFillet from '../StudentFillet/StudentFillet'
import StudentExperimentLabel from '../StudentExperimentLabel/StudentExperimentLabel'
import MachineStatus from '../../Machine/MachineStatus/MachineStatus'
import StudentGraph from '../StudentGraph/StudentGraph'

const StudentCard = ({props}) => {
  return (
    <div className='StudentCard'>
      <div className='StudentCard__container'>
        <div className='StudentCard__mover'>
          <div className='StudentCard__sizer'>
            <div className='StudentCard__innerComponent'>
              <StudentFillet props={{sID: props.sID}}></StudentFillet>
              <StudentExperimentLabel props={{number: props.experimentNumber}}></StudentExperimentLabel>
              <MachineStatus props={{currentStatus: props.currentStatus}}></MachineStatus>
              <StudentGraph props={{data: ""}}></StudentGraph>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentCard