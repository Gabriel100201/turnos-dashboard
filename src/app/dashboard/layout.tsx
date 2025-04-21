import { redirect } from "next/navigation";
import { UserInfoComponent } from "./components/UserInfoComponent";
import { getSession } from "@/lib/auth-utils";
import { BreadcrumbComponent } from "@/components/BreadcrumbComponent";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();
  const user = session?.user;

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex flex-col gap-5 mx-auto py-8 container">
      <UserInfoComponent userInfo={user!} />
      <BreadcrumbComponent />
      {children}
    </div>
  );
}
