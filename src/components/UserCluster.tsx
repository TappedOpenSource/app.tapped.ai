import { UserModel } from "@/domain/types/user_model";
import UserChip from "./UserChip";

export default function UserCluster({
  users,
  onClick,
}: {
  users: UserModel[];
  onClick?: (user: UserModel) => void;
}) {
  return (
    <div className="flex flex-wrap gap-1">
      {users.map((user, index) => (
        <div key={index}>
          <UserChip user={user} onClick={onClick ? () => onClick(user) : undefined} />
        </div>
      ))}
    </div>
  );
}
