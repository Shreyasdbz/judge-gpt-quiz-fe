"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { AvatarImage } from "@/models/Profile";
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
import { Pencil } from "lucide-react";
import Image from "next/image";

interface AvatarImages extends AvatarImage {
  url: string;
}

const AvatarUpdateDialog = () => {
  const [avatarOptions, setAvatarOptions] = useState<AvatarImages[]>([]);

  useEffect(() => {
    axios
      .get("/api/profile/avatar", {
        params: { avatarId: "all" },
        headers: {
          //
        },
      })
      .then((res) => {
        if (res.data && res.data.avatarData) {
          // Create URLs for the avatar images
          const avatarImages: AvatarImages[] = res.data.avatarData.map(
            (avatar: AvatarImage) => ({
              ...avatar,
              url: URL.createObjectURL(avatar.data),
            })
          );
          setAvatarOptions(avatarImages);
        }
      });
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex items-center justify-center relative rounded-full border-1 overflow-hidden hover:shadow-md">
          <Image
            src={"/assets/basic-avatar.jpeg"}
            alt="basic-avatar-image"
            width={120}
            height={120}
          />
          <div className="w-full bg-primary-foreground dark:bg-primary-foreground absolute bottom-0 flex items-center justify-center gap-1 px-1 py-2">
            <Pencil size={10} />
            <span className="text-sm text-muted-foreground dark:text-muted-foreground">
              Edit
            </span>
          </div>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="w-full">
          <DialogTitle>
            <span>Update profile</span>
          </DialogTitle>
          <DialogDescription>
            <span>Update</span>
          </DialogDescription>
        </DialogHeader>
        {avatarOptions.length > 0 && (
          <div className="grid-cols-2 lg-grid-cols-3 w-full h-full">
            {avatarOptions.map((avatar) => (
              <button
                key={avatar.name}
                className="flex items-center justify-center relative rounded-full border-1 overflow-hidden hover:shadow-md"
              >
                <Image
                  src={avatar.url}
                  alt={avatar.name}
                  width={120}
                  height={120}
                />
              </button>
            ))}
          </div>
        )}
        <DialogFooter className="w-full flex items-center justify-end py-2">
          <Button type="submit" className="w-full">
            <span>Save</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AvatarUpdateDialog;
