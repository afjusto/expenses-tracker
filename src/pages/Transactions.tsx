import React from "react";
import { RouteComponentProps } from "@reach/router";

import MainContainer from "components/MainContainer";

const Transactions: React.FC<RouteComponentProps> = () => {
  return (
    <MainContainer title="Transactions">
      <div>
        <h1>Transactions</h1>
      </div>
    </MainContainer>
  );
};

export default Transactions;
