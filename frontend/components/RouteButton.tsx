"use client";
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export default function RouteButton({
  classname,
  text,
  route,
}: {
  classname?: string;
  text: string;
  route?: string;
}) {
  const router = useRouter();
  return (
    <Button
      size='lg'
      className={classname}
      onClick={async () => {
        router.push(`${route}`);
      }}
    >
      {text}
      <ArrowRight className='ml-2 h-4 w-4' />
    </Button>
  );
}
