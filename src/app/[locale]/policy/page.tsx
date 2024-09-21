import { Link } from "@/i18n/routing";
import Footer from "@/components/blocks/Footer";
import SiteLogoText from "@/components/typography/SiteLogoText";
import PageTitle from "@/components/typography/PageTitle";
import PageSubtitle from "@/components/typography/PageSubtitle";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

const PolicyPage = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center px-4 lg:px-8 py-4">
      <div className="w-full max-w-6xl">
        <SiteLogoText variant="small" includeSecondaryText />
      </div>
      <div className="w-full pt-4 pb-2 px-4 lg:px-8">
        <PageTitle text="Policy" />
      </div>
      <div className="w-full h-full flex flex-col items-center justify-center gap-4">
        <Card className="w-full max-w-6xl">
          <CardContent className="w-full">
            <p className="font-light w-full pt-6">
              This App and the Researchers (We, Us or Our) are committed to
              protecting and respecting your privacy in accordance with
              applicable data protection legislation. This policy sets out the
              basis on which any personal data We collect from You or that You
              provide to Us will be processed by Us. Please read the following
              carefully to understand Our views and practices regarding your
              personal information and how We will treat it. Please direct any
              queries about this privacy policy or the academic study to
              Alexander Loth (alexander.loth@stud.fra-uas.de).{" "}
            </p>
          </CardContent>
        </Card>
        <Card className="w-full max-w-6xl">
          <CardHeader>
            <PageSubtitle text="GDPR Statement" />
          </CardHeader>
          <CardContent className="w-full">
            <p className="font-light w-full">
              The legal basis for using your personal data is to carry out a
              task (i.e. academic research) in the public interest. Please
              contact Alexander Loth (alexander.loth@stud.fra-uas.de) with any
              questions about this privacy policy or the academic study.
            </p>
          </CardContent>
        </Card>
        <Card className="w-full max-w-6xl">
          <CardHeader>
            <PageSubtitle text="Information we may collect about you" />
          </CardHeader>
          <CardContent className="w-full">
            <p className="font-light w-full">
              We do not seek to collect or store information that would allow us
              to identify individuals using this application. To protect your
              privacy, we will only collect information that you choose to share
              with us if you agree to participate in the study. If you choose
              not to participate in this study, we will not collect any
              information about you. The information you choose to share with us
              may include your responses and results, as well as any questions
              you voluntarily choose to answer, which may include your age,
              education level, political affiliation, or other demographic
              variables. We collect device information such as browser version,
              operating system, and screen size. We also identify your location
              at the city level using the https://freeipapi.com/ service. All
              information we collect is stored on a password-protected computer
              accessible only to academic researchers.{" "}
            </p>
          </CardContent>
        </Card>
        <Card className="w-full max-w-6xl">
          <CardHeader>
            <PageSubtitle text="Data retention" />
          </CardHeader>
          <CardContent className="w-full">
            <p className="font-light w-full">
              We will keep the information you provide for as long as it is
              needed for the study.
            </p>
          </CardContent>
        </Card>
        <Card className="w-full max-w-6xl">
          <CardHeader>
            <PageSubtitle text="Uses of information" />
          </CardHeader>
          <CardContent className="w-full">
            <p className="font-light w-full">
              We use the information we hold about you in the following ways
              <br /> - To administer Our Site and for internal operations,
              including troubleshooting, data analysis, testing, research,
              statistical and survey purposes;
              <br /> - To improve Our Site to ensure that content is presented
              in the most effective manner for you and your device/computer;
              <br /> - To allow you to participate in interactive features of
              Our Service, if you choose to do so; as part of Our efforts to
              maintain the security of Our Site; for research purposes conducted
              internally or by trusted third parties.
              <br /> - Your information will only be used for non-commercial,
              non-political, scientific purposes to help us better understand
              people's behavior related to misinformation.{" "}
            </p>
          </CardContent>
        </Card>
        <Card className="w-full max-w-6xl">
          <CardHeader>
            <PageSubtitle text="Where we store your personal information" />
          </CardHeader>
          <CardContent className="w-full">
            <p className="font-light w-full">
              All information you provide to us will be stored on secure
              servers, both within the European Economic Area (EEA) and only
              with GDPR-compliant international data processors. Where
              international data processors are used, all appropriate technical
              and legal safeguards are in place to ensure that you receive the
              same level of protection as within the EEA. Once We have received
              your information, We will use strict procedures and security
              features to try to prevent unauthorized access. We will retain
              personal information for as long as necessary or permitted in
              light of the purpose(s) for which it was collected and in
              accordance with applicable law.
            </p>
          </CardContent>
        </Card>
        <Card className="w-full max-w-6xl">
          <CardHeader>
            <PageSubtitle text="Data Sharing to Meet Open Science Standards" />
          </CardHeader>
          <CardContent className="w-full">
            <p className="font-light w-full">
              In order to comply with open science standards administered by
              academic journals, we may share limited raw data on open science
              platforms for others to replicate or re-analyze. This data will
              exclude any personally identifiable information (age, gender,
              etc.) from the self-report questions, so there are no privacy
              risks or risks of de-identifying individuals. We will only display
              data about your results, not the information you share about your
              personal preferences or demographics.
            </p>
          </CardContent>
        </Card>
        <Card className="w-full max-w-6xl">
          <CardHeader>
            <PageSubtitle text="Deleting Data" />
          </CardHeader>
          <CardContent className="w-full">
            <p className="font-light w-full">
              If you wish to delete your data, we will generate a unique,
              anonymous, randomly generated ID that you can use to request
              deletion of your data by emailing Alexander Loth
              (alexander.loth@stud.fra-uas.de) with the ID within one year of
              completing the study. Your user ID will be displayed after you
              complete the consent form. Alternatively, if you lose this ID, you
              can tell us as much as possible about your submission and we will
              try to locate it and delete it.
            </p>
          </CardContent>
        </Card>
        <Card className="w-full max-w-6xl">
          <CardHeader>
            <PageSubtitle text="Your rights" />
          </CardHeader>
          <CardContent className="w-full">
            <p className="font-light w-full">
              Data protection legislation gives you a number of rights in
              relation to your personal data, including but not limited to the
              right to access information held about you. Our website may, from
              time to time, contain links to and from the websites of our
              partner networks and affiliates. If you follow a link to one of
              these sites, please be aware that these sites have their own
              privacy policies and that we are not responsible or liable for
              those policies. Please review those policies before submitting any
              personal information to those sites.
            </p>
          </CardContent>
        </Card>
        <Card className="w-full max-w-6xl">
          <CardHeader>
            <PageSubtitle text="Changes to Our Privacy Policy" />
          </CardHeader>
          <CardContent className="w-full">
            <p className="font-light w-full">
              Any changes We may make to Our Privacy Policy in the future will
              be posted on this page and, where appropriate, notified to you on
              the Site itself. Please check back periodically for any updates or
              changes to Our Privacy Policy. This Privacy Policy was updated on
              May 14, 2024.
            </p>
          </CardContent>
        </Card>
      </div>

      <Link href={"/home"} className="my-8">
        <Button variant="secondary" className="gap-2">
          <span>Back to Home</span>
          <ArrowUpRight size={16} />
        </Button>
      </Link>

      <div className="w-full max-w-6xl">
        <Footer variant="bottom" />
      </div>
    </div>
  );
};

export default PolicyPage;
