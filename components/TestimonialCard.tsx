import React from 'react';
import { Star, Quote, MapPin, CheckCircle2 } from 'lucide-react';
import { TestimonialItem } from '@/lib/data';

interface TestimonialCardProps {
  testimonial: TestimonialItem;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-card-soft hover:shadow-card-hover hvac-card-transition space-y-4 flex flex-col justify-between relative group">
      <Quote className="absolute top-4 right-4 w-8 h-8 text-slate-100 group-hover:text-hvac-primary/10 transition-colors pointer-events-none" />
      
      <div className="space-y-3 relative z-10">
        {/* Rating Stars */}
        <div className="flex items-center gap-1">
          {Array.from({ length: testimonial.rating }).map((_, idx) => (
            <Star key={idx} className="w-4 h-4 fill-amber-400 text-amber-400" />
          ))}
        </div>

        {/* Comment Text */}
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal italic">
          "{testimonial.comment}"
        </p>
      </div>

      {/* Reviewer Profile */}
      <div className="pt-4 border-t border-slate-100 flex items-center gap-3 relative z-10">
        <img
          src={testimonial.avatar}
          alt={testimonial.name}
          className="w-11 h-11 rounded-full object-cover border-2 border-hvac-primary/20"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <h4 className="text-sm font-extrabold text-hvac-navy truncate">
              {testimonial.name}
            </h4>
            <CheckCircle2 className="w-3.5 h-3.5 text-hvac-accent shrink-0" />
          </div>
          <p className="text-xs text-slate-500 truncate">{testimonial.role}</p>
          <div className="flex items-center gap-1 text-[11px] text-hvac-primary font-medium mt-0.5">
            <MapPin className="w-3 h-3 text-hvac-secondary" />
            <span>{testimonial.location}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
