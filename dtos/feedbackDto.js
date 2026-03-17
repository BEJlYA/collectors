class FeedbackDto {
    constructor(model) {
        this.id = model.id
        this.comment = model.comment
        this.rating = model.rating
        this.createdAt = model.createdAt
    }
}

class ExtendedFeedbackDto extends FeedbackDto {
    constructor(model) {
        super(model)
        this.fromUser = model.fromUser
        this.targetUser = model.targetUser
        this.initiatorType = model.initiatorType
    }
}

module.exports = {FeedbackDto, ExtendedFeedbackDto}