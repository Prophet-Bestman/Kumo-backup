import { createContext, useContext, useState } from "react";

const NavContext = createContext();

export const useNavContext = () => useContext(NavContext);

export const navStates = {
  dashboard: "Dashboard",
  fund_wallet: "Fund Wallet",
  buy_and_sell: "Buy & Sell Cyrpto",
  send_and_receive: "Send/Receive Money",
  pay_bills: "Pay Bills",
  airtime_and_data: "Airtime and Data",
  transactions: "Transactions",
  referrals: "My Referrals",
  loans: "Take Loans",
  account: "Account Settings",
  users: "Users",
  agents: "Agents",
  settings: "Settings",
  logs: "Logs",
  investments: "Investments",
  verifications: "Verifications",
};

const NavProvider = ({ children }) => {
  const [activeNav, setActiveNav] = useState("");

  return (
    <NavContext.Provider value={{ activeNav, setActiveNav }}>
      {children}
    </NavContext.Provider>
  );
};

export default NavProvider;
