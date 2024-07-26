import { getServerSession } from "next-auth";

import { authOptions } from "@/utils/authOptions";

export default async function getSession() {
  return await getServerSession(authOptions);
}
