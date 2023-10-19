import React from 'react'

const StructureGrid2x2 = ({children, props}) => {
  return (
    <div className='StructureGrid2x2'>
      <div className='StructureGrid2x2__container'>
        <div className='StructureGrid2x2__mover'>
          <div className='StructureGrid2x2__sizer'>
            <div className='StructureGrid2x2__innerComponent'>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StructureGrid2x2