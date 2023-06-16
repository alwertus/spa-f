import React, {useEffect, useState} from 'react';
import style from './Admin.module.css';
import {userList} from "../model/AdminLogic";
import {UserItem} from "../../../entities/User";

export const AdminComp = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        setUsers(userList)
        console.log("FFFFFF");
    }, [])

    return (
        <div className={style.wrapper}>
            {users.map((user) => (
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







