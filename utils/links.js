import { GiSwapBag } from "react-icons/gi";
import { FaCoins, FaMoneyBillWaveAlt } from "react-icons/fa";
import { IoPeople, IoPeopleSharp } from "react-icons/io5";
import {
  RiDashboardFill,
  RiSendPlaneFill,
  RiSmartphoneFill,
} from "react-icons/ri";
import { BiTransfer, BiTrendingUp } from "react-icons/bi";
import { MdManageAccounts } from "react-icons/md";

export const navs = [
  {
    name: "Dashboard",
    link: "/",
    icon: <RiDashboardFill />,
  },
  {
    name: "Fund Wallet",
    link: "/fund-wallet",
    icon: <FaMoneyBillWaveAlt />,
  },
  {
    name: "Users",
    link: "/users",
    icon: <IoPeopleSharp />,
  },
  {
    name: "Buy & Sell Cyrpto",
    link: "/buy-and-sell",
    icon: <FaCoins />,
  },
  {
    name: "Send/Receive Money",
    link: "/auth/login",
    icon: <RiSendPlaneFill />,
  },
  {
    name: "Pay Bills",
    link: "/pay-bills",
    icon: <FaMoneyBillWaveAlt />,
  },

  {
    name: "Airtime and Data",
    link: "/airtime-and-data",
    icon: <RiSmartphoneFill />,
  },
  {
    name: "Transactions",
    link: "/transactions",
    icon: <BiTransfer />,
  },
  {
    name: "My Referrals",
    link: "/referrals",
    icon: <IoPeople />,
  },
  {
    name: "Take Loans",
    link: "/loans",
    icon: <GiSwapBag />,
  },
  {
    name: "Investment",
    link: "/investment",
    icon: <BiTrendingUp />,
  },
  {
    name: "Account Settings",
    link: "/account_settings",
    icon: <MdManageAccounts />,
  },
];
