
import { useRouter, useSearchParams } from "next/navigation";
import ContinueWithGoogleButton from "@/components/login/ContinueWithGoogleButton";

export default function AuthForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get("returnUrl");

  const onGoogleLogin = () => {
    router.push(returnUrl || "/map");
  };

  return (
    <>
      <ContinueWithGoogleButton
        onClick={onGoogleLogin}
      />
    </>
  );
}
