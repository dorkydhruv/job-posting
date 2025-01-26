"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Link from "next/link";
import { useMemo, useState } from "react";
import { JobCard } from "@/components/ui/job-card";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Alert, AlertDescription } from "@/components/ui/alert";

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

interface ApiError {
  isError: boolean;
  message: string;
}

export default function Dashboard() {
  const [postedJobs, setPostedJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiError>({ isError: false, message: "" });

  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError({ isError: false, message: "" });

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/my-jobs`,
        { withCredentials: true }
      );

      setPostedJobs(response.data);
    } catch (err) {
      setError({
        isError: true,
        message: "Failed to connect to server. Please try again later.",
      });
      console.error("API Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useMemo(() => {
    fetchJobs();
  }, []);

  const deleteJob = async (jobId: string) => {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/jobs/${jobId}`,
      {
        withCredentials: true,
      }
    );
    const data = await response.data;
    console.log(data);
    setPostedJobs((jobs) => jobs.filter((job) => job._id !== jobId));
  };

  return (
    <div className='max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8'>
      <header className='text-center mb-12 space-y-4'>
        <h1 className='text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-green-600'>
          Company Dashboard
        </h1>
        <p className='text-lg text-gray-600'>
          Manage your job postings and track applications
        </p>
      </header>

      {error.isError && (
        <Alert variant='destructive'>
          <AlertDescription>{error.message}</AlertDescription>
        </Alert>
      )}

      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className='grid gap-6 md:grid-cols-2'>
          {postedJobs.map((job) => (
            <JobCard
              key={job._id}
              title={job.title}
              description={job.description}
              experienceLevel={job.experienceLevel}
              endDate={job.endDate}
              candidateCount={job.candidates.length}
              onDelete={() => deleteJob(job._id)}
              isDashboard
            />
          ))}
        </div>
      )}

      <div className='mt-8 flex justify-end'>
        <Link href='/post-job'>
          <Button className='bg-teal-600 hover:bg-teal-700 text-white'>
            Post a New Job
          </Button>
        </Link>
      </div>
    </div>
  );
}
