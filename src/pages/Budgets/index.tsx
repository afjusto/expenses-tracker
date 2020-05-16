import React from "react";
import { RouteComponentProps } from "@reach/router";

import MainContainer from "@/components/MainContainer";

const Budgets: React.FC<RouteComponentProps> = () => {
  return (
    <MainContainer title="Budgets">
      <div>
        <h1>Budgets</h1>
      </div>
    </MainContainer>
  );
};

export default Budgets;
