import style from './UserRoleItem.module.css';
import React, {useState} from "react";
import {ModalComp} from "../../../shared/ui/Modal/ModalComp";
import {sendDeleteMsg} from "../../../shared/api/SendMsg";
import {ButtonComp} from "../../../shared/ui/Button/ButtonComp";
import {URL_USER} from "../../../features/UserDetails/const/const";
import {sendData} from "../api/request";
import toast from "react-hot-toast";
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
        const requestData = {
            userLogin: userName,
            roleName: role,
        };
        sendData(requestData, updateUsers, setSelectedUser);
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
                toast.success("success")
            },
            (error) => {
                toast.error("error deleting role:", error);
            }
        )
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