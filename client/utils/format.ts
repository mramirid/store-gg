export function formatIDR(amount: number) {
  return amount.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  });
}

export function resolveApiImageURL(imageName: string) {
  return process.env["NEXT_PUBLIC_BACKEND_BASE_URL"] + "/uploads/" + imageName;
}

export function resolveApiEndpointURL(endpoint: string) {
  if (endpoint.charAt(0) !== "/") {
    throw new Error("An endpoint must start with the character '/'");
  }
  return process.env["NEXT_PUBLIC_BACKEND_BASE_URL"] + "/api/v1" + endpoint;
}
