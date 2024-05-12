
import ContinueWithGoogleButton from "@/components/login/ContinueWithGoogleButton";
import { useRouter, useSearchParams } from "next/navigation";

export default function AuthForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get("return_url");

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
