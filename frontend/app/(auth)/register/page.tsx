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
import { Building, Mail, Phone, Lock } from "lucide-react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export default function Register() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    console.log("Registration submitted:", {
      companyName,
      email,
      mobile,
      password,
    });
    const data = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/register`,
      {
        name: companyName,
        email,
        mobile,
        password,
      },
      {
        withCredentials: true,
      }
    );
    console.log("Registration response:", data.data);
    if (data.data.error) {
      toast({
        title: data.data.error,
        type: "background",
      });
    } else {
      toast({
        title: "Account created successfully",
        type: "foreground",
      });
    }
    setLoading(false);
  };

  return (
    <div className='min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-teal-500 via-green-500 to-teal-500'>
      <Card className='w-full max-w-md backdrop-blur-sm bg-white/90'>
        <CardHeader className='space-y-3'>
          <div className='flex justify-center mb-2'></div>
          <CardTitle className='text-3xl font-bold text-center'>
            Create Your Account
          </CardTitle>
          <CardDescription className='text-center text-base'>
            Join thousands of companies hiring top talent
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className='space-y-6'>
            <div className='space-y-2'>
              <Label>Company Name</Label>
              <div className='relative'>
                <Building className='h-5 w-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2' />
                <Input
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className='pl-10'
                  placeholder='Your company name'
                  required
                />
              </div>
            </div>
            <div className='space-y-2'>
              <Label>Email</Label>
              <div className='relative'>
                <Mail className='h-5 w-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2' />
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className='pl-10'
                  placeholder='Your email'
                  required
                />
              </div>
            </div>
            <div className='space-y-2'>
              <Label>Mobile</Label>
              <div className='relative'>
                <Phone className='h-5 w-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2' />
                <Input
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className='pl-10'
                  placeholder='Your mobile number'
                  required
                />
              </div>
            </div>
            <div className='space-y-2'>
              <Label>Password</Label>
              <div className='relative'>
                <Lock className='h-5 w-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2' />
                <Input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className='pl-10'
                  placeholder='Your password'
                  type='password'
                  required
                />
              </div>
            </div>
            <Button
              type='submit'
              className='w-full bg-teal-600 hover:bg-teal-700 text-white transition-colors'
              disabled={loading}
            >
              {loading ? <LoadingSpinner /> : "Create Account"}
            </Button>
          </form>
        </CardContent>

        <CardFooter className='border-t pt-6'>
          <p className='text-sm text-center w-full text-gray-600'>
            Already have an account?{" "}
            <a
              href='/login'
              className='text-teal-600 hover:text-teal-500 font-medium'
            >
              Sign in
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
