// create user context

import { createContext, useState } from "react";

export const UserContext = createContext();

const UserState = ({ children }) => {
  const [angId, setAngId] = useState<Number>(1);

  return (
    <UserContext.Provider
      value={{
        angId,
        setAngId,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserState;
