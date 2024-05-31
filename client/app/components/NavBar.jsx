import Link from 'next/link';

const NavBar = () => {
  return (
    <nav className="p-4 bg-gray-800 text-white">
      <ul className="flex space-x-4">
        <li>
          <Link href="/drivers" className="hover:underline">
            Drivers
          </Link>
        </li>
        <li>
          <Link href="/vehicles" className="hover:underline">
            Vehicles
          </Link>
        </li>
        <li>
          <Link href="/transfer" className="hover:underline">
            Transfer Vehicle
          </Link>
        </li>
        <li>
          <Link href="/transfer-history" className="hover:underline">
            Transfer History
          </Link>
          {/* transfer-history */}
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
