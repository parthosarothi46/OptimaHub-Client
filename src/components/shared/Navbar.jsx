import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Link } from "react-router";
import { Moon, Sun, Layers, MenuIcon } from "lucide-react";
import { useTheme } from "@/context/ThemeProvider";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/context/AuthProvider";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b">
      <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
        <Link href="#" className="flex items-center gap-2">
          <Layers className="h-6 w-6" />
          <p className="text-lg font-semibold">OptimaHub</p>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          <Link href="#">Home</Link>
          <Link href="#">Dashboard</Link>
          <Link href="#">Contact Us</Link>
          <Link href="#">About Us</Link>
        </nav>
        <div className="flex items-center gap-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Avatar>
                    <AvatarImage src={user?.photoURL} />
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <div className="flex flex-col items-center p-4">
                  <p className="font-medium">{user?.displayName}</p>
                </div>
                <DropdownMenuItem onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden items-center gap-2 text-sm font-medium md:flex">
              <Link to="login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="register">
                <Button variant="outline">Register</Button>
              </Link>
            </div>
          )}

          <Button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            size="icon"
            variant="outline"
          >
            <div
              className={`cursor-pointer transition-transform duration-500 ${
                isDark ? "rotate-180" : "rotate-0"
              }`}
            >
              {isDark ? (
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 transition-all" />
              ) : (
                <Moon className="h-[1.2rem] w-[1.2rem] rotate-0 transition-all" />
              )}
            </div>
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="rounded-md md:hidden"
              >
                <MenuIcon className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="md:hidden">
              <div className="grid gap-4 p-4">
                <Link
                  href="#"
                  className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                >
                  Home
                </Link>
                <Link
                  href="#"
                  className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                >
                  Dashboard
                </Link>
                <Link
                  href="#"
                  className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                >
                  Contact Us
                </Link>
                <Link
                  href="#"
                  className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                >
                  About Us
                </Link>
                <div className="flex flex-col gap-2">
                  {!user && (
                    <>
                      <Button variant="outline" className="w-full">
                        Login
                      </Button>
                      <Button variant="outline" className="w-full">
                        Register
                      </Button>
                    </>
                  )}
                  {user && (
                    <Button
                      onClick={handleLogout}
                      variant="outline"
                      className="w-full"
                    >
                      Logout
                    </Button>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
