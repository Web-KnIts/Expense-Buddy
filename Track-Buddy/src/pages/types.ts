
export interface iloginCredential{
    email:string,
    password:string,
    error?:string
}

export interface isignupCredential extends iloginCredential{
   fullname:string,
   confirmPassword:string
}

export type User = {
    _id:string;
    fullname:string;
    email:string;
    password:string;
    profileImageUrl:string;
    createdAt:Date;
    updatedAt:Date;
    isDeleted:boolean;
    isVerified:boolean;
} | null;

export interface iUserResponse{
    status:string | number;
    message:string;
    id:string;
    user:User;
    token:string;
}

export interface iIncome{
    _id:string;
    userId:string;
    icon:string;
    source:string;
    amount:number;
    date:string;
    createdAt:string;
    updatedAt:string;
}

export interface iExpense{
    _id:string;
    userId:string;
    icon:string;
    category:string;
    amount:number;
    date:string;
    createdAt:string;
    updatedAt:string;
}

type IncomeWithType = iIncome & { type: 'income' };
type ExpenseWithType = iExpense & { type: 'expense' };
export type iRecentTransaction = (IncomeWithType | ExpenseWithType)[] | [];

export interface iDashboardResponse{
    totalBalance:number;
    incomeDetails:{
        totalIncome:number;
        averageIncome:number;
        totalStatement:number;
        last60Days:{
            transaction:iIncome[]
        }
    };
    expenseDetails:{
        totalExpense:number;
        averageExpense:number;
        totalStatement:number;
        last60Days:{
            transaction:iExpense[]
        }
    };
    recentTransaction:iRecentTransaction
}

