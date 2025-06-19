export const BASE_URL : string = "http://localhost:8080";
export const API_PATH = {
    AUTH:{
        LOGIN:"/api/v1/auth/login",
        REGISTER:"/api/v1/auth/register",
        GET_USER_INFO:"/api/v1/auth/get-user",
    },
    DASHBOARD:{
        GET_DATA:"/api/v1/dashboard/details"
    },
    INCOME:{
        ADD_INCOME:"/api/v1/income/add",
        GET_INCOME:"/api/v1/income/get",
        DOWNLOAD_EXCEL:"/api/v1/income/download-excel",
        DELETE_INCOME: (incomeId:string)=>`/api/v1/income/${incomeId}`
    },
    EXPENSE:{
        ADD_EXPENSE:"/api/v1/expense/add",
        GET_EXPENSE:"/api/v1/expense/get",
        DOWNLOAD_EXCEL:"/api/v1/expense/download-excel",
        DELETE_EXPENSE: (expenseId:string)=>`/api/v1/expense/${expenseId}`
    },
    IMAGE:{
        UPLOAD_IMAGE:"/api/v1/auth/upload-image"
    }
}