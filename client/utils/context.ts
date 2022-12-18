import { isUndefined } from "lodash-es";
import React from "react";

export function createContext<A>() {
  const context = React.createContext<A | undefined>(undefined);

  function useContext() {
    const _context = React.useContext(context);
    if (isUndefined(_context)) {
      throw new Error("useContext must be inside a Provider with a value");
    }
    return _context;
  }

  return [useContext, context.Provider] as const;
}
