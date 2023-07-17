import React, {useEffect, useState} from 'react';
import style from './Admin.module.css';
import {UserItem} from "../../../entities/UserItem";
import {UserDetails} from "../../../features/UserDetails";
import {LoadUsers} from "../api/LoadUsers";
import {LoadRoles} from "../api/LoadRoles";

export const AdminComp = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        LoadUsers(setUsers);
        LoadRoles(setRoles);
    }, []);

    return (
        <div className={style.wrapper}>
            <div className={style.userList}>
                <div className={style.usersLeftSide}>
                    {users.map((user) => (
                        <UserItem
                            key={user.login}
                            login={user.login}
                            email={user.email}
                            onClick={() => setSelectedUser(user)}
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
                            allRoles={roles}
                            setSelectedUser={setSelectedUser}
                            setUsers={setUsers}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};






