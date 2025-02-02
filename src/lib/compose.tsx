/* eslint-disable react/display-name */
import React from "react";

// TODO: fix typings here
const compose = (providers: any[]) =>
  providers.reduce((Prev, Curr) => ({ children }: any) => (
    <Prev>
      <Curr>{children}</Curr>
    </Prev>
  ));
export default compose;
