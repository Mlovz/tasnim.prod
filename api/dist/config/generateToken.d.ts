export declare const ACTIVE_TOKEN_SECRET: string | undefined, ACCESS_TOKEN_SECRET: string | undefined, REFRESH_TOKEN_SECRET: string | undefined;
export declare const generateActiveToken: (payload: object) => string;
export declare const generateAccessToken: (payload: object) => string;
export declare const generateRefreshToken: (payload: object, res: any) => string;
