enum Role {
    ADMIN = "ROLE_ADMIN",
    USER = "ROLE_USER"
}

type User = {
    exp: Number,
    iat: Number,
    name: String,
    roles: String[],
    username: String,
}

export const rolesChecker = (userObj: User, role: Role) => {
    if(!userObj) return false

    const roles = [...userObj?.roles];

    roles.push(Role.USER);

    return roles.includes(role)
}