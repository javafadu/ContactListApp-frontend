import React from "react";
import Spacer from "../../common/spacer/spacer";
import UserEditForm from "./user-edit-form";


const AdminUserEdit = () => {
    return (
        <>
            <div className="admin-user-edit-page">
                <Spacer height={30} />
                <UserEditForm />
                <Spacer height={30} />

            </div>
        </>
    );
};

export default AdminUserEdit;