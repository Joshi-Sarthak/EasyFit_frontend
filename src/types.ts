// & (here) is a smell!
export type Endpoint<T extends object> = T & {error: string}

export type Session = {email: string; token: string}
