import type { IconType } from "react-icons/lib"

export type iIncomeExpenseHeader = {
    Icon:IconType,
    label:string,
    value:number,
    color:string
}


export interface iInput {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    label?: string;
    type?: string;
}


export type iProfileAvatar = {
    image:File | null;
    setImage:React.Dispatch<React.SetStateAction<File | null>>;
}
