import { useEffect, useState } from "react";
import useAxiosInstance from "@/utils/axiosInstance";
import { useAuth } from "@/context/AuthProvider";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Mail, Briefcase, CreditCard, Building } from "lucide-react";

const MyProfile = () => {
  const { user } = useAuth();
  const axiosInstance = useAxiosInstance();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      axiosInstance
        .get(`/auth/user/${user.email}`)
        .then((res) => {
          setUserData(res.data);
        })
        .catch((err) => console.error("Error fetching profile:", err))
        .finally(() => setLoading(false));
    }
  }, [user, axiosInstance]);

  if (loading) {
    return <ProfileSkeleton />;
  }

  if (!userData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-gray-600">No profile data available.</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">My Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <Avatar className="w-32 h-32">
                <AvatarImage
                  src={userData.photo || "/default-avatar.png"}
                  alt="Profile"
                />
                <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <Badge className="absolute bottom-0 right-0" variant="secondary">
                {userData.role}
              </Badge>
            </motion.div>
            <div className="flex-1 space-y-4">
              <h2 className="text-2xl font-semibold text-center md:text-left">
                {userData.name}
              </h2>
              <div className="grid grid-cols-1 gap-4">
                <ProfileItem
                  icon={<Mail className="w-5 h-5" />}
                  label="Email"
                  value={userData.email}
                />
                <ProfileItem
                  icon={<Briefcase className="w-5 h-5" />}
                  label="Designation"
                  value={userData.designation}
                />
                <ProfileItem
                  icon={<CreditCard className="w-5 h-5" />}
                  label="Salary"
                  value={`$${userData.salary}`}
                />
                <ProfileItem
                  icon={<Building className="w-5 h-5" />}
                  label="Bank Account"
                  value={userData.bankAccountNo}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ProfileItem = ({ icon, label, value }) => (
  <div className="flex items-center space-x-2">
    {icon}
    <span>{label}:</span>
    <span className="font-medium">{value}</span>
  </div>
);

const ProfileSkeleton = () => (
  <div className="container mx-auto px-4 py-8">
    <Card className="max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <Skeleton className="h-8 w-48 mx-auto" />
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
          <Skeleton className="w-32 h-32 rounded-full" />
          <div className="flex-1 space-y-4">
            <Skeleton className="h-6 w-48" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-5 w-full" />
              ))}
            </div>
            <Skeleton className="h-10 w-32" />
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
);

export default MyProfile;
