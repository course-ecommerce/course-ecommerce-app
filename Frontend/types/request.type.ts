export interface LoginRequest{
    username: string,
    password: string
}

export interface ChangePasswordRequest {
    userId: string,
    oldPassword: string,
    newPassword: string
}

export interface ForgotPasswordRequest {
    otp: string,
    email: string,
    newPassword: string
}

export interface SearchCourseRequest {
    levelIds?: string[];
    languageIds?: string[];
    topicIds?: string[];
    filterSortBy?: string,
    isFree?: boolean | null,
    keyword: string | null;
    pageIndex: number;
    pageSize: number;
}

export interface SearchRequest {
    sortBy: string,
    isDecrease: boolean;
    keyword: any;
    pageIndex: number;
    pageSize: number;
}