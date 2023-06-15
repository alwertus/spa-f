import React from "react";
export const UserItem = ({login, created, lastLogin, email, roles}) => {
    return (
        <div>
            <p>Login: {login}</p>
            <p>Created: {created}</p>
            <p>LastLogin: {lastLogin}</p>
            <p>Email: {email}</p>
            <p>Roles: {roles.join(", ")}</p>
        </div>
    );
};