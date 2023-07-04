import style from "./User.module.css";
import React from "react";

export const UserItem = ({ login, email, onClick }) => {
    return <div className={style.wrapper}>
        <div className={style.userSmallInfo} onClick={onClick}>
            <div>Login: {login}</div>
            <div>Email: {email}</div>
        </div>
    </div>
};

