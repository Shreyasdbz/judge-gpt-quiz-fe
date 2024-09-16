"use client";

import { useState, useTransition } from "react";
import { useTranslations } from "next-intl";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  AgeGroupOptions,
  GenderOptions,
  EmploymentStatusOptions,
  PoliticalAffiliationOptions,
  EducationLevelOptions,
} from "@/models/Profile";
import { Checkbox } from "@/components/ui/checkbox";
import { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { checkIfUsernameIsAvailable } from "@/lib/profileUtils";
import { CheckCheck, CircleSlash, LoaderCircle } from "lucide-react";

const ProfileSetupForm = ({
  form,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any, any, undefined>;
}) => {
  const translations = useTranslations("HomePage");
  const [isPending, startTransition] = useTransition();
  const [usernameIsAvailable, setUsernameIsAvailable] = useState<
    boolean | null
  >(null);

  function onUsernameCheck(username: string) {
    // Trip the username to remove whitespace characters
    const trimmedUsername = username.trim().replace(/\s/g, "");
    // Update the form value with the trimmed username
    form.setValue("username", trimmedUsername);
    startTransition(() => {
      checkIfUsernameIsAvailable(trimmedUsername).then((isAvailable) => {
        setUsernameIsAvailable(isAvailable);
        // Set the form value to the username availability
        form.setValue("usernameIsAvailable", isAvailable);
      });
    });
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4">
      {/* Username field */}
      <FormField
        control={form.control}
        name="username"
        render={({ field }) => (
          <FormItem className="flex flex-col w-full items-center justify-center gap-0">
            <FormLabel className="w-full text-left">
              {translations("newProfileUsernameLabel")}
            </FormLabel>
            <FormControl className="w-full">
              <div className="w-full flex flex-row items-center justify-center gap-1">
                <Input
                  placeholder={translations("newProfileUsernamePlaceholder")}
                  className="w-full"
                  {...field}
                  onBlur={(e) => {
                    e.preventDefault();
                    setUsernameIsAvailable(null);
                    onUsernameCheck(form.getValues("username"));
                  }}
                />
                <Button
                  // Disable pointer events if the username is being checked
                  className={
                    isPending ? "pointer-events-none bg-muted" : "px-8"
                  }
                  variant={"secondary"}
                  onClick={(e) => {
                    e.preventDefault();
                    onUsernameCheck(form.getValues("username"));
                  }}
                >
                  {translations("newProfileUsernameCheckButton")}
                  {/* Show a loading spinner while checking the username */}
                  {isPending && (
                    <LoaderCircle className="animate-spin" size={16} />
                  )}
                </Button>
              </div>
            </FormControl>
            <FormDescription className="w-full text-left flex-col flex items-center justify-center">
              {usernameIsAvailable === null && (
                <span className="w-full text-left">
                  {translations("newProfileUsernameDescription")}
                </span>
              )}
              {usernameIsAvailable !== null && usernameIsAvailable === true && (
                <span className="w-full flex items-center justify-start gap-1">
                  <CheckCheck className=" text-green-500" size={12} />
                  {translations("newProfileUsernameCheckSuccess")}
                </span>
              )}
              {usernameIsAvailable !== null &&
                usernameIsAvailable === false && (
                  <span className="w-full flex items-center justify-start gap-1">
                    <CircleSlash size={12} className="text-red-500" />
                    {translations("newProfileUsernameCheckError")}
                  </span>
                )}
            </FormDescription>
            <FormMessage {...field} />
          </FormItem>
        )}
      />

      {/* Gender Field */}
      <FormField
        control={form.control}
        name="gender"
        render={({ field }) => (
          <FormItem className="flex flex-col w-full items-center justify-center gap-0">
            <FormLabel className="w-full text-left">
              {translations("newProfileGenderLabel")}
            </FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl className="w-full">
                <SelectTrigger className="w-full">
                  <SelectValue
                    placeholder={translations("newProfileGenderPlaceholder")}
                  />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value={GenderOptions.Male}>
                  {translations("newProfileGenderOptionMale")}
                </SelectItem>
                <SelectItem value={GenderOptions.Female}>
                  {translations("newProfileGenderOptionFemale")}
                </SelectItem>
                <SelectItem value={GenderOptions.Other}>
                  {translations("newProfileGenderOptionOther")}
                </SelectItem>
                <SelectItem value={GenderOptions.DeclineToSay}>
                  {translations("newProfileGenderOptionPreferNotToSay")}
                </SelectItem>
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />

      {/* Age field */}
      <FormField
        control={form.control}
        name="age"
        render={({ field }) => (
          <FormItem className="flex flex-col w-full items-center justify-center gap-0">
            <FormLabel className="w-full text-left">
              {translations("newProfileAgeLabel")}
            </FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl className="w-full">
                <SelectTrigger className="w-full">
                  <SelectValue
                    placeholder={translations("newProfileAgePlaceholder")}
                  />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value={AgeGroupOptions.Below18}>
                  {translations("newProfileAgeOptionUnder18")}
                </SelectItem>
                <SelectItem value={AgeGroupOptions.From18To24}>
                  {translations("newProfileAgeOption18to24")}
                </SelectItem>
                <SelectItem value={AgeGroupOptions.From25To34}>
                  {translations("newProfileAgeOption25to34")}
                </SelectItem>
                <SelectItem value={AgeGroupOptions.From35To44}>
                  {translations("newProfileAgeOption35to44")}
                </SelectItem>
                <SelectItem value={AgeGroupOptions.From45To54}>
                  {translations("newProfileAgeOption45to54")}
                </SelectItem>
                <SelectItem value={AgeGroupOptions.Above54}>
                  {translations("newProfileAgeOptionAbove55")}
                </SelectItem>
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />

      {/* Education level field */}
      <FormField
        control={form.control}
        name="educationLevel"
        render={({ field }) => (
          <FormItem className="flex flex-col w-full items-center justify-center gap-0">
            <FormLabel className="w-full text-left">
              {translations("newProfileEducationLevelLabel")}
            </FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl className="w-full">
                <SelectTrigger className="w-full">
                  <SelectValue
                    placeholder={translations(
                      "newProfileEducationLevelPlaceholder"
                    )}
                  />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value={EducationLevelOptions.HighSchool}>
                  {translations("newProfileEducationLevelOptionHighSchool")}
                </SelectItem>
                <SelectItem value={EducationLevelOptions.Bachelors}>
                  {translations("newProfileEducationLevelOptionBachelorDegree")}
                </SelectItem>
                <SelectItem value={EducationLevelOptions.Masters}>
                  {translations("newProfileEducationLevelOptionMastersDegree")}
                </SelectItem>
                <SelectItem value={EducationLevelOptions.PhD}>
                  {translations("newProfileEducationLevelOptionPhD")}
                </SelectItem>
                <SelectItem value={EducationLevelOptions.Other}>
                  {translations("newProfileEducationLevelOptionOther")}
                </SelectItem>
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />

      {/* Employment status field */}
      <FormField
        control={form.control}
        name="employmentStatus"
        render={({ field }) => (
          <FormItem className="flex flex-col w-full items-center justify-center gap-0">
            <FormLabel className="w-full text-left">
              {translations("newProfileEmploymentStatusLabel")}
            </FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl className="w-full">
                <SelectTrigger className="w-full">
                  <SelectValue
                    placeholder={translations(
                      "newProfileEmploymentStatusPlaceholder"
                    )}
                  />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value={EmploymentStatusOptions.Student}>
                  {translations("newProfileEmploymentStatusOptionStudent")}
                </SelectItem>
                <SelectItem value={EmploymentStatusOptions.Employed}>
                  {translations("newProfileEmploymentStatusOptionEmployed")}
                </SelectItem>
                <SelectItem value={EmploymentStatusOptions.Unemployed}>
                  {translations("newProfileEmploymentStatusOptionUnemployed")}
                </SelectItem>
                <SelectItem value={EmploymentStatusOptions.Retired}>
                  {translations("newProfileEmploymentStatusOptionRetired")}
                </SelectItem>
                <SelectItem value={EmploymentStatusOptions.Other}>
                  {translations("newProfileEmploymentStatusOptionOther")}
                </SelectItem>
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />

      {/* Political affiliation field */}
      <FormField
        control={form.control}
        name="politicalAffiliation"
        render={({ field }) => (
          <FormItem className="flex flex-col w-full items-center justify-center gap-0">
            <FormLabel className="w-full text-left">
              {translations("newProfilePoliticalAffiliationLabel")}
            </FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl className="w-full">
                <SelectTrigger className="w-full">
                  <SelectValue
                    placeholder={translations(
                      "newProfilePoliticalAffiliationPlaceholder"
                    )}
                  />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem
                  value={PoliticalAffiliationOptions.VeryConservative}
                >
                  {translations(
                    "newProfilePoliticalAffiliationOptionVeryConservative"
                  )}
                </SelectItem>
                <SelectItem value={PoliticalAffiliationOptions.Conservative}>
                  {translations(
                    "newProfilePoliticalAffiliationOptionConservative"
                  )}
                </SelectItem>
                <SelectItem value={PoliticalAffiliationOptions.Moderate}>
                  {translations(
                    "newProfilePoliticalAffiliationOptionIndependent"
                  )}
                </SelectItem>
                <SelectItem value={PoliticalAffiliationOptions.Liberal}>
                  {translations(
                    "newProfilePoliticalAffiliationOptionProgressive"
                  )}
                </SelectItem>
                <SelectItem value={PoliticalAffiliationOptions.VeryLiberal}>
                  {translations(
                    "newProfilePoliticalAffiliationOptionVeryProgressive"
                  )}
                </SelectItem>
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />

      {/* Consent Field */}
      <FormField
        control={form.control}
        name="consentToDataCollection"
        render={({ field }) => (
          <FormItem className="flex flex-row w-full items-center justify-center gap-2">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="flex w-full items-center justify-center text-left">
              <FormLabel className="w-full mb-1.5">
                {translations("newProfileConsentLabel")}
              </FormLabel>
            </div>
          </FormItem>
        )}
      />
    </div>
  );
};

export default ProfileSetupForm;
