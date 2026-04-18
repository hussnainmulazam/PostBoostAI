"use client";
import { Link } from "react-router-dom";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";

const galleryItems = [
  {
    title: "Log In First",
    subtitle: "Log in to your account to get started",
    image: "./img1.png",
    span: "col-span-1",
  },
  {
    title: "Post Create with AI Agent",
    subtitle: "Create a post with AI Agent by uploading the image or video",
    image: "./img2.png",
    span: "md:col-span-2",
  },
  {
    title: "Schedule with AI Agent",
    subtitle: "Schedule a post with AI Agent by selecting the date and time",
    image: "./img3.png",
    span: "md:col-span-2",
  },
  {
    title: "See Account which are connected",
    subtitle: "See the accounts which are connected to your account",
    image: "./img4.png",
    span: "col-span-1",
  },
];

const AllInOne = () => {
  return (
    <section className="bg-gray-200 py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
      <div className="container mx-auto max-w-screen-2xl">
        {/* Header / Intro Section */}
        <div className="text-center mb-10 sm:mb-12 lg:mb-16 space-y-3 sm:space-y-4">
          <p className="text-xs sm:text-sm font-medium text-indigo-500 uppercase tracking-wider">
            All-in-one solution
          </p>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold max-w-3xl mx-auto leading-tight text-black px-2">
            The ultimate social media tool.{" "}
            <span className="text-indigo-400 font-bold">Unleash your reach</span> and boost your
            social media growth more than ever with{" "}
            <span className="font-extrabold text-indigo-400">PostBoost</span>.
          </h2>
          <p className="text-gray-800 max-w-2xl mx-auto text-sm sm:text-base md:text-lg px-4">
            Manage, create, and showcase your content effortlessly across platforms. Explore what's
            possible with our all-in-one gallery of powerful features.
          </p>
        </div>

        {/* Gallery Header */}
        <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-8">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-black">
            Explore Our Gallery
          </h3>

          <Link
            to="/blog/how-postboost-works"
            className="inline-block rounded-lg border bg-gray-700 border-gray-600 px-4 py-2 text-center text-xs sm:text-sm font-semibold text-gray-200 outline-none ring-indigo-300 transition-all duration-300 hover:bg-gray-600 hover:scale-105 hover:shadow-lg focus-visible:ring active:bg-gray-500 md:px-8 md:py-3 md:text-base"
          >
            View More
          </Link>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 md:gap-6 xl:gap-8">
          {galleryItems.map((item) => (
            <CardContainer key={item.title} containerClassName={`h-full w-full ${item.span}`} className="h-full w-full">
              <CardBody
                className={`group relative flex h-40 sm:h-52 md:h-60 lg:h-[20rem] items-end overflow-hidden rounded-xl sm:rounded-2xl bg-gray-900 shadow-lg hover:shadow-2xl transition-all w-full`}
              >
                <CardItem translateZ="80" className="absolute inset-0 h-full w-full">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover object-center transition duration-500"
                  />
                </CardItem>

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent opacity-70 transition duration-500 group-hover:opacity-80" />
                <div className="pointer-events-none absolute inset-0 ring-1 ring-white/15 group-hover:ring-white/30 transition duration-500 rounded-xl sm:rounded-2xl" />

                <CardItem translateZ="120" className="relative z-10 ml-4 mb-3 md:ml-5 md:mb-5 pointer-events-none">
                  <span className="inline-flex text-[10px] sm:text-xs uppercase tracking-[0.16em] text-white/80 mb-2">
                    Showcase
                  </span>
                  <h4 className="text-sm sm:text-base md:text-xl font-semibold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
                    {item.title}
                  </h4>
                  <p className="text-[11px] sm:text-xs md:text-sm text-white/85 mt-1">
                    {item.subtitle}
                  </p>
                </CardItem>
              </CardBody>
            </CardContainer>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AllInOne;
