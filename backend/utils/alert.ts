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

type Alert = {
  status: AlertStatuses;
  icon: "fa-check" | "fa-ban" | "fa-info";
  title: "Success" | "Failed" | "Information";
  message: string;
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

  return buildAlert(message, status);
}

export function buildAlert(message: string, status: AlertStatuses): Alert {
  let icon: Alert["icon"];
  let title: Alert["title"];

  switch (status) {
    case AlertStatuses.Success:
      icon = "fa-check";
      title = "Success";
      break;
    case AlertStatuses.Error:
      icon = "fa-ban";
      title = "Failed";
      break;
    case AlertStatuses.Info:
      icon = "fa-info";
      title = "Information";
      break;
    default:
      throw new TypeError(`Unknown alert with status: ${status}`);
  }

  return { status, icon, title, message };
}

export function setAlert(
  req: express.Request<unknown>,
  alert: Pick<Alert, "message" | "status">
) {
  req.flash(AlertTypes.Message, alert.message);
  req.flash(AlertTypes.Status, alert.status);
}
