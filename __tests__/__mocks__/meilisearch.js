jest.mock('../../services/searchService', () => ({
    init: jest.fn().mockResolvedValue(),

    // Для пользователей
    indexUser: jest.fn().mockResolvedValue(),
    searchUsers: jest.fn().mockResolvedValue({ items: [], total: 0 }),
    removeIndexedUser: jest.fn().mockResolvedValue(),

    // Для объявлений
    indexListing: jest.fn().mockResolvedValue(),
    searchListings: jest.fn().mockResolvedValue({ items: [], total: 0 }),
    removeIndexedListing: jest.fn().mockResolvedValue(),

    // Вспомогательные (если нужны)
    buildUserFilters: jest.fn().mockReturnValue(''),
    buildListingFilters: jest.fn().mockReturnValue('')
}))