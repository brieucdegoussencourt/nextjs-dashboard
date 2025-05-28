import AcmeLogo from '@/app/ui/acme-logo';
import Footer from '@/app/ui/footer';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { lusitana } from '@/app/ui/fonts';
import Image from 'next/image';

export default function Page() {
  return (
    <main className="flex flex-col p-4 gap-y-4 md:gap-y-6 md:p-6">
      <div className="flex shrink-0 items-end rounded-lg bg-green-900 p-6 md:p-12">
        {<AcmeLogo />}
      </div>
      <div className="flex grow flex-col md:flex-row rounded-lg bg-green-100">
        <div className="flex flex-col justify-center gap-6 p-6 md:w-2/5 md:px-12 md:py-12">
          <p
            className={`${lusitana.className} text-xl text-gray-800 md:text-3xl leading-10 md:leading-normal`}
          >
            Welcome to La Finca, a <strong>C</strong>ommunity <strong>S</strong>
            upported <strong>A</strong>gricultural experience.
            <br />
            <a
              href="https://nextjs.org/learn/"
              className="text-green-600 md:text-xl hover:text-green-800"
            >
              <strong className="underline">Learn more about CSA</strong>
            </a>
          </p>
          <Link
            href="/login"
            className="flex items-center gap-5 self-start rounded-lg bg-green-700 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-green-400 md:text-base"
          >
            <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
          <Link
            href="/register"
            className="flex items-center gap-5 self-start rounded-lg bg-green-700 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-green-400 md:text-base"
          >
            <span>Become a member</span>{' '}
            <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
        </div>
        <div className="flex items-center justify-center p-6 md:w-3/5">
          <Image
            src="/welcome.webp"
            width={1000}
            height={760}
            className="rounded-lg"
            alt="Screenshots of the dashboard project showing desktop version"
          />
        </div>
      </div>
      <div className="flex rounded-lg bg-green-900 p-4 md:p-6">
        {<Footer />}
      </div>
    </main>
  );
}
