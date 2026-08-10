import React from 'react';
import { fetchPostsFromSupabase, getSiteConfig } from '@/lib/data';
import BlogCard from '@/components/BlogCard';

export const metadata = {
  title: 'Blog Tư Vấn Điện Lạnh Phú Quốc - Mẹo Sử Dụng & Sửa Máy Lạnh',
  description: 'Tổng hợp các bài viết chia sẻ kinh nghiệm chọn mua máy lạnh, cách sử dụng máy lạnh tiết kiệm điện và các dấu hiệu hư hỏng máy lạnh tại môi trường biển Phú Quốc.',
};

export const revalidate = 60; // Revalidate every 60 seconds (ISR)

export default async function BlogPage() {
  const posts = await fetchPostsFromSupabase();
  const config = getSiteConfig();

  return (
    <div className="py-12 space-y-12">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-brand-navy via-brand-800 to-brand-navy text-white py-12 px-4">
        <div className="max-w-7xl mx-auto text-center space-y-3">
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
            {config.brandName}
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold">
            Kinh Nghiệm & Kiến Thức Điện Lạnh
          </h1>
          <p className="text-sm text-slate-300 max-w-2xl mx-auto">
            Góc chia sẻ kinh nghiệm từ đội ngũ kỹ thuật viên hơn 10 năm tay nghề tại Phú Quốc.
          </p>
        </div>
      </section>

      {/* Blog Cards Grid */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}
