"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { JobCard } from "@/components/ui/job-card";

interface Company {
  _id: string;
  name: string;
  email: string;
  mobile: string;
}

interface Job {
  _id: string;
  title: string;
  description: string;
  experienceLevel: "JUNIOR" | "INTERMEDIATE" | "SENIOR";
  candidates: string[];
  endDate: string;
  company: Company;
}

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/jobs`,
          { withCredentials: true }
        );
        setJobs(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <div className='min-h-[60vh] flex items-center justify-center'>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className='max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8'>
      <header className='text-center mb-12 space-y-4'>
        <h1 className='text-4xl font-bold text-gray-900'>
          Available Positions
        </h1>
        <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
          Find your perfect role from our curated list of opportunities
        </p>
      </header>

      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {jobs.map((job) => (
          <JobCard
            key={job._id}
            title={job.title}
            company={job.company?.name}
            description={job.description}
            experienceLevel={job.experienceLevel}
            endDate={job.endDate}
            onApply={() => console.log("Applied to:", job.title)}
          />
        ))}
      </div>
    </div>
  );
}
