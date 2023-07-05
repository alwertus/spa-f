import React, {useEffect, useState} from 'react';
import style from './Admin.module.css';
import {UserItem} from "../../../entities/UserItem";
import {UserDetails} from "../../../features/UserDetails";
import {sendGetMsg} from "../../../shared/api/SendMsg";

const URL_USER = "admin-user"

export const AdminComp = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        sendGetMsg(
            URL_USER,
            {},
            (response) => {
                setUsers(response);
            },
            (error) => {
                console.error("error getting list of users:", error);
            }
        );
        sendGetMsg(
            URL_USER + "/roles",
            {},
            (response) => {
                setRoles(response);
            },
            (error) => {
                console.error("error getting list of roles", error)
            }
        );
    }, []);

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
                            allRoles={roles}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};






