import { redirect } from "next/navigation";
import { cookies } from "next/headers";
export const POST = async () => {
  const cookie = await cookies();
  cookie.delete("jwt");
  return redirect("/login");
};
