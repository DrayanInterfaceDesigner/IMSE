import React from 'react'
import styles from './styles/Table.module.scss'

const Table = (props) => {

    const {users} = props
    return (
        <div className='Table'>
        <div className='Table__container'>
            <div className='Table__mover'>
            <div className='Table__sizer'>
                <table className={`Table__table ${styles.UserTable}`}>
                    <thead>
                        <tr>
                        <th>Name</th>
                        <th>Input</th>
                        <th>Expected</th>
                        <th>ErrorRate</th>
                        <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                        <tr key={index}>
                            <td>{user.id}</td>
                            <td>{user.input}</td>
                            <td>{user.expected}</td>
                            <td>{user.errorRate}</td>
                            <td>{user.finished}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            </div>
        </div>
        </div>
    )
}

export default Table
