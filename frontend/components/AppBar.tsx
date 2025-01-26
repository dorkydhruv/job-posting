import { cookies } from "next/headers";
import Link from "next/link";
import { Logout } from "./Logout";
import { Suspense } from "react";
import { LoadingSpinner } from "./ui/loading-spinner";
import { Briefcase } from "lucide-react";

export const AppBar = async () => {
  const cookie = await cookies();
  const isLoggedIn = cookie.has("jwt");

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <nav className='fixed w-full z-50 bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-100'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between h-16'>
            <Link
              href='/'
              className='flex items-center space-x-2 transition-transform hover:scale-105'
            >
              <Briefcase className='h-8 w-8 text-teal-600' />
              <span className='text-2xl font-bold bg-gradient-to-r from-teal-600 to-green-600 bg-clip-text text-transparent'>
                JobPost
              </span>
            </Link>

            {!isLoggedIn ? (
              <div className='flex items-center space-x-4'>
                <Link
                  href='/login'
                  className='text-gray-600 hover:text-teal-600 px-4 py-2 rounded-md text-sm font-medium transition-colors'
                >
                  Sign In
                </Link>
                <Link
                  href='/register'
                  className='bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors'
                >
                  Get Started
                </Link>
              </div>
            ) : (
              <Logout />
            )}
          </div>
        </div>
      </nav>
      <div className='h-16' /> {/* Spacer for fixed navbar */}
    </Suspense>
  );
};
