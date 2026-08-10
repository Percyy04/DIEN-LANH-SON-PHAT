import React from 'react';
import { MapPin, Calendar, CheckCircle } from 'lucide-react';
import { ProjectItem } from '@/lib/data';

interface ProjectCardProps {
  project: ProjectItem;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-card-soft hover:shadow-card-hover hvac-card-transition overflow-hidden flex flex-col group">
      <div className="relative h-48 w-full overflow-hidden bg-slate-100">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
        
        {/* Category Tag */}
        <span className="absolute top-3 left-3 px-3 py-1 rounded-xl text-xs font-extrabold bg-hvac-primary text-white shadow-md">
          {project.category}
        </span>

        {/* Location Badge */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-xs font-semibold text-slate-200 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-xl">
          <MapPin className="w-3.5 h-3.5 text-hvac-secondary" />
          <span>{project.location}</span>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-2">
          <div className="font-extrabold text-base text-hvac-navy group-hover:text-hvac-primary transition-colors line-clamp-2">
            {project.title}
          </div>
          <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
            {project.description}
          </p>
        </div>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
          <div className="flex items-center gap-1">
            <CheckCircle className="w-3.5 h-3.5 text-hvac-accent" />
            <span>Hoàn thành chuẩn kĩ thuật</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>{project.completionDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
