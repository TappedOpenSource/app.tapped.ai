import SettingsForm from "@/components/settings/SettingsForm";
import UnauthHeader from "@/components/unauth_header";

export default function Page() {
  return (
    <>
      <UnauthHeader />
      <SettingsForm />
    </>
  );
}
