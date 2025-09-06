import { getUserByUsername } from "@/data/database";
import { UserModel } from "@/domain/types/user_model";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Sheet as BSheet } from "react-modal-sheet";
import { styled } from "styled-components";
import ProfileView from "./ProfileView";

const UserSheet = styled(BSheet)`
  .react-modal-sheet-container {
    background-color: #010f16ff !important;
  }

  .react-modal-sheet-backdrop {
    background-color: rgba(0, 0, 0, 0.3) !important;
  }

  .react-modal-sheet-drag-indicator {
    background-color: #666 !important;
  }
`;

export default function UserBottomSheet() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const username = searchParams.get("username");
  const isOpen = username !== null;

  const [selectedUser, setSelectedUser] = useState<UserModel | null>(null);
  useEffect(() => {
    if (username === null) {
      return;
    }
    const fetchUser = async () => {
      const user = await getUserByUsername(username);
      setSelectedUser(user ?? null);
    };
    fetchUser();
  }, [username]);

  const onClose = () => {
    setSelectedUser(null);
    const newPathname = pathname.replace(`?username=${username}`, "");
    router.push(newPathname);
  };

  return (
    <>
      <UserSheet isOpen={isOpen} onClose={onClose}>
        <BSheet.Container>
          <BSheet.Header />
          <BSheet.Content>
            <BSheet.Scroller>
              {selectedUser === null ? null : (
                <ProfileView username={selectedUser.username} />
              )}
            </BSheet.Scroller>
          </BSheet.Content>
        </BSheet.Container>
        <BSheet.Backdrop />
      </UserSheet>
    </>
  );
}
