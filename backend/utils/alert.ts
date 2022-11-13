import type express from "express";
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

type AlertIcons = "fa-check" | "fa-ban" | "fa-info";

type Alert = {
  message: string;
  status: AlertStatuses;
  icon: AlertIcons;
};

export function getAlert(
  req: express.Request<unknown>,
  custom?: { messageType: string; status: AlertStatuses }
) {
  const message = req.flash(custom?.messageType ?? AlertTypes.Message).at(0);
  const status =
    (req.flash(AlertTypes.Status).at(0) as AlertStatuses | undefined) ??
    custom?.status;

  if (_.isUndefined(message) || _.isUndefined(status)) {
    return undefined;
  }

  let icon: AlertIcons;
  switch (status) {
    case AlertStatuses.Success:
      icon = "fa-check";
      break;
    case AlertStatuses.Error:
      icon = "fa-ban";
      break;
    case AlertStatuses.Info:
      icon = "fa-info";
      break;
    default:
      throw new TypeError(`Unknown alert with status: ${status}`);
  }

  return Object.freeze<Alert>({ message, status, icon });
}

export function setAlert(
  req: express.Request<unknown>,
  alert: Omit<Alert, "icon">
) {
  req.flash(AlertTypes.Message, alert.message);
  req.flash(AlertTypes.Status, alert.status);
}
