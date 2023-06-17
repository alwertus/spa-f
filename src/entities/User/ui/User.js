import React, {useState} from "react";
import style from "./User.module.css"

export const UserItem = ({ login, email, onClick }) => {
    return (
        <div className={style.wrapper}>
            <div className={style.userSmallInfo} onClick={onClick}>
                <div>Login: {login}</div>
                <div>Email: {email}</div>
            </div>
        </div>
    );
};

export const UserDetails = ({ login, created, lastLogin, email, roles }) => {
    return (
        <div className={style.wrapper}>
            <div className={style.userSmallInfo}>
                <div>Login: {login}</div>
                <div>Created: {created}</div>
                <div>LastLogin: {lastLogin}</div>
                <div>Email: {email}</div>
                <div>Roles: {roles.join(", ")}</div>
            </div>
        </div>
    );
};
