export class ApiError extends Error {
    constructor(
        message: string,
        public statusCode: number,
    ) {
        super(message)
    }
}

export class NotFoundError extends ApiError {
    constructor(message: string) {
        super(message, 404)
    }
}

export class BadRequestError extends ApiError {
    constructor(message: string) {
        super(message, 400)
    }
}
