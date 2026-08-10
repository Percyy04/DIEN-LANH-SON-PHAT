import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { fetchPostBySlugFromSupabase, fetchPostsFromSupabase, getSiteConfig } from '@/lib/data';
import { Calendar, Clock, User, PhoneCall } from 'lucide-react';
import ContactForm from '@/components/ContactForm';

interface Props {
  params: Promise<{ slug: string }> | { slug: string };
}

export const revalidate = 60;

export async function generateStaticParams() {
  const posts = await fetchPostsFromSupabase();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const post = await fetchPostBySlugFromSupabase(resolvedParams.slug);
  if (!post) return { title: 'Bài viết không tồn tại' };

  return {
    title: `${post.title} | Blog Điện Lạnh Sơn Phát`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

function renderContentBlocks(content: string) {
  const paragraphs = content.split(/\n\n+/);

  return paragraphs.map((block, idx) => {
    const trimmed = block.trim();
    if (!trimmed) return null;

    if (trimmed.startsWith('## ')) {
      return (
        <h2 key={idx} className="text-xl sm:text-2xl font-black text-slate-900 pt-4 pb-1 border-b border-slate-200">
          {trimmed.replace('## ', '')}
        </h2>
      );
    }

    if (trimmed.startsWith('### ')) {
      return (
        <h3 key={idx} className="text-lg sm:text-xl font-bold text-brand-navy pt-3">
          {trimmed.replace('### ', '')}
        </h3>
      );
    }

    if (trimmed.startsWith('- ')) {
      const items = trimmed.split('\n').map((item) => item.replace(/^- /, '').trim());
      return (
        <ul key={idx} className="space-y-2 my-2 pl-4 list-disc text-slate-700 font-medium">
          {items.map((it, iIdx) => (
            <li key={iIdx}>{it}</li>
          ))}
        </ul>
      );
    }

    return (
      <p key={idx} className="text-slate-700 leading-relaxed text-sm sm:text-base">
        {trimmed}
      </p>
    );
  });
}

export default async function BlogPostDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const post = await fetchPostBySlugFromSupabase(resolvedParams.slug);
  const config = getSiteConfig();

  if (!post) {
    notFound();
  }

  return (
    <article className="py-10 space-y-12 max-w-5xl mx-auto px-4">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-500 font-bold uppercase tracking-wider">
        <Link href="/" className="hover:underline">Trang chủ</Link>
        <span>/</span>
        <Link href="/blog" className="hover:underline">Blog</Link>
        <span>/</span>
        <span className="text-slate-900 truncate">{post.title}</span>
      </div>

      {/* Header */}
      <div className="space-y-4 text-center max-w-3xl mx-auto">
        <span className="px-3 py-1 bg-brand-100 text-brand-700 font-bold text-xs rounded-full inline-block">
          {post.category}
        </span>
        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 leading-tight">
          {post.title}
        </h1>

        <div className="flex items-center justify-center gap-4 text-xs text-slate-500 pt-2 border-b border-slate-200 pb-4">
          <span className="flex items-center gap-1">
            <User className="w-3.5 h-3.5 text-brand-500" />
            {post.author}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-brand-500" />
            {post.date}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-brand-500" />
            {post.readTime}
          </span>
        </div>
      </div>

      {/* Featured Image */}
      <div className="relative h-64 sm:h-96 w-full rounded-3xl overflow-hidden shadow-lg border border-slate-200">
        <Image src={post.image} alt={post.title} fill className="object-cover" priority />
      </div>

      {/* Article Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm">
          {renderContentBlocks(post.content)}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-brand-navy text-white p-6 rounded-3xl space-y-4">
            <h3 className="font-bold text-lg text-white">Cần Thợ Điện Lạnh Phú Quốc?</h3>
            <p className="text-xs text-slate-300">
              Đội ngũ KTV Sơn Phát có mặt sau 20-30 phút tại Dương Đông, Bãi Trường, An Thới...
            </p>
            <a
              href={`tel:${config.hotlineRaw}`}
              className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs shadow-md transition-colors flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4" />
              <span>GỌI TƯ VẤN MIỄN PHÍ: {config.hotline}</span>
            </a>
          </div>

          <ContactForm />
        </div>
      </div>
    </article>
  );
}
