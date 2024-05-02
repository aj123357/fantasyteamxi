export const host = !window.location.href.includes("localhost:3000") ?"http://localhost:5008/v1/":
 "https://fantasyteam-api.vercel.app/v1/";
// export const host = "http://localhost:5008/v1/"
export const paymentPage = window.location.href.includes("localhost:3000") ? "https://pages.razorpay.com/pl_O477f4sISDrE4z/view" :
  "https://pages.razorpay.com/pl_O4KrR2j8ocF9iJ/view"