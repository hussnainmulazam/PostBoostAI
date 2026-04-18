import { blogPosts } from "@/data/blogPosts";
import { ArrowLeft, ArrowUpRight, Calendar, Clock, User } from "lucide-react";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";

export function BlogDetail() {
  const { slug } = useParams();
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-transparent">
        <Navbar />
        <section className="pt-28 pb-16 px-4 sm:px-6">
          <div className="mx-auto max-w-3xl rounded-2xl border border-dashed border-gray-300 bg-white/80 p-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900">Article not found</h1>
            <p className="mt-2 text-gray-600">The post you are looking for does not exist.</p>
            <Link
              to="/blog"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-600 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  const relatedPosts = blogPosts
    .filter((item) => item.id !== post.id && item.category === post.category)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-transparent">
      <Navbar />
      <section className="relative overflow-hidden pt-24 sm:pt-28 pb-14 px-4 sm:px-6">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(99,102,241,0.15),transparent_38%),radial-gradient(circle_at_80%_0%,rgba(14,165,233,0.1),transparent_42%)]" />

        <article className="relative mx-auto max-w-7xl px-2 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-indigo-700 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>
          </motion.div>

          <motion.header
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="mb-7"
          >
            <div className="mb-4 flex flex-wrap items-center gap-3 text-xs sm:text-sm">
              <span className="rounded-full bg-indigo-100 px-3 py-1 font-semibold text-indigo-700">
                {post.category}
              </span>
              <span className="rounded-full bg-white px-3 py-1 text-gray-600 border border-gray-200">
                {post.readTime}
              </span>
            </div>
            <TextGenerateEffect
              words={post.title}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight max-w-4xl text-gray-900"
            />
            <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-gray-600">
              <span className="inline-flex items-center gap-1.5">
                <User className="h-4 w-4" />
                {post.author}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {post.date}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {post.readTime}
              </span>
            </div>
          </motion.header>

          <motion.div
            initial={{ opacity: 0, scale: 0.99 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, delay: 0.05 }}
          >
            <CardContainer className="inter-var w-full">
              <CardBody className="relative w-full overflow-hidden rounded-3xl border border-white/50 bg-white/70 shadow-[0_12px_32px_rgba(2,6,23,0.12)] hover:shadow-2xl transition-all duration-500">
                <CardItem translateZ="40" className="w-full">
                  <img
                    src={post.image}
                    alt={post.title}
                    loading="lazy"
                    decoding="async"
                    className="h-[240px] sm:h-[320px] lg:h-[420px] w-full object-cover"
                  />
                </CardItem>
              </CardBody>
            </CardContainer>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="mt-8 rounded-2xl border border-white/60 bg-white/80 p-6 sm:p-8 lg:p-10 shadow-[0_8px_24px_rgba(15,23,42,0.08)]"
          >
            <div className="prose prose-gray max-w-none">
              {post.content.map((item, index) => {
                if (typeof item === 'string') {
                  // Render standard paragraph (or handle simple markdown-like ### headers)
                  if (item.startsWith('### ')) {
                    return <motion.h3 
                             initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
                             key={index} className="text-xl sm:text-2xl font-bold text-gray-900 mt-10 mb-4">{item.replace('### ', '')}</motion.h3>;
                  }
                  return (
                    <motion.p 
                      key={index}
                      initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, delay: 0.05 }}
                      className="text-base sm:text-lg leading-8 text-gray-700 mb-6 last:mb-0"
                    >
                      {item}
                    </motion.p>
                  );
                } else if (item.type === 'image') {
                  return (
                    <motion.div 
                      key={index} 
                      className="my-10"
                      initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6 }}
                    >
                      <img 
                        src={item.src} 
                        alt={item.alt} 
                        className="w-full h-auto rounded-2xl shadow-lg border border-gray-200 object-cover max-h-[500px]" 
                      />
                      {item.caption && (
                        <p className="text-sm text-center text-gray-500 mt-3 font-medium italic">
                          {item.caption}
                        </p>
                      )}
                    </motion.div>
                  );
                }
                return null;
              })}
            </div>
          </motion.div>
        </article>

        {relatedPosts.length > 0 && (
          <section className="mx-auto max-w-7xl mt-16 px-2 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">Related posts</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
              {relatedPosts.map((relatedPost) => (
                <motion.article
                  key={relatedPost.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.35 }}
                  className="group overflow-hidden rounded-2xl border border-white/60 bg-white/85 shadow-[0_8px_24px_rgba(15,23,42,0.08)]"
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={relatedPost.image}
                      alt={relatedPost.title}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">{relatedPost.excerpt}</p>
                    <Link
                      to={`/blog/${relatedPost.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-700 hover:text-indigo-900 transition-colors"
                    >
                      Read More
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          </section>
        )}
      </section>
      <Footer />
    </div>
  );
}
