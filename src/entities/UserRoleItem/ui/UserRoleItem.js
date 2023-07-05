import style from './UserRoleItem.module.css';
import React from "react";
export const UserRoleItem = ({role}) => {
    return <div className={style.wrapper}>
        <div className={style.role}>{role}</div>
    </div>
}