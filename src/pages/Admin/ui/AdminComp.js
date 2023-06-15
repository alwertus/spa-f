import React from 'react';
import style from './Admin.module.css';
import {userList} from "../model/AdminLogic";
import {UserItem} from "../../../entities/User";

export const AdminComp = () => {
    return (
        <div className={style.wrapper}>
            {userList.map((user) => (
                <UserItem
                    key={user.login}
                    login={user.login}
                    created={user.created}
                    lastLogin={user.lastLogin}
                    email={user.email}
                    roles={user.roles}
                />
            ))}
        </div>
    );
};








