import style from './UserRoleItem.module.css';
import React, {useState} from "react";
import {ModalComp} from "../../../shared/ui/Modal/ModalComp";
import {ButtonComp} from "../../../shared/ui/Button/ButtonComp";
import {addRole, deleteRole} from "../api/request";
import {ReactComponent as CrossIcon} from "../../../shared/ui/img/Cross.svg";

export const UserRoleItem = ({
                                 role,
                                 canDelete= false,
                                 userName,
                                 canAdd= false,
                                 closeWindowHandler,
                                 updateUsers,
                                 setSelectedUser
}) => {

    const [showModalDelete, setShowModalDelete] = useState(false);

    const handleAddingRole = (role) => {
        addRole(userName, role, updateUsers, setSelectedUser);
    }

    const handleRemoveRole = (role) => {
        deleteRole(userName, role, updateUsers, setSelectedUser)
        setShowModalDelete(false);
        closeWindowHandler();
    }

    return <div className={style.wrapper}>
        <div className={style.roleWrapper} onClick={() => canAdd && handleAddingRole(role)}>
            <div className={style.role}>{role}</div>
            {canDelete && (
                <div className={style.crossIcon} onClick={() => setShowModalDelete(true)}>
                    <CrossIcon />
                </div>
            )}
        </div>
        <ModalComp
            isOpen={showModalDelete}
            onClickOutsideHandler={() => {setShowModalDelete(false)}}
            content={
                <div className={style.modal}>
                    <h4>Are you sure you want to delete role</h4>
                    <div className={style.modalButtons}>
                        <ButtonComp
                            text={"Cancel"}
                            onClick={() => {setShowModalDelete(false)}}
                        />
                        <ButtonComp
                            text={"Delete"}
                            onClick={() => {handleRemoveRole(role)}}
                        />
                    </div>
                </div>
            }
        />
    </div>
}