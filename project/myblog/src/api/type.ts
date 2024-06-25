//注册登录
export interface userInfo {
    account: string,
    password: string
}

export interface registerRes {
    code: number,
    msg: string,
    data: string
}
export interface userInfoRes {
    code: string,
    msg: string,
    data: {
        token: string,
        account: string,
        password: string,
        userId: string
    }
}
export interface newUerInfo {
    account: string,
    new_account: string;
    password: string
}
export interface newUerInfoRes {
    code: string,
    msg: string,
    data: {
        account: string,
        password: string,
    }
}
//分类接口