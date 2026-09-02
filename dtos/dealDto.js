const { MessageDto } = require('./messageDto')
const { ListingDto } = require('./listingDto')

class DealDto {
    constructor(deal) {
        this.id = deal.id
        this.listingId = deal.listingId
        this.sellerId = deal.sellerId
        this.buyerId = deal.buyerId
        this.createdAt = deal.createdAt
        this.updatedAt = deal.updatedAt

        if (deal.listing) {
            this.listing = new ListingDto(deal.listing)
        }

        if (deal.messages) {
            this.messages = deal.messages.map(m => new MessageDto(m))
        }
    }
}

class DealListDto {
    constructor(deals, total, page, limit) {
        this.deals = deals.map(d => new DealDto(d))
        this.total = total
        this.page = page
        this.totalPages = Math.ceil(total / limit)
    }
}

module.exports = { DealDto, DealListDto }