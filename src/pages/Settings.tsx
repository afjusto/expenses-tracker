import React from "react";
import { RouteComponentProps } from "@reach/router";

import MainContainer from "components/MainContainer";

const Settings: React.FC<RouteComponentProps> = () => {
  return (
    <MainContainer title="Settings">
      <div>
        <h1>Settings</h1>
      </div>
    </MainContainer>
  );
};

export default Settings;
