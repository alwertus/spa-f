import style from './UserRoleItem.module.css';
import React, {useState} from "react";
import {ModalComp} from "../../../shared/ui/Modal/ModalComp";
import {sendDeleteMsg, sendPostMsg} from "../../../shared/api/SendMsg";
import {ButtonComp} from "../../../shared/ui/Button/ButtonComp";

const URL_USER = "admin-user"

export const UserRoleItem = ({role, canDelete= false, userName, canAdd= false, closeWindowHandler, updateUsers, setSelectedUser}) => {
    const [showModalDelete, setShowModalDelete] = useState(false);

    const handleAddingRole = (role) => {
        const requestData = {
            userLogin: userName,
            roleName: role,
        };
        sendPostMsg(
            URL_USER + "/role",
            requestData,
            (updatedUser) => {
                updateUsers();
                setSelectedUser(updatedUser);
            },
            (error) => {
                console.error("error adding role:", error);
            }
        )
    }

    const handleRemoveRole = (role) => {
        const requestData = {
            userLogin: userName,
            roleName: role,
        };
        sendDeleteMsg(
            URL_USER + "/role",
            requestData,
            (updatedUser) => {
                updateUsers();
                setSelectedUser(updatedUser);
            },
            (error) => {
                console.error("error deleting role:", error);
            }
        )
        setShowModalDelete(false);
        closeWindowHandler();
    }

    return <div className={style.wrapper}>
        <div className={style.roleWrapper} onClick={() => canAdd && handleAddingRole(role)}>
            <div className={style.role}>{role}</div>
            {canDelete && (
                <div className={style.closeButton} onClick={() => setShowModalDelete(true)}>
                    x
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