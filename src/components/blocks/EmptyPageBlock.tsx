import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import Footer from "./Footer";

const EmptyPageBlock = ({ pageName }: { pageName: string }) => {
  return (
    <div className="w-full h-dvh flex flex-col items-center justify-center gap-4 px-2 py-10">
      <div className="w-full flex items-center justify-center flex-col text-lg font-medium text-muted-foreground font-mono py-20">
        <span>JUDGE</span>
        <span>GPT</span>
      </div>
      <span className="w-full text-center text-3xl font-extrabold font-serif px-8">
        The {pageName} page is still under construction
      </span>
      <span className="font-light text-lg text-muted-foreground px-12">
        Please check back in a few
      </span>
      {/* Illustration */}
      <Link href={"/"}>
        <Button variant={"default"} size={"lg"}>
          Go back to home
        </Button>
      </Link>
      <div className="w-full h-full"></div>
      <Footer variant="both" />
    </div>
  );
};

export default EmptyPageBlock;
