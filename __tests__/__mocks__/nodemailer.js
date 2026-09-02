jest.mock('../../workers/mailQueue', () => ({
    add: jest.fn().mockResolvedValue({ id: 'mock-job-id' }),
    process: jest.fn(),
    on: jest.fn(),
    close: jest.fn().mockResolvedValue()
}))