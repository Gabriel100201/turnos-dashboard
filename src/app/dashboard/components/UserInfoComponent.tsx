import { Card } from "@/components/ui/card";
import { User } from "@/types/users";

export const UserInfoComponent = ({ userInfo }: { userInfo: User }) => {
  return (
    <Card style={{ paddingInline: "2rem", paddingBlock: "1rem" }}>
      <div className="flex flex-col gap-1">
        <h2 className="font-bold text-2xl">Bienvenido {userInfo?.nombre} </h2>
        <h4>{userInfo?.mail}</h4>
      </div>
    </Card>
  );
};
