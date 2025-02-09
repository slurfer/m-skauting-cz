export interface GeneralRejection {
    message: string
    name: string
    code: string
}

export interface NotFoundRejection extends GeneralRejection {
    code: "404"
    name: "NotFound"
}

export interface BadRequestRejection extends GeneralRejection {
    code: "400"
}

export interface BadRequestBodyRejection extends BadRequestRejection {
    code: "400"
    name: "BadRequestBody"
    field: string
}

export interface AlreadyExistsRejection extends BadRequestRejection {
    code: "400"
    name: "AlreadyExists"
}
