import React, {useState} from "react";
import style from "./UserDetails.module.css";
import {InputTextComp} from "../../../shared/ui/InputText/InputTextComp";
import {ButtonComp} from "../../../shared/ui/Button/ButtonComp";
import {ReactComponent as AddIcon} from "../../../shared/ui/img/plus.svg";
import {ModalComp} from "../../../shared/ui/Modal/ModalComp";
import {UserRoleItem} from "../../../entities/UserRoleItem";

export const UserDetails = ({ login, created, lastLogin, email, roles, allRoles}) => {
    const [showRolesWindow, setShowRolesWindow] = useState(false);

    const formatDate = (time) => {
        const date = new Date(time);
        return date.toLocaleString();
    };

    return <div className={style.wrapper}>
        <div className={style.userFullInfo}>
            <div className={style.userTextInfo}>
                <div className={style.inputData}>
                    <div className={style.inputLogin}>
                        <InputTextComp
                            title={"login"}
                            type={"text"}
                            defaultText={login}
                        />
                    </div>
                    <div className={style.inputEmail}>
                        <InputTextComp
                            title={"email"}
                            type={"text"}
                            defaultText={email}
                        />
                    </div>
                </div>
                <div className={style.userDate}>
                    <div>Created: {formatDate(created)}</div>
                    <div>LastLogin: {formatDate(lastLogin)}</div>
                </div>
            </div>
            <div className={style.roleGroup}>
                Roles: {roles.map((role) =>
                <UserRoleItem key={role} role={role}/>
            )}
                <div className={style.buttonAddRole}>
                    <ButtonComp
                        tooltipText={"Add role"}
                        icon={<AddIcon/>}
                        onClick={() => {setShowRolesWindow(true)}}
                    />
                </div>
            </div>
        </div>
        <ModalComp
            isOpen={showRolesWindow}
            onClickOutsideHandler={() => {setShowRolesWindow(false)}}
            content={
                <div className={style.modal}>
                    <div>
                        select a role: {allRoles.map((role) => (
                        <UserRoleItem key={role} role={role}/>
                    ))}
                    </div>
                </div>
            }
        />
    </div>
};