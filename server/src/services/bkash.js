const baseUrl = () => process.env.BKASH_BASE_URL;

let cachedToken = { value: null, expiresAt: 0 };

export const isBkashConfigured = () =>
  Boolean(
    process.env.BKASH_APP_KEY &&
      process.env.BKASH_APP_SECRET &&
      process.env.BKASH_USERNAME &&
      process.env.BKASH_PASSWORD
  );

const getToken = async () => {
  if (cachedToken.value && Date.now() < cachedToken.expiresAt) {
    return cachedToken.value;
  }

  const res = await fetch(`${baseUrl()}/tokenized/checkout/token/grant`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      username: process.env.BKASH_USERNAME,
      password: process.env.BKASH_PASSWORD,
    },
    body: JSON.stringify({
      app_key: process.env.BKASH_APP_KEY,
      app_secret: process.env.BKASH_APP_SECRET,
    }),
  });

  const data = await res.json();

  if (!data.id_token) {
    throw new Error("bKash token পাওয়া যায়নি");
  }

  cachedToken = {
    value: data.id_token,
    expiresAt: Date.now() + (Number(data.expires_in) - 60) * 1000,
  };

  return cachedToken.value;
};

const post = async (path, body) => {
  const token = await getToken();

  const res = await fetch(`${baseUrl()}/tokenized/checkout/${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: token,
      "X-APP-Key": process.env.BKASH_APP_KEY,
    },
    body: JSON.stringify(body),
  });

  return res.json();
};

export const createPayment = async ({ amount, invoice, callbackURL, payerReference }) => {
  const data = await post("create", {
    mode: "0011",
    payerReference,
    callbackURL,
    amount: String(amount),
    currency: "BDT",
    intent: "sale",
    merchantInvoiceNumber: invoice,
  });

  if (!data.bkashURL) {
    throw new Error(data.statusMessage || "bKash পেমেন্ট শুরু করা যায়নি");
  }

  return data;
};

export const executePayment = (paymentID) => post("execute", { paymentID });
