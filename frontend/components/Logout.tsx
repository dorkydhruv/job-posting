"use client";
import axios from "axios";
import { Button } from "./ui/button";
import { Suspense } from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const Logout = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Button
        variant='outline'
        className='text-gray-600 hover:text-teal-600 transition-colors m-4'
        disabled={loading}
        onClick={async () => {
          setLoading(true);
          await axios.post("/api/logout");
          router.refresh();
          setLoading(false);
        }}
      >
        {loading ? (
          <div className='flex items-center'>
            <div className='h-4 w-4 border-2 border-teal-600 border-t-transparent rounded-full animate-spin mr-2' />
            Logging out...
          </div>
        ) : (
          "Sign Out"
        )}
      </Button>
    </Suspense>
  );
};
