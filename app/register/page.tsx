import AcmeLogo from '@/app/ui/acme-logo';
import RegisterForm from '@/app/ui/register-form';
import { Suspense } from 'react';
 
export default function RegisterPage() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full items-end rounded-lg bg-green-500 p-3">
          <div className="text-white">
            <AcmeLogo />
          </div>
        </div>
        <Suspense>
          <RegisterForm />
        </Suspense>
      </div>
    </main>
  );
}