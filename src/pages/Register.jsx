import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Upload } from "lucide-react";
import { useAuth } from "@/context/AuthProvider";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const Register = () => {
  const { register, googleLogin } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    designation: "",
    bankAccountNo: "",
    salary: "",
    photo: null,
  });

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      await googleLogin();
      toast.success("Successfully logged in with Google");
      navigate("/");
    } catch (error) {
      toast.error("Google login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = async (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsLoading(true);
      const uploadData = new FormData();
      uploadData.append("image", file);

      try {
        const response = await fetch(
          `https://api.imgbb.com/1/upload?key=${
            import.meta.env.VITE_IMGBB_API_KEY
          }`,
          {
            method: "POST",
            body: uploadData,
          }
        );
        const data = await response.json();
        if (data.success) {
          const imageUrl = data.data.url;
          setSelectedImage(imageUrl);
          setFormData((prev) => ({ ...prev, photo: imageUrl }));
        } else {
          toast.error("Failed to upload image. Please try again.");
        }
      } catch (error) {
        toast.error("Error uploading image. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{6,})/;
    return regex.test(password);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    // Validate password
    if (!validatePassword(formData.password)) {
      toast.error(
        "Password must be at least 6 characters long, include a capital letter, and a special character."
      );
      setIsLoading(false);
      return;
    }

    try {
      // Attempt to register the user
      const response = await register(formData);

      // Check if the backend response indicates success
      if (response?.insertedId) {
        toast.success("Account created successfully!");
        navigate("/");
      } else {
        // Handle unexpected backend responses
        toast.error(
          response?.data?.message || "Registration failed. Please try again."
        );
      }
    } catch (error) {
      toast.error("Registration failed. Please try again.");
    } finally {
      // Ensure loading state is reset
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-2xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Create an account
          </CardTitle>
          <CardDescription className="text-center">
            Enter your information below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-6">
            {/* Personal Information Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Personal Information</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john@example.com"
                    type="email"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  disabled={isLoading}
                />
              </div>
            </div>
            {/* Professional Information Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Professional Information</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select
                    id="role"
                    name="role"
                    value={formData.role}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, role: value }))
                    }
                    required
                    disabled={isLoading}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="employee">Employee</SelectItem>
                      <SelectItem value="hr">HR</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="designation">Designation</Label>
                  <Input
                    id="designation"
                    name="designation"
                    value={formData.designation}
                    onChange={handleInputChange}
                    placeholder="Sales Assistant"
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bankAccount">Bank Account Number</Label>
                  <Input
                    id="bankAccount"
                    name="bankAccountNo"
                    value={formData.bankAccountNo}
                    onChange={handleInputChange}
                    placeholder="XXXX-XXXX-XXXX-XXXX"
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="salary">Salary</Label>
                  <Input
                    id="salary"
                    name="salary"
                    type="number"
                    value={formData.salary}
                    onChange={handleInputChange}
                    placeholder="1000"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>
            </div>
            {/* Photo Upload Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Profile Photo</h3>
              <div className="space-y-2">
                <Label htmlFor="photo">Upload Photo</Label>
                <div className="flex flex-col items-center gap-4">
                  <div className="flex items-center justify-center w-32 h-32 border-2 border-dashed rounded-lg overflow-hidden bg-gray-50">
                    {selectedImage ? (
                      <img
                        src={selectedImage || "/placeholder.svg"}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Upload className="w-8 h-8 text-gray-400" />
                    )}
                  </div>
                  <Input
                    id="photo"
                    name="photo"
                    type="file"
                    accept="image/*"
                    className="max-w-xs"
                    onChange={handleImageChange}
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>
            </div>
            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create Account
            </Button>
          </form>
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <Button
            className="w-full"
            variant="outline"
            type="button"
            onClick={handleGoogleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <FcGoogle className="mr-2 h-4 w-4" />
            )}
            Sign in with Google
          </Button>
        </CardContent>
        <CardFooter className="flex justify-center">
          <div className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <a
              href="#"
              className="text-primary underline-offset-4 transition-colors hover:underline"
            >
              Sign in
            </a>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Register;
