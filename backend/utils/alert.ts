import type { Request } from "express";
import _ from "lodash";

const enum AlertTypes {
  Message = "FLASH_MESSAGE",
  Status = "FLASH_STATUS",
}

export enum AlertStatuses {
  Success = "success",
  Error = "danger",
  Info = "info",
}

type Alert = {
  message: string;
  status: AlertStatuses;
};

export function getAlert(
  req: Request,
  custom?: { messageType: string; status: AlertStatuses }
) {
  const message = req.flash(custom?.messageType ?? AlertTypes.Message).at(0);
  const status = req.flash(AlertTypes.Status).at(0) ?? custom?.status;

  if (_.isUndefined(message) || _.isUndefined(status)) {
    return undefined;
  }

  return Object.freeze<Alert>({
    message,
    status: status as AlertStatuses,
  });
}

export function setAlert(req: Request<unknown>, alert: Alert) {
  req.flash(AlertTypes.Message, alert.message);
  req.flash(AlertTypes.Status, alert.status);
}
