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
                        <th>ID</th>
                        <th>Inputs</th>
                        <th>Expected</th>
                        <th>ErrorRate</th>
                        <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                        <tr key={index}>
                            <td>{user.id}</td>
                            <td>{user?.train?.inputs}</td>
                            <td>{user?.train?.expected}</td>
                            <td>{user?.train?.lastErrorRate}</td>
                            <td>{user?.train?.status}</td>
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
