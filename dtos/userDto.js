class UserDto {
    username;
    passwordHash;
    phoneNumber;
    email;

    constructor(model) {
        this.username = model.username
        this.passwordHash = model.passwordHash
        this.phoneNumber = model.phoneNumber
        this.email = model.email
    }
}

module.exports = UserDto