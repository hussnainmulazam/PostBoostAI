import { Calendar, User, Clock, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { blogPosts } from "@/data/blogPosts";

export function Blog() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [query, setQuery] = useState("");

  const featuredPost = blogPosts[0];
  const recentPosts = blogPosts.slice(1);
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(blogPosts.map((post) => post.category)))],
    [],
  );
  const filteredPosts = useMemo(() => {
    const normalizedQuery = query.toLowerCase();
    return recentPosts.filter((post) => {
      const categoryMatch = activeCategory === "All" || post.category === activeCategory;
      const queryMatch =
        post.title.toLowerCase().includes(normalizedQuery) ||
        post.excerpt.toLowerCase().includes(normalizedQuery);
      return categoryMatch && queryMatch;
    });
  }, [activeCategory, query, recentPosts]);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
  };

  return (
    <div className="min-h-screen bg-transparent">
      <Navbar />

      <section className="relative overflow-hidden pt-24 sm:pt-28 pb-14 sm:pb-20 px-4 sm:px-6">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.15),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(14,165,233,0.12),transparent_38%)]" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10 sm:mb-12 lg:mb-16 pt-8"
          >
            <span className="inline-flex rounded-full border border-purple-200 bg-purple-50 px-3 py-1 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.16em] text-purple-600 mb-4">
              PostBoost Journal
            </span>
            <TextGenerateEffect
              words="Insights that help creators grow faster"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight text-gray-900"
            />
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto font-medium leading-relaxed">
              Fresh ideas on social media strategy, content systems, and marketing execution. Stay ahead of the curve.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.12 }}
            className="mb-8 sm:mb-10"
          >
            <div className="rounded-2xl border border-white/60 bg-white/75 backdrop-blur-xl p-4 sm:p-5 shadow-[0_8px_24px_rgba(15,23,42,0.08)]">
              <div className="flex flex-col gap-4">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search articles..."
                  className="h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-indigo-300 focus:ring-2 focus:ring-indigo-200/70"
                />
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => {
                    const active = activeCategory === category;
                    return (
                      <button
                        key={category}
                        type="button"
                        onClick={() => setActiveCategory(category)}
                        className={`rounded-full px-3.5 py-2 text-xs sm:text-sm font-semibold transition ${
                          active
                            ? "bg-gray-900 text-white shadow-md"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {category}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="group relative overflow-hidden rounded-3xl border border-white/50 bg-white/70 backdrop-blur-xl shadow-[0_10px_35px_rgba(2,6,23,0.08)] mb-8 sm:mb-10"
          >
            <div className="grid lg:grid-cols-2">
              <div className="relative min-h-[260px] sm:min-h-[320px]">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-transparent lg:bg-gradient-to-r lg:from-black/45 lg:to-transparent" />
              </div>

              <div className="relative p-6 sm:p-8 lg:p-10">
                <div className="mb-4 flex items-center gap-3 text-xs sm:text-sm text-gray-500">
                  <span className="rounded-full bg-indigo-100 px-3 py-1 font-semibold text-indigo-700">
                    Featured
                  </span>
                  <span className="rounded-full bg-gray-100 px-3 py-1 font-medium text-gray-700">
                    {featuredPost.category}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 leading-tight mb-4">
                  {featuredPost.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 mb-6 leading-relaxed">
                  {featuredPost.excerpt}
                </p>
                <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-gray-500 mb-7">
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="h-4 w-4" />
                    {featuredPost.date}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <User className="h-4 w-4" />
                    {featuredPost.author}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="h-4 w-4" />
                    {featuredPost.readTime}
                  </span>
                </div>
                <Link
                  to={`/blog/${featuredPost.slug}`}
                  className="inline-flex items-center gap-2 rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-indigo-600 hover:shadow-lg hover:shadow-indigo-600/30"
                >
                  Read More
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </motion.article>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 sm:gap-10 lg:gap-12"
          >
            {filteredPosts.map((post) => (
              <motion.div variants={itemVariants} key={post.id}>
                <CardContainer className="inter-var">
                  <CardBody className="group relative overflow-hidden rounded-2xl border border-white/60 bg-white/80 backdrop-blur-md shadow-[0_8px_24px_rgba(15,23,42,0.08)] transition-all duration-300 hover:shadow-[0_18px_36px_rgba(15,23,42,0.16)] w-full h-full p-0">
                    <CardItem translateZ="100" className="w-full aspect-video overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-80" />
                    </CardItem>
                    
                    <CardItem translateZ="50" className="w-full p-5 sm:p-6">
                      <div className="flex items-center gap-3 mb-3 text-xs sm:text-sm text-gray-500">
                        <span className="rounded-full bg-gray-100 px-3 py-1 text-gray-700 font-medium">
                          {post.category}
                        </span>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span>{post.date}</span>
                        </div>
                      </div>
                      <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-2 leading-snug group-hover:text-indigo-600 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600 mb-5 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between pt-4 border-t border-gray-200/80 mb-4">
                        <div className="flex items-center gap-2">
                          <AnimatedTooltip items={[{ id: post.id, name: post.author, designation: "Author", image: `https://ui-avatars.com/api/?name=${encodeURIComponent(post.author)}&background=random` }]} />
                          <span className="text-xs sm:text-sm text-gray-500">{post.author}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-500">
                          <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                      <div className="pt-2">
                        <Link
                          to={`/blog/${post.slug}`}
                          className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-700 transition-colors hover:text-indigo-900"
                        >
                          Read More
                          <ArrowUpRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </CardItem>
                  </CardBody>
                </CardContainer>
              </motion.div>
            ))}
          </motion.div>

          {filteredPosts.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 rounded-2xl border border-dashed border-gray-300 bg-white/80 p-8 text-center"
            >
              <p className="text-gray-700 font-medium">No articles found</p>
              <p className="text-sm text-gray-500 mt-1">Try a different keyword or category.</p>
            </motion.div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
}

