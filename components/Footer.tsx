// components/Footer.tsx
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">🎉 Events Hub</h3>
            <p className="text-gray-300 text-sm">
              Discover and join amazing events in your community. From conferences to workshops, 
              find your next learning opportunity.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
              Navigation
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-gray-300 hover:text-white transition-colors">
                  Events
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
              Event Types
            </h4>
            <ul className="space-y-2 text-sm">
              <li className="text-gray-300">Conferences</li>
              <li className="text-gray-300">Workshops</li>
              <li className="text-gray-300">Webinars</li>
              <li className="text-gray-300">Meetups</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} Events Hub. Powered by Cosmic CMS.
          </p>
        </div>
      </div>
    </footer>
  );
}