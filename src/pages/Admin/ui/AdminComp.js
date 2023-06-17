import React, {useEffect, useState} from 'react';
import style from './Admin.module.css';
import {userList} from "../model/AdminLogic";
import {UserItem} from "../../../entities/User";
import {UserDetails} from "../../../entities/User";

export const AdminComp = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        setUsers(userList)
        console.log("FFFFFF");
    }, [])

    const handleUserClick = (user) => {
        setSelectedUser(user);
    };

    return (
        <div className={style.wrapper}>
            <div className={style.usersContainer}>
                <div className={style.usersLeftSide}>
                    {users.map((user) => (
                        <UserItem
                            key={user.login}
                            login={user.login}
                            email={user.email}
                            onClick={() => handleUserClick(user)}
                        />
                    ))}
                </div>
                <div className={style.userInfoContainer}>
                    {selectedUser && (
                        <UserDetails
                            login={selectedUser.login}
                            created={selectedUser.created}
                            lastLogin={selectedUser.lastLogin}
                            email={selectedUser.email}
                            roles={selectedUser.roles}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};






