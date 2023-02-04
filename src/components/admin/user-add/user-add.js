import React from 'react'
import Spacer from '../../common/spacer/spacer'
import UserAddForm from './user-add-form'

const AdminAddUser = () => {
    return (
        <div>
            <Spacer height={30} />
            <UserAddForm />
            <Spacer height={30} />
        </div>
    )
}

export default AdminAddUser