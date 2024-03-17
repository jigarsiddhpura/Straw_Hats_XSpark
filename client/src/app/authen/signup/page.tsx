
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default async function LoginPage(){
  return (
    <div className="inset-0">
      <div className="h-full max-w-2xl mx-auto flex flex-col items-center justify-center gap-20">
        <Link href="/" className={"self-start -mt-20"}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Home
        </Link>
        
      </div>
    </div>
  );
};

