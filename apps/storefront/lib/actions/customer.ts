"use server"

import { cookies } from "next/headers"

export async function getCustomerSession() {
  const cookieStore = await cookies()
  const email = cookieStore.get("customer_email")?.value
  const name = cookieStore.get("customer_name")?.value
  
  if (!email) return null
  return { email, name: name || "Member" }
}

export async function loginCustomer(email: string, name: string) {
  const cookieStore = await cookies()
  cookieStore.set("customer_email", email, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  })
  cookieStore.set("customer_name", name, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 30,
  })
  return { success: true }
}

export async function logoutCustomer() {
  const cookieStore = await cookies()
  cookieStore.delete("customer_email")
  cookieStore.delete("customer_name")
  return { success: true }
}
