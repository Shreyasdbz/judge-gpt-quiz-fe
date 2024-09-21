"use client";

import { useParams } from "next/navigation";
import { Pencil } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ProfileFormSchema } from "@/models/Profile";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useUserSession } from "@/providers/UserSessionProvider";
import { Form } from "@/components/ui/form";

const ProfileUpdateDialog = () => {
  const params = useParams();
  const { isLoading, localProfile } = useUserSession();

  const form = useForm<z.infer<typeof ProfileFormSchema>>({
    resolver: zodResolver(ProfileFormSchema),
    defaultValues: {
      username: "",
      usernameIsAvailable: false,
      gender: "",
      age: "",
      educationLevel: "",
      employmentStatus: "",
      politicalAffiliation: "",
      consentToDataCollection: false,
    },
  });

  function onSubmit(values: z.infer<typeof ProfileFormSchema>) {
    let userLocale = params.locale as string;

    console.log("values: ", values);

    if (userLocale.length === 0) {
      userLocale = "en";
    }
    if (localProfile) {
      // Update the profile
    } else {
      // Create a new profile
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          disabled={isLoading}
          variant={"outline"}
          className="font-medium gap-2"
        >
          <Pencil size={16} />
          <span>Edit Profile</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col w-full items-center justify-center gap-2"
          >
            <DialogHeader className="w-full">
              <DialogTitle>
                <span>Update profile</span>
              </DialogTitle>
              <DialogDescription>
                <span>Update</span>
              </DialogDescription>
            </DialogHeader>
            {/* <ProfileSetupForm form={form} /> */}
            <DialogFooter className="w-full flex items-center justify-end py-2">
              <Button type="submit" className="w-full">
                <span>Save</span>
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileUpdateDialog;
