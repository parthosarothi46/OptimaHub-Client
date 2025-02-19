// import { useState } from "react";
// import { Moon, Sun, Layers, Menu } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Sheet, SheetContent } from "@/components/ui/sheet";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { useAuth } from "@/context/AuthProvider";
// import { Link } from "react-router";
// import { useTheme } from "@/context/ThemeProvider";

// const navItems = [
//   { href: "/", label: "Home" },
//   { href: "/dashboard", label: "Dashboard" },
//   { href: "/contact", label: "Contact Us" },
//   { href: "/about", label: "About Us" },
//   { href: "/profile", label: "My Profile" },
// ];

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const { theme, setTheme } = useTheme();
//   const { user, logout } = useAuth();

//   const handleLogout = async () => {
//     await logout();
//     setIsOpen(false);
//   };

//   return (
//     <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
//       <div className="container mx-auto p-3 flex h-14 items-center justify-between">
//         {/* Logo and Website Name */}
//         <div className="flex items-center space-x-2">
//           <Link to="/" className="flex items-center space-x-2">
//             <Layers className="h-6 w-6" />
//             <span className="font-bold">OptimaHub</span>
//           </Link>
//         </div>

//         {/* Desktop Navigation */}
//         <div className="hidden md:flex items-center space-x-6">
//           <nav className="flex items-center space-x-6 text-sm font-medium">
//             {navItems.map((item) => (
//               <Link
//                 key={item.href}
//                 to={item.href}
//                 className="transition-colors hover:text-foreground/80 text-foreground/60"
//               >
//                 {item.label}
//               </Link>
//             ))}
//           </nav>
//         </div>

//         {/* Theme Toggle and User Menu */}
//         <div className="flex items-center space-x-2">
//           <Button
//             variant="ghost"
//             size="icon"
//             onClick={() => setTheme(theme === "light" ? "dark" : "light")}
//           >
//             <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
//             <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
//             <span className="sr-only">Toggle theme</span>
//           </Button>
//           {user ? (
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button
//                   variant="ghost"
//                   className="relative h-8 w-8 rounded-full"
//                 >
//                   <Avatar className="h-8 w-8">
//                     <AvatarImage
//                       src={user.photoURL || ""}
//                       alt={user.displayName || ""}
//                     />
//                     <AvatarFallback>
//                       {user.displayName?.charAt(0) || "U"}
//                     </AvatarFallback>
//                   </Avatar>
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent className="w-56" align="end" forceMount>
//                 <DropdownMenuLabel className="font-normal">
//                   <div className="flex flex-col space-y-1">
//                     <p className="text-sm font-medium leading-none">
//                       {user.displayName}
//                     </p>
//                     <p className="text-xs leading-none text-muted-foreground">
//                       {user.email}
//                     </p>
//                   </div>
//                 </DropdownMenuLabel>
//                 <DropdownMenuSeparator />
//                 <DropdownMenuItem onClick={handleLogout}>
//                   Log out
//                 </DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>
//           ) : (
//             <div className="hidden space-x-2 md:flex">
//               <Button variant="outline" asChild>
//                 <Link to="/login">Login</Link>
//               </Button>
//               <Button asChild>
//                 <Link to="/register">Register</Link>
//               </Button>
//             </div>
//           )}
//           {/* Mobile Menu Button */}
//           <Button
//             variant="ghost"
//             className="px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
//             onClick={() => setIsOpen(true)}
//           >
//             <Menu className="h-6 w-6" />
//             <span className="sr-only">Toggle Menu</span>
//           </Button>
//         </div>
//       </div>

//       {/* Mobile Sidebar Menu */}
//       <Sheet open={isOpen} onOpenChange={setIsOpen}>
//         <SheetContent side="bottom">
//           <div className="my-4 h-[calc(100vh-8rem)] pb-10">
//             <div className="flex flex-col space-y-3">
//               {navItems.map((item) => (
//                 <Link
//                   key={item.href}
//                   to={item.href}
//                   className="text-muted-foreground hover:text-foreground"
//                   onClick={() => setIsOpen(false)}
//                 >
//                   {item.label}
//                 </Link>
//               ))}
//             </div>
//             {!user && (
//               <div className="mt-4 flex flex-col space-y-2">
//                 <Button
//                   asChild
//                   variant="outline"
//                   onClick={() => setIsOpen(false)}
//                 >
//                   <Link to="/login">Login</Link>
//                 </Button>
//                 <Button asChild onClick={() => setIsOpen(false)}>
//                   <Link to="/register">Register</Link>
//                 </Button>
//               </div>
//             )}
//             {user && (
//               <Button className="mt-4" variant="outline" onClick={handleLogout}>
//                 Log out
//               </Button>
//             )}
//           </div>
//         </SheetContent>
//       </Sheet>
//     </header>
//   );
// };

// export default Navbar;

import { useState } from "react";
import { Moon, Sun, Layers, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/context/AuthProvider";
import { Link } from "react-router";
import { useTheme } from "@/context/ThemeProvider";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/contact", label: "Contact Us" },
  { href: "/about", label: "About Us" },
  { href: "/profile", label: "My Profile" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto p-3 flex h-14 items-center justify-between">
        {/* Logo and Website Name */}
        <div className="flex items-center space-x-2">
          <Link to="/" className="flex items-center space-x-2">
            <Layers className="h-6 w-6" />
            <span className="font-bold">OptimaHub</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navItems
              .filter(
                (item) =>
                  user || ["/", "/contact", "/about"].includes(item.href)
              )
              .map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="transition-colors hover:text-foreground/80 text-foreground/60"
                >
                  {item.label}
                </Link>
              ))}
          </nav>
        </div>

        {/* Theme Toggle and User Menu */}
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={user.photoURL || ""}
                      alt={user.displayName || ""}
                    />
                    <AvatarFallback>
                      {user.displayName?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user.displayName}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden space-x-2 md:flex">
              <Button variant="outline" asChild>
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link to="/register">Register</Link>
              </Button>
            </div>
          )}
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            className="px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
            onClick={() => setIsOpen(true)}
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile Sidebar Menu */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side="bottom">
          <div className="my-4 h-[calc(100vh-8rem)] pb-10">
            <div className="flex flex-col space-y-3">
              {navItems
                .filter(
                  (item) =>
                    user || ["/", "/contact", "/about"].includes(item.href)
                )
                .map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className="text-muted-foreground hover:text-foreground"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
            </div>
            {!user && (
              <div className="mt-4 flex flex-col space-y-2">
                <Button
                  asChild
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                >
                  <Link to="/login">Login</Link>
                </Button>
                <Button asChild onClick={() => setIsOpen(false)}>
                  <Link to="/register">Register</Link>
                </Button>
              </div>
            )}
            {user && (
              <Button className="mt-4" variant="outline" onClick={handleLogout}>
                Log out
              </Button>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default Navbar;
