

export interface ProfileSchema {
    isProfileDataLoading: boolean;
    isProfileChangePasswordLoading: boolean;
    profileDataFetchMessage: {
        successTitle: string
        errorTitle: string
    };
    profileChangePasswordFetchMessage: {
        successTitle: string,
        errorTitle: string,
    }
}