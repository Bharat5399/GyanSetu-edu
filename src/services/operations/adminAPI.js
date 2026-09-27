import { toast } from "react-hot-toast"

import { apiConnector } from "../apiConnector"
import { profileEndpoints } from "../apis"

const { GET_ALL_USERS_API } = profileEndpoints

export const getAllUsers = async (token) => {
  const toastId = toast.loading("Loading...")
  let result = []
  try {
    const response = await apiConnector("GET", GET_ALL_USERS_API, null, {
      Authorization: `Bearer ${token}`,
    })
    if (!response.data.success) {
      throw new Error("Could not fetch users")
    }
    result = response.data.data
  } catch (error) {
    console.log("GET ALL USERS API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}