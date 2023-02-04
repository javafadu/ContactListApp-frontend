import React from 'react'
import Spacer from '../../common/spacer/spacer'
import UserList from './user-list'
import UserSearch from './user-search'

const AdminUsers = () => {

    return (
        <>
            <Spacer height={30} />
            <UserSearch />
            <Spacer height={30} />
            <UserList />

        </>
    )
}

export default AdminUsers