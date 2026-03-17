class AuthDto {
    constructor(model) {
        this.id = model.id
        this.phoneNumber = model.phoneNumber
        this.email = model.email
        this.role = model.role
        this.publicId = model.publicId
    }
}

module.exports = AuthDto