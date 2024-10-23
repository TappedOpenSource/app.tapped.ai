import { Card } from "@/components/ui/card";
import { CloudUpload } from "lucide-react";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export function FileUploader({
  onChange,
  label,
  accept,
}: InputProps & {
  label: string;
  accept?: string;
}) {
  console.log({ onChange });
  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label className="cursor-pointer appearance-none">
        <Card className="flex aspect-video flex-col items-center justify-center p-4">
          <CloudUpload className="text-foreground/70 h-12 w-12" />
          <h4 className="text-foreground/70">{label}</h4>
          <input type="file" accept={accept} className="sr-only" onChange={onChange} />
        </Card>
      </label>
    </>
  );
}
