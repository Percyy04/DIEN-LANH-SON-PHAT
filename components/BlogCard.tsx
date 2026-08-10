import React from 'react';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { PostItem } from '@/lib/data';

interface Props {
  post: PostItem;
}

export default function BlogCard({ post }: Props) {
  return (
    <article className="group bg-white rounded-2xl border border-slate-200 shadow-card-soft hover:shadow-card-hover hvac-card-transition flex flex-col overflow-hidden">
      <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <span className="absolute top-3 left-3 px-3 py-1 bg-hvac-navy/90 text-white font-extrabold text-[11px] rounded-xl border border-slate-700/60 shadow-md">
          {post.category}
        </span>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-2">
          <div className="flex items-center gap-3 text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-hvac-secondary" />
              {post.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-hvac-accent" />
              {post.readTime}
            </span>
          </div>

          <div className="text-base font-extrabold text-hvac-navy group-hover:text-hvac-primary transition-colors line-clamp-2 leading-snug">
            <Link href={`/blog/${post.slug}`}>
              {post.title}
            </Link>
          </div>

          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
            {post.excerpt}
          </p>
        </div>

        <div className="pt-2 border-t border-slate-100">
          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-extrabold text-hvac-primary hover:text-hvac-secondary transition-colors"
          >
            <span>Đọc bài viết</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-hvac-secondary" />
          </Link>
        </div>
      </div>
    </article>
  );
}
