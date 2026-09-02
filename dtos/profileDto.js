const AuthDto = require('./authDto')
const {ExtendedFeedbackDto} = require('./feedbackDto')
const CollectionDto = require('../dtos/collectionDto')

class ProfileTemplate {
    constructor(profile) {
        this.id = profile.id
        this.userId = profile.userId
        this.firstName = profile.firstName
        this.lastName = profile.lastName
        this.avatarUrl = profile.avatarUrl
        this.country = profile.country
        this.city = profile.city
        this.rating = profile.rating
        this.categories = profile.categories || []
        this.createdAt = profile.createdAt
    }
}

class ProfileDto {
    constructor(data) {
        const isUser = data.publicId !== undefined
        const isProfile = data.userId !== undefined

        if (isProfile) {
            this._fromProfile(data)
        } else if (isUser) {
            this._fromUser(data)
        }
    }

    _fromProfile(profile) {
        Object.assign(this, new ProfileTemplate(profile))

        if (profile.user) {
            this.user = new AuthDto(profile.user)
        }
    }

    _fromUser(user) {
        this.user = new AuthDto(user)

        if (user.profile) {
            Object.assign(this, new ProfileTemplate(user.profile))
        }
    }
}

class ProfileCollectionsDto {
    constructor(model) {
        this.collections = model.collections?.map(collection => new CollectionDto(collection)) || []
    }
}

class ProfileFeedbacksDto {
    constructor(model) {
        this.feedbacks = model.feedbacks?.map(feedback => new ExtendedFeedbackDto(feedback)) || []
    }
}

class ProfileSettingsDto {
    constructor(model) {

    }
}

class AdminProfileDto {
    constructor(model) {
        Object.assign(this, new ProfileTemplate(model))
        Object.assign(this, new ProfileCollectionsDto(model))
        Object.assign(this, new ProfileFeedbacksDto(model))
        this.isActivated = model.isActivated
        this.isBlocked = model.isBlocked
    }
}


module.exports = {ProfileTemplate, ProfileDto, ProfileCollectionsDto, ProfileFeedbacksDto, ProfileSettingsDto, AdminProfileDto}