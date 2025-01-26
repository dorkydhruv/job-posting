import { Button } from "./button";
import { Badge } from "./badge";
import { Calendar, Briefcase, Users, Building } from "lucide-react";

interface JobCardProps {
  title: string;
  company?: string;
  description: string;
  experienceLevel: string;
  endDate: string;
  candidateCount?: number;
  onDelete?: () => void;
  onApply?: () => void;
  isDashboard?: boolean;
}

export function JobCard({
  title,
  company,
  description,
  experienceLevel,
  endDate,
  candidateCount,
  onDelete,
  onApply,
}: JobCardProps) {
  return (
    <div className='group relative bg-white/80 backdrop-blur-sm rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100/50'>
      <div className='p-6 space-y-4'>
        <div className='flex items-start justify-between'>
          <div className='space-y-1'>
            <h3 className='text-xl font-semibold text-gray-900 group-hover:text-teal-600 transition-colors'>
              {title}
            </h3>
            {company && (
              <div className='flex items-center text-gray-600'>
                <Building className='h-4 w-4 mr-1' />
                <span className='text-sm'>{company}</span>
              </div>
            )}
          </div>
          <Badge
            variant='outline'
            className='bg-teal-50 text-teal-700 border-teal-200'
          >
            {experienceLevel}
          </Badge>
        </div>

        <p className='text-gray-600 line-clamp-2'>{description}</p>

        <div className='flex flex-wrap gap-4 text-sm text-gray-500'>
          <div className='flex items-center'>
            <Calendar className='h-4 w-4 mr-2 text-teal-500' />
            <span>Closes {new Date(endDate).toLocaleDateString()}</span>
          </div>
          <div className='flex items-center'>
            <Briefcase className='h-4 w-4 mr-2 text-teal-500' />
            <span>{experienceLevel} Level</span>
          </div>
          {candidateCount !== undefined && (
            <div className='flex items-center'>
              <Users className='h-4 w-4 mr-2 text-teal-500' />
              <span>{candidateCount} Candidates</span>
            </div>
          )}
        </div>

        <div className='flex justify-end gap-3 pt-2'>
          {onDelete && (
            <Button variant='destructive' size='sm' onClick={onDelete}>
              Delete
            </Button>
          )}
          {onApply && (
            <Button className='bg-teal-600 hover:bg-teal-700' onClick={onApply}>
              Apply Now
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
