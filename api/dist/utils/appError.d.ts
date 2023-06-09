declare class AppError extends Error {
    statusCode: any;
    status: string;
    isOperational: boolean;
    constructor(message: any, statusCode: any);
}
export default AppError;
