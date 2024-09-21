"use client";

import { useTranslations } from "next-intl";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
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
import { ArrowRight } from "lucide-react";
import { Form } from "@/components/ui/form";
import { ProfileFormSchema } from "@/models/Profile";
import ProfileSetupForm from "./ProfileSetupForm";
import { useUserSession } from "@/providers/UserSessionProvider";
import { generateRandomUid } from "@/lib/profileUtils";

const ProfileSetupDialog = () => {
  const params = useParams();
  const t = useTranslations("HomePage");
  const { createNewProfile, localProfile, isLoading } = useUserSession();

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
    if (userLocale.length === 0) {
      userLocale = "en";
    }
    if (!localProfile) {
      // Create a new profile
      createNewProfile({
        uid: generateRandomUid(),
        createdAt: new Date(),
        username: values.username,
        gender: values.gender,
        ageGroup: values.age,
        educationLevel: values.educationLevel,
        employmentStatus: values.employmentStatus,
        politicalAffiliation: values.politicalAffiliation,
        locale: userLocale,
        userAgent: navigator.userAgent,
        screenResolution: `${window.screen.width}x${window.screen.height}`,
        totalScore: 0,
        servedArticles: [],
        achievementsUnlocked: [],
        avatarImageUrl: "",
      });
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          disabled={isLoading}
          variant={"default"}
          size={"lg"}
          className="w-full font-medium px-10 py-5 gap-2"
        >
          {t("takeTheQuizButton")}
          <ArrowRight size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col w-full items-center justify-center gap-2"
          >
            <DialogHeader className="w-full">
              <DialogTitle>{t("newProfileDialogTitle")}</DialogTitle>
              <DialogDescription>
                {t("newProfileDialogDescription")}
              </DialogDescription>
            </DialogHeader>
            <ProfileSetupForm form={form} />
            <DialogFooter className="w-full flex items-center justify-end py-2">
              <Button type="submit" className="w-full">
                {t("getSpottingButton")}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileSetupDialog;
