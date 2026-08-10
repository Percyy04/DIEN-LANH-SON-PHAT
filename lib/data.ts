import siteConfigData from '@/data/siteConfig.json';
import servicesData from '@/data/services.json';
import productsData from '@/data/products.json';
import postsData from '@/data/posts.json';
import projectsData from '@/data/projects.json';
import testimonialsData from '@/data/testimonials.json';
import partnersData from '@/data/partners.json';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

export interface SiteConfig {
  brandName: string;
  shortName: string;
  tagline: string;
  hotline: string;
  hotlineRaw: string;
  zalo: string;
  address: string;
  hours: string;
  email: string;
  facebook: string;
  serviceAreas: string[];
  warranty: string;
  themeColor: string;
  stats: { label: string; value: string }[];
}

export interface ServiceItem {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  priceFrom: string;
  tag?: string;
  badgeColor?: string;
  image: string;
  features: string[];
  issues?: string[];
  process?: { step: string; title: string; desc: string }[];
  priceTable?: { item: string; price: string }[];
  faqs?: { q: string; a: string }[];
}

export interface ProductItem {
  slug: string;
  name: string;
  brand: string;
  category?: string;
  price: string;
  image: string;
  capacity: string;
  inverter: boolean;
  origin: string;
  warranty: string;
  specs: string[];
  description: string;
}

export interface PostItem {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  author: string;
  readTime: string;
  image: string;
  content: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  location: string;
  image: string;
  description: string;
  completionDate: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  location: string;
  avatar: string;
  rating: number;
  comment: string;
}

export interface PartnerItem {
  name: string;
  country: string;
  category: string;
  description: string;
}

export function getSiteConfig(): SiteConfig {
  return siteConfigData as SiteConfig;
}

// Synchronous getters (using local JSON fallback)
export function getServices(): ServiceItem[] {
  return servicesData as ServiceItem[];
}

export function getServiceBySlug(slug: string): ServiceItem | undefined {
  return (servicesData as ServiceItem[]).find((s) => s.slug === slug);
}

export function getProducts(): ProductItem[] {
  return productsData as ProductItem[];
}

export function getProductBySlug(slug: string): ProductItem | undefined {
  return (productsData as ProductItem[]).find((p) => p.slug === slug);
}

export function getPosts(): PostItem[] {
  return postsData as PostItem[];
}

export function getPostBySlug(slug: string): PostItem | undefined {
  return (postsData as PostItem[]).find((post) => post.slug === slug);
}

export function getProjects(): ProjectItem[] {
  return projectsData as ProjectItem[];
}

export function getTestimonials(): TestimonialItem[] {
  return testimonialsData as TestimonialItem[];
}

export function getPartners(): PartnerItem[] {
  return partnersData as PartnerItem[];
}

// ====================================================================
// ASYNC SUPABASE GETTERS WITH LOCAL FALLBACK
// ====================================================================

export async function fetchServicesFromSupabase(): Promise<ServiceItem[]> {
  if (!isSupabaseConfigured() || !supabase) {
    return getServices();
  }

  try {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('created_at', { ascending: true });

    if (error || !data || data.length === 0) {
      console.warn('Supabase fetchServices fallback to local JSON:', error?.message);
      return getServices();
    }

    return data.map((item) => ({
      slug: item.slug,
      title: item.title,
      shortTitle: item.short_title || item.title,
      description: item.description,
      priceFrom: item.price_from,
      tag: item.tag,
      badgeColor: item.badge_color,
      image: item.image,
      features: item.features || [],
      issues: item.issues || [],
      process: item.process || [],
      priceTable: item.price_table || [],
      faqs: item.faqs || [],
    }));
  } catch (err) {
    console.error('Error fetching services from Supabase:', err);
    return getServices();
  }
}

export async function fetchServiceBySlugFromSupabase(slug: string): Promise<ServiceItem | undefined> {
  if (!isSupabaseConfigured() || !supabase) {
    return getServiceBySlug(slug);
  }

  try {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error || !data) {
      return getServiceBySlug(slug);
    }

    return {
      slug: data.slug,
      title: data.title,
      shortTitle: data.short_title || data.title,
      description: data.description,
      priceFrom: data.price_from,
      tag: data.tag,
      badgeColor: data.badge_color,
      image: data.image,
      features: data.features || [],
      issues: data.issues || [],
      process: data.process || [],
      priceTable: data.price_table || [],
      faqs: data.faqs || [],
    };
  } catch {
    return getServiceBySlug(slug);
  }
}

export async function fetchPostsFromSupabase(): Promise<PostItem[]> {
  if (!isSupabaseConfigured() || !supabase) {
    return getPosts();
  }

  try {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('date', { ascending: false });

    if (error || !data || data.length === 0) {
      console.warn('Supabase fetchPosts fallback to local JSON:', error?.message);
      return getPosts();
    }

    return data.map((item) => ({
      slug: item.slug,
      title: item.title,
      excerpt: item.excerpt,
      content: item.content,
      date: item.date,
      category: item.category,
      author: item.author,
      readTime: item.read_time,
      image: item.image,
    }));
  } catch (err) {
    console.error('Error fetching posts from Supabase:', err);
    return getPosts();
  }
}

export async function fetchPostBySlugFromSupabase(slug: string): Promise<PostItem | undefined> {
  if (!isSupabaseConfigured() || !supabase) {
    return getPostBySlug(slug);
  }

  try {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error || !data) {
      return getPostBySlug(slug);
    }

    return {
      slug: data.slug,
      title: data.title,
      excerpt: data.excerpt,
      content: data.content,
      date: data.date,
      category: data.category,
      author: data.author,
      readTime: data.read_time,
      image: data.image,
    };
  } catch {
    return getPostBySlug(slug);
  }
}

export async function fetchProductsFromSupabase(): Promise<ProductItem[]> {
  if (!isSupabaseConfigured() || !supabase) {
    return getProducts();
  }

  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: true });

    if (error || !data || data.length === 0) {
      console.warn('Supabase fetchProducts fallback to local JSON:', error?.message);
      return getProducts();
    }

    return data.map((item: any) => ({
      ...item,
      category: item.category || (
        item.slug.startsWith('tu-lanh') ? 'tu-lanh' :
        item.slug.startsWith('may-giat') ? 'may-giat' :
        item.slug.startsWith('may-loc-nuoc') ? 'may-loc-nuoc' :
        'may-lanh'
      )
    })) as ProductItem[];
  } catch (err) {
    console.error('Error fetching products from Supabase:', err);
    return getProducts();
  }
}

export async function fetchProductBySlugFromSupabase(slug: string): Promise<ProductItem | undefined> {
  if (!isSupabaseConfigured() || !supabase) {
    return getProductBySlug(slug);
  }

  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error || !data) {
      return getProductBySlug(slug);
    }

    return data as ProductItem;
  } catch {
    return getProductBySlug(slug);
  }
}
