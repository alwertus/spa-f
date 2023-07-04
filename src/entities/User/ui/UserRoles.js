import style from "./User.module.css";
import React from "react";

export const UserRoles = ({role}) => {
    return <div className={style.wrapper}>
        <div className={style.role}>{role}</div>
    </div>
}