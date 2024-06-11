import { UserModel } from "@/domain/types/user_model";
import UserChip from "./UserChip";

export default function UserCluster({ users }: {
    users: UserModel[];
}) {
  return (
    <div className='flex flex-wrap gap-1'>
      {users.map((user, index) => (
        <div key={index}>
          <UserChip performer={user} />
        </div>
      ))}
    </div>
  );
}
