// Use this utility hook as a workaround for this issue:
// https://github.com/react-hook-form/devtools/issues/178
//
// How to use?
// const formDevtoolConfig = useFormDevtool(control);
// <FormDevtool config={formDevtoolConfig} />
//

import { DevTool } from "@hookform/devtools";
import { useEffect, useState } from "react";
import type { Control } from "react-hook-form";

export function useFormDevtool(
  control: Control<any, any>
): UseFormDevtoolResult {
  // Control with state to render only on the Client Side
  const [isDevToolEnabled, setIsDevToolEnabled] = useState(false);

  useEffect(() => {
    setIsDevToolEnabled(true);
  }, []);

  return Object.freeze({ isDevToolEnabled, control });
}

type UseFormDevtoolResult = Readonly<{
  isDevToolEnabled: boolean;
  control: Control<any, any>;
}>;

type FormDevtoolProps = {
  config: UseFormDevtoolResult;
};

export function FormDevtool({ config }: FormDevtoolProps) {
  return config.isDevToolEnabled ? <DevTool control={config.control} /> : null;
}
