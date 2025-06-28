import { LuHandCoins, LuWalletMinimal } from "react-icons/lu";
import { addThousandsSeparator } from "../../services/helper";
import { IoMdCard } from "react-icons/io";
import InfoCard from "../Cards/InfoCard";

interface iFinanceOverviewProps {
    totalBalance:number;
    totalIncome:number;
    totalExpense:number;
}

const FinanceOverview = ({totalBalance,totalExpense,totalIncome}:iFinanceOverviewProps) => {
  return (
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            <InfoCard Icon={IoMdCard}
              label="Total Balance"
              value={addThousandsSeparator(totalBalance)}
              color="bg-yellow-400"
            />
            <InfoCard Icon={LuWalletMinimal}
              label="Total Income"
              value={addThousandsSeparator(totalIncome)}
              color="bg-green-400"
            />
             <InfoCard Icon={LuHandCoins}
              label="Total Expense"
              value={addThousandsSeparator(totalExpense)}
              color="bg-red-400"
            />
        </div>
  )
}

export default FinanceOverview