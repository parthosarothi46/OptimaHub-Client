import { motion } from "framer-motion";

const AboutUs = () => {
  return (
    <div>
      <main>
        {/* Hero section */}
        <div className="relative overflow-hidden">
          <div className="container mx-auto">
            <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
              <main className="mt-10 mx-auto container px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                <div className="sm:text-center lg:text-left">
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-4xl tracking-tight font-extrabold sm:text-5xl md:text-6xl"
                  >
                    <span className="block xl:inline">About</span>{" "}
                    <span className="block text-blue-600 xl:inline">
                      OptimaHub
                    </span>
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mt-3 text-base sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0"
                  >
                    We're on a mission to revolutionize employee management and
                    empower businesses to reach their full potential.
                  </motion.p>
                </div>
              </main>
            </div>
          </div>
        </div>

        {/* Mission section */}
        <div>
          <div className="container mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-extrabold">Our Mission</h2>
              <p className="mt-4 text-lg">
                At OptimaHub, we strive to create innovative solutions that
                simplify employee management, boost productivity, and foster a
                positive work environment. Our goal is to empower businesses of
                all sizes to optimize their workforce and achieve sustainable
                growth.
              </p>
            </div>
          </div>
        </div>

        {/* Stats section */}
        <div>
          <div className="container mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8 lg:py-20">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-extrabold sm:text-4xl">
                Trusted by businesses worldwide
              </h2>
              <p className="mt-3 text-xl sm:mt-4">
                Our platform has helped companies across various industries
                streamline their operations and boost employee satisfaction.
              </p>
            </div>
            <dl className="mt-10 text-center sm:max-w-3xl sm:mx-auto sm:grid sm:grid-cols-3 sm:gap-8">
              {[
                { name: "Employees Managed", stat: "1M+" },
                { name: "Companies Served", stat: "5,000+" },
                { name: "Countries Reached", stat: "50+" },
              ].map((item) => (
                <div key={item.name} className="flex flex-col mt-10 sm:mt-0">
                  <dt className="order-2 mt-2 text-lg leading-6 font-medium ">
                    {item.name}
                  </dt>
                  <dd className="order-1 text-5xl font-extrabold ">
                    {item.stat}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* Team section */}
        <div>
          <div className="container mx-auto py-12 px-4 text-center sm:px-6 lg:px-8 lg:py-24">
            <div className="space-y-12">
              <div className="space-y-5 sm:mx-auto sm:max-w-xl sm:space-y-4 lg:max-w-5xl">
                <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                  Meet Our Leadership
                </h2>
                <p className="text-xl">
                  Our experienced team is dedicated to driving innovation and
                  delivering exceptional results for our clients.
                </p>
              </div>
              <ul className="mx-auto space-y-16 sm:grid sm:grid-cols-2 sm:gap-16 sm:space-y-0 lg:grid-cols-3 lg:max-w-5xl">
                {[
                  {
                    name: "John Doe",
                    role: "CEO & Co-Founder",
                    imageUrl:
                      "https://www.perkosis.com/uploads/staffs/big/9.jpg",
                  },
                  {
                    name: "Jane Smith",
                    role: "CTO",
                    imageUrl:
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRDrklSzfO5RhwpysB8UcYqnyUClgNumgW38O73qRdD7O0pK3BBQ3MPrr2Mw45np4f17w",
                  },
                  {
                    name: "Mike Johnson",
                    role: "Head of Product",
                    imageUrl:
                      "https://pbs.twimg.com/profile_images/1807858058380349440/V8iMdtLm.jpg",
                  },
                ].map((person) => (
                  <li key={person.name}>
                    <div className="space-y-6">
                      <img
                        className="mx-auto h-40 w-40 rounded-full xl:w-56 xl:h-56"
                        src={person.imageUrl || "/placeholder.svg"}
                        alt=""
                      />
                      <div className="space-y-2">
                        <div className="text-lg leading-6 font-medium space-y-1">
                          <h3>{person.name}</h3>
                          <p className="text-blue-600">{person.role}</p>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AboutUs;
