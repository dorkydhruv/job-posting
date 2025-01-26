import { Button } from "@/components/ui/button";
import { Users, Search, Star, TrendingUp, Clock, Github } from "lucide-react";
import { cookies } from "next/headers";
import RouteButton from "@/components/RouteButton";
import Link from "next/link";

export default async function LandingPage() {
  const cookie = await cookies();
  const isLoggedIn = cookie.has("jwt");
  return (
    <div className='min-h-screen bg-white'>
      <section className='relative min-h-[80vh] flex items-center bg-gradient-to-br from-teal-600 via-green-500 to-teal-700'>
        <div className='absolute inset-0 overflow-hidden'>
          <div className='absolute inset-0 bg-grid-white/[0.1] animate-grid' />
        </div>

        <div className='container mx-auto px-6 py-24 relative'>
          <div className='flex flex-col lg:flex-row items-center gap-12'>
            <div className='flex-1 text-center lg:text-left text-white space-y-6'>
              <h1 className='text-5xl lg:text-7xl font-bold animate-fade-in'>
                Find Your Next
                <span className='block text-teal-200'> Perfect Hire</span>
              </h1>
              <p className='text-xl text-teal-50 max-w-2xl mx-auto lg:mx-0'>
                Join thousands of companies using JobPost to find and hire top
                talent globally
              </p>
              <div className='flex flex-col sm:flex-row gap-4 justify-center lg:justify-start'>
                <RouteButton
                  text='Post Jobs'
                  route={isLoggedIn ? "/dashboard" : "/register"}
                  classname='bg-white text-teal-600 hover:bg-teal-50 transform hover:scale-105 transition'
                />
                <RouteButton
                  text='Browse Jobs'
                  route='/jobs'
                  classname='border-white bg-white text-black hover:bg-black/10 hover:text-white transform hover:scale-105 transition'
                />
              </div>
            </div>

            {/* Stats Cards */}
            <div className='grid grid-cols-2 gap-4 max-w-lg w-full'>
              <StatsCard icon={<Star />} number='4.8/5' text='Company Rating' />
              <StatsCard icon={<Users />} number='50k+' text='Active Users' />
              <StatsCard
                icon={<TrendingUp />}
                number='10k+'
                text='Jobs Posted'
              />
              <StatsCard icon={<Clock />} number='24h' text='Avg. Response' />
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className='py-12 bg-white'>
        <div className='container mx-auto px-6'>
          <div className='max-w-4xl mx-auto bg-white rounded-xl shadow-lg -mt-20 relative z-10 p-6'>
            <div className='flex flex-col md:flex-row gap-4'>
              <div className='relative flex-1'>
                <Search className='absolute left-3 top-3 h-5 w-5 text-gray-400' />
                <input
                  type='text'
                  disabled
                  placeholder='Job title or keyword'
                  className='w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent'
                />
              </div>
              <Button disabled className='bg-teal-600 hover:bg-teal-700'>
                Search Jobs
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className=' bg-white flex justify-start px-4 gap-3'>
        <Link href={`${process.env.NEXT_PUBLIC_GITHUB_REPO}`}>
          <Github className=' h-6 w-6 text-gray-500' />
        </Link>
        Made with ❤️ by Dhruv
      </section>
    </div>
  );
}

function StatsCard({
  icon,
  number,
  text,
}: {
  icon: React.ReactNode;
  number: string;
  text: string;
}) {
  return (
    <div className='bg-white/10 backdrop-blur-sm p-6 rounded-xl hover:bg-white/20 transition-all duration-300'>
      <div className='text-white'>
        <div className='flex items-center justify-center mb-2'>{icon}</div>
        <div className='text-2xl font-bold'>{number}</div>
        <div className='text-sm text-teal-100'>{text}</div>
      </div>
    </div>
  );
}
