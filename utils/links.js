import { GiPayMoney, GiSwapBag } from "react-icons/gi";
import { FaCoins, FaMoneyBillWaveAlt, FaUserTie } from "react-icons/fa";
import { IoPeople, IoPeopleSharp } from "react-icons/io5";
import {
  RiDashboardFill,
  RiSendPlaneFill,
  RiSmartphoneFill,
} from "react-icons/ri";
import { BiTransfer, BiTrendingUp } from "react-icons/bi";
import { MdManageAccounts } from "react-icons/md";
import { TiDocumentText } from "react-icons/ti";

export const navs = [
  {
    name: "Dashboard",
    link: "/",
    icon: <RiDashboardFill />,
  },
  // {
  //   name: "Fund Wallet",
  //   link: "/fund-wallet",
  //   icon: <FaMoneyBillWaveAlt />,
  // },
  {
    name: "Users",
    link: "/users",
    icon: <IoPeopleSharp />,
  },
  {
    name: "Agents",
    link: "/agents",
    icon: <FaUserTie />,
  },
  {
    name: "Logs",
    link: "/logs",
    icon: <TiDocumentText />,
  },
  // {
  //   name: "Buy & Sell Cyrpto",
  //   link: "/buy-and-sell",
  //   icon: <FaCoins />,
  // },
  // {
  //   name: "Send/Receive Money",
  //   link: "/auth/login",
  //   icon: <RiSendPlaneFill />,
  // },
  // {
  //   name: "Pay Bills",
  //   link: "/pay-bills",
  //   icon: <FaMoneyBillWaveAlt />,
  // },

  // {
  //   name: "Verifications",
  //   link: "/verifications",
  //   icon: <RiSmartphoneFill />,
  // },
  {
    name: "Transactions",
    link: "/transactions",
    icon: <BiTransfer />,
  },
  {
    name: "Investments",
    link: "/investments",
    icon: <GiPayMoney />,
  },
  // {
  //   name: "My Referrals",
  //   link: "/referrals",
  //   icon: <IoPeople />,
  // },
  // {
  //   name: "Take Loans",
  //   link: "/loans",
  //   icon: <GiSwapBag />,
  // },
  // {
  //   name: "Investment",
  //   link: "/investment",
  //   icon: <BiTrendingUp />,
  // },
  {
    name: "Settings",
    link: "/settings",
    icon: <MdManageAccounts />,
  },
  // {
  //   name: "Account Settings",
  //   link: "/account_settings",
  //   icon: <MdManageAccounts />,
  // },
];
