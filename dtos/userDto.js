class UserDto {
    id;
    username;
    phoneNumber;
    email;
    refreshToken;
    role;

    constructor(model) {
        this.id = model.id
        this.username = model.username
        this.phoneNumber = model.phoneNumber
        this.email = model.email
        this.refreshToken = model.refreshToken
        this.role = model.role
    }
}

module.exports = UserDto