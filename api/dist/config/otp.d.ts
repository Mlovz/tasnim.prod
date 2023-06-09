declare class optService {
    generateOtp(): number;
    sendBySms(): void;
    verifyOtp(hashOtp: any, data: any): boolean;
}
declare const _default: optService;
export default _default;
