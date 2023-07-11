export interface ISignMessage {
    isSignatureValid: boolean;
    recoverSignInfo: RecoverSignatureInfo | null;
}

export interface RecoverSignatureInfo {
    messsage: string;
    signature: string;
}