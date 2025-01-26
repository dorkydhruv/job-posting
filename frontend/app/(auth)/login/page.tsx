"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Lock, Mail } from "lucide-react";
import Link from "next/link";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    console.log("Login submitted:", { email, password });
    const data = { email, password };
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/login`,
        data,
        {
          withCredentials: true,
        }
      );
      console.log("Login response:", response.data);
      toast({
        title: response.data.message,
        type: response.data.status,
      });
      if (response.status === 200) {
        router.push("/dashboard");
        router.refresh();
      }
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  return (
    <div className='min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-teal-500 via-green-500 to-teal-600'>
      <Card className='w-full max-w-md backdrop-blur-sm bg-white/90'>
        <CardHeader className='space-y-3 pb-8'>
          <CardTitle className='text-3xl font-bold text-center text-gray-900'>
            Welcome Back
          </CardTitle>
          <CardDescription className='text-center text-base'>
            Sign in to your account to continue
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className='space-y-6'>
            <div className='space-y-2'>
              <Label htmlFor='email'>Email</Label>
              <div className='relative'>
                <Mail className='h-5 w-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2' />
                <Input
                  id='email'
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className='pl-10'
                  placeholder='Enter your email'
                  required
                />
              </div>
            </div>

            <div className='space-y-2'>
              <Label htmlFor='password'>Password</Label>
              <div className='relative'>
                <Lock className='h-5 w-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2' />
                <Input
                  id='password'
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className='pl-10'
                  placeholder='Enter your password'
                  required
                />
              </div>
            </div>

            <Button
              type='submit'
              className='w-full bg-teal-600 hover:bg-teal-700 text-white transition-colors'
              disabled={loading}
            >
              {loading ? (
                <div className='flex items-center justify-center'>
                  <LoadingSpinner />
                  <span className='ml-2'>Signing in...</span>
                </div>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </CardContent>

        <CardFooter className='border-t pt-6'>
          <p className='text-sm text-center w-full text-gray-600'>
            Don&#39;t have an account?{" "}
            <Link
              href='/register'
              className='text-teal-600 hover:text-teal-500 font-medium'
            >
              Register now
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
