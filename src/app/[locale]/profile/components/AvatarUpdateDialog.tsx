"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AvatarUrls, BASIC_AVATAR_URL } from "@/models/Profile";
import { useUserSession } from "@/providers/UserSessionProvider";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogDescription,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const AvatarUpdateDialog = () => {
  const { localProfile, isLoading, updateAvatar } = useUserSession();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedOption, setSelectedOption] =
    useState<string>(BASIC_AVATAR_URL);

  function onSelectAvatar(url: string) {
    setSelectedOption(url);
  }

  async function onSaveAvatar() {
    const result = await updateAvatar(selectedOption);
    if (result === true) {
      setDialogOpen(false);
    }
  }

  function handleOnOpenChange(change: boolean) {
    if (!change) {
      setDialogOpen(false);
    }
  }

  useEffect(() => {
    if (localProfile !== null) {
      setSelectedOption(localProfile.avatarImageUrl || BASIC_AVATAR_URL);
    }
  }, [localProfile]);

  if (localProfile === null) {
    return null;
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={handleOnOpenChange}>
      <DialogTrigger asChild>
        <button
          className="relative flex items-center justify-center overflow-hidden rounded-full border-1 group"
          onClick={() => {
            setDialogOpen(true);
          }}
        >
          <Image
            src={localProfile.avatarImageUrl || BASIC_AVATAR_URL}
            alt="basic-avatar-image"
            width={120}
            height={120}
            priority={true}
          />
          <div className="absolute bottom-0 items-center justify-center hidden w-full gap-1 px-1 py-2 group-hover:flex bg-primary-foreground dark:bg-primary-foreground">
            <span className="text-sm font-medium text-primary dark:text-primary">
              Edit
            </span>
          </div>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="w-full">
          <DialogTitle>
            <span>Update avatar</span>
          </DialogTitle>
          <DialogDescription>
            <span>Select an avatar from the options below</span>
          </DialogDescription>
        </DialogHeader>
        <div
          className={cn(
            "w-full h-full hidden grid-cols-2 lg:grid-cols-3  max-h-[50vh] overflow-y-scroll",
            { grid: !isLoading }
          )}
        >
          {AvatarUrls.map((avatarUrl) => (
            <div
              key={avatarUrl}
              className="flex items-center justify-center w-full px-2 py-2"
            >
              <button
                className={cn(
                  "w-fit flex items-center justify-center rounded-full border-4 w-100 h-100 p-0 m-0",
                  {
                    "border-primary": selectedOption === avatarUrl,
                    "border-transparent hover:border-muted-foreground/30":
                      selectedOption !== avatarUrl,
                  }
                )}
                onClick={() => {
                  onSelectAvatar(avatarUrl);
                }}
              >
                <Image
                  src={avatarUrl}
                  alt="avatar-image"
                  width={100}
                  height={100}
                  className="rounded-full"
                />
              </button>
            </div>
          ))}
        </div>
        {isLoading === true && (
          <div className="flex items-center justify-center w-full h-full">
            <span className="text-lg font-light">Loading...</span>
          </div>
        )}
        <DialogFooter className="flex items-center justify-end w-full py-2">
          <Button
            type="submit"
            className="w-full"
            onClick={onSaveAvatar}
            disabled={isLoading}
          >
            <span>Save</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AvatarUpdateDialog;
