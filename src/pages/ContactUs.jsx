import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import axiosInstance from "@/utils/axiosInstance";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setSuccess(false);
    setError("");

    try {
      const response = await axiosInstance.post("/contact-us", formData);
      if (response.status === 201) {
        setSuccess(true);
        setFormData({ email: "", message: "" });
      }
    } catch (err) {
      setError("Failed to send your message. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-2xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Contact Us
          </CardTitle>
          <CardDescription className="text-center">
            We value your feedback and are here to assist you. Feel free to
            reach out!
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Company Information */}
          <div className="mb-8 text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              <strong>Address:</strong> 123 Dummy Street, City, Country
            </p>
            <p className="text-sm text-muted-foreground">
              <strong>Email:</strong> support@dummycompany.com
            </p>
            <p className="text-sm text-muted-foreground">
              <strong>Phone:</strong> +123 456 7890
            </p>
          </div>

          {/* Form */}
          <form onSubmit={onSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium">
                  Email Address
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your.email@example.com"
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="block text-sm font-medium">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Write your message here..."
                  rows={6}
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading ? "Sending..." : "Send Message"}
            </Button>

            {/* Success/Error Messages */}
            {success && (
              <p className="mt-2 text-sm text-green-600">
                Your message has been sent successfully!
              </p>
            )}
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
          </form>
        </CardContent>
        <CardFooter className="text-center">
          <p className="text-sm text-muted-foreground">
            We will get back to you as soon as possible.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
