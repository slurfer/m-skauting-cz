export type Maybe<T> = T | null | undefined

export type OrganizationDTO = {
    id: string
    name: string
    orgNumber: string
}

export type OrganizationUpdateDTO = Partial<Omit<OrganizationDTO, "id">>
