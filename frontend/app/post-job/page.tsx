"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Briefcase, Calendar } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PostJob() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("BEGINNER");
  const [endDate, setEndDate] = useState("");
  const [candidates, setCandidates] = useState<string[]>([]);
  const [emailInput, setEmailInput] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (emailInput.trim() && isValidEmail(emailInput)) {
        setCandidates([...candidates, emailInput.trim()]);
        setEmailInput("");
      }
    }
  };

  const removeEmail = (emailToRemove: string) => {
    setCandidates(candidates.filter((email) => email !== emailToRemove));
  };

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    console.log("Job posted:", {
      title,
      description,
      experienceLevel,
      endDate,
      candidates,
    });
    const data = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/jobs`,
      {
        title,
        description,
        experienceLevel,
        endDate,
        candidates,
      },
      {
        withCredentials: true,
      }
    );
    console.log(data);
    setLoading(false);
    router.push("/dashboard");
  };

  return (
    <div className='min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-teal-500/10 via-green-500/10 to-teal-500/10'>
      <div className='max-w-3xl mx-auto'>
        <Card className='backdrop-blur-sm bg-white/90 shadow-xl'>
          <CardHeader className='space-y-1'>
            <div className='flex justify-center mb-4'>
              <Briefcase className='h-12 w-12 text-teal-600' />
            </div>
            <CardTitle className='text-3xl font-bold text-center text-gray-900'>
              Create a New Job Posting
            </CardTitle>
            <CardDescription className='text-center text-base'>
              Reach the right candidates with a well-crafted job posting
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className='space-y-6'>
              <div className='space-y-4'>
                <div className='space-y-2'>
                  <Label htmlFor='title' className='text-sm font-medium'>
                    Job Title
                  </Label>
                  <Input
                    id='title'
                    placeholder='e.g. Senior Software Engineer'
                    className='h-11'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='description'>Job Description</Label>
                  <textarea
                    id='description'
                    rows={4}
                    className='w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500'
                    placeholder='Describe the role and responsibilities'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div className='space-y-2'>
                    <Label htmlFor='experienceLevel'>Experience Level</Label>
                    <select
                      id='experienceLevel'
                      className='w-full h-11 rounded-md border border-gray-200 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500'
                      value={experienceLevel}
                      onChange={(e) => setExperienceLevel(e.target.value)}
                      required
                    >
                      <option value='BEGINNER'>Beginner</option>
                      <option value='INTERMEDIATE'>Intermediate</option>
                      <option value='EXPERT'>Expert</option>
                    </select>
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='endDate'>Application Deadline</Label>
                    <div className='relative'>
                      <Calendar className='h-5 w-5 text-gray-400 absolute left-3 top-3' />
                      <Input
                        id='endDate'
                        type='date'
                        className='pl-10 h-11'
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='candidates'>Candidates to Notify</Label>
                  <Input
                    id='candidates'
                    type='text'
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder='Type email and press Enter'
                  />
                  <div className='flex flex-wrap gap-2 mt-2'>
                    {candidates.map((email) => (
                      <span
                        key={email}
                        className='inline-flex items-center px-2 py-1 rounded-md text-sm bg-indigo-100 text-indigo-800'
                      >
                        {email}
                        <button
                          type='button'
                          onClick={() => removeEmail(email)}
                          className='ml-1 text-indigo-600 hover:text-indigo-800'
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <Button
                type='submit'
                className='w-full h-11 bg-teal-600 hover:bg-teal-700 text-white transition-colors'
                disabled={loading}
              >
                {loading ? <LoadingSpinner /> : "Post Job"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
