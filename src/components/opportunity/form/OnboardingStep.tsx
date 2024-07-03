import { FileUploader } from "@/components/forms/file-uploader";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserCheck } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import { useStepper } from "@/components/ui/stepper";

const formSchema = z.object({
  performerName: z.string().min(3).max(24),
  profilePicture: z.custom<File>().optional(),
  epk: z.custom<File>().optional(),
});

export default function OnboardingStep() {
  const {
    state: { currentUser },
  } = useAuth();
  const originalPerformerName = currentUser?.artistName;
  const originalProfilePicture = currentUser?.profilePicture ?? null;
  const originalPressKit = currentUser?.performerInfo?.pressKitUrl ?? null;
  const [currPressKit, setCurrPressKit] = useState<string | null>(
    originalProfilePicture
  );
  const [currProfilePicture, setCurrProfilePicture] = useState<string | null>(
    originalPressKit
  );
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      performerName: originalPerformerName,
    },
  });
  const { nextStep, prevStep, isDisabledStep } = useStepper();

  const [loading, setLoading] = useState(false);
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setLoading(true);
    const { performerName, profilePicture, epk } = data;

    if (currentUser === null) {
      console.log("create new user");
      console.log("set data to be the name, pfp, and epk put here");
      setLoading(false);
      nextStep();
      return;
    }

    if (performerName !== originalPerformerName) {
      console.log("update performer name");
      console.log("set data to be the name put here");
    }

    if (originalProfilePicture !== currProfilePicture) {
      console.log({ profilePicture });
      console.log("update profile picture");
      console.log("set data to be the pfp put here");
    }

    if (originalPressKit !== currPressKit) {
      console.log({ epk });
      console.log("update press kit");
      console.log("set data to be the epk put here");
    }

    // add new user info if something has changed
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
    nextStep();
  };

  return (
    <>
      <div className="mx-auto max-w-3xl space-y-6 py-12">
        <div className="space-y-2 text-start">
          <h1 className="text-3xl font-bold">basic info</h1>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="performerName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>performer name</FormLabel>
                  <FormControl>
                    <Input
                      id="performerName"
                      placeholder="doja cat"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {currProfilePicture ? (
              <>
                <p className="text-foreground/70 text-sm font-bold">
                  profile picture
                </p>
                <div className="flex flex-row gap-2">
                  <Avatar className="bg-background ml-2 hover:cursor-pointer hover:shadow-xl">
                    {currProfilePicture !== null && (
                      <AvatarImage
                        src={currProfilePicture}
                        style={{ objectFit: "cover", overflow: "hidden" }}
                      />
                    )}
                    <AvatarFallback>
                      <UserCheck className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    variant={"ghost"}
                    onClick={() => setCurrProfilePicture(null)}
                  >
                    upload another
                  </Button>
                </div>
              </>
            ) : (
              <FormField
                control={form.control}
                name="profilePicture"
                render={({ field: { onChange, ...fieldProps } }) => (
                  <FormItem>
                    <FormLabel>profile picture</FormLabel>
                    <FormControl>
                      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                      {/* @ts-ignore */}
                      <FileUploader
                        {...fieldProps}
                        label="click here to add an image"
                        onChange={(event) => {
                          const file =
                            event.target.files && event.target.files[0];
                          onChange(file);
                          if (file) {
                            setCurrProfilePicture(URL.createObjectURL(file));
                          }
                        }}
                      />
                    </FormControl>
                    {originalProfilePicture !== null && (
                      <FormDescription>
                        <Button
                          variant={"ghost"}
                          onClick={() =>
                            setCurrProfilePicture(originalProfilePicture)
                          }
                        >
                          reset
                        </Button>
                      </FormDescription>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {currPressKit ? (
              <>
                <p className="text-foreground/70 text-sm font-bold">
                  press kit (epk)
                </p>
                <Link
                  referrerPolicy="no-referrer"
                  target="_blank"
                  href={currPressKit}
                >
                  <Button variant={"secondary"}>view current press kit</Button>
                </Link>
              </>
            ) : (
              <FormField
                control={form.control}
                name="epk"
                render={({ field: { onChange, ...fieldProps } }) => (
                  <FormItem>
                    <FormLabel>press kit</FormLabel>
                    <FormControl>
                      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                      {/* @ts-ignore */}
                      <FileUploader
                        {...fieldProps}
                        label="click here to add your press kit"
                        onChange={(event) =>
                          onChange(event.target.files && event.target.files[0])
                        }
                      />
                    </FormControl>
                    {originalPressKit !== null && (
                      <FormDescription>
                        <Button
                          variant={"ghost"}
                          onClick={() => setCurrPressKit(originalPressKit)}
                        >
                          reset
                        </Button>
                      </FormDescription>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <div className="flex w-full flex-row gap-2">
              <Button
                disabled={isDisabledStep}
                onClick={prevStep}
                size="sm"
                variant="secondary"
                className="w-full"
              >
                prev
              </Button>
              <Button size="sm" type="submit" className="w-full">
                next
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}
