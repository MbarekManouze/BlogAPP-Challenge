import Link from 'next/link';

interface NavbarProps {
    isAuthenticated: boolean;
  }
  
  const Navbar: React.FC<NavbarProps> = ({ isAuthenticated }) => {
    return (
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white font-bold text-xl">
              <h2>Blog</h2>
          </div>
          <div className="flex space-x-4">
            {!isAuthenticated && (
              <>
                <Link href="/login" className='text-white'>
                    Login
                </Link>
                <Link href="/signup" className='text-white'>
                    Sign Up
                </Link>
              </>
            )}
            {isAuthenticated && (
              <Link href="/logout">
               Logout
              </Link>
            )}
          </div>
        </div>
      </nav>
    );
  };
  
  export default Navbar;
  