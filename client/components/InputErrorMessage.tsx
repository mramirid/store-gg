import classNames from "classnames";
import { ErrorWithMessage, isErrorWithMessage } from "utils/error";

export default function InputErrorMessage(props: {
  error: Partial<ErrorWithMessage> | undefined;
  className: string;
}) {
  if (isErrorWithMessage(props.error)) {
    return (
      <div className={classNames("text-danger text-sm", props.className)}>
        {props.error.message}
      </div>
    );
  }

  return null;
}
