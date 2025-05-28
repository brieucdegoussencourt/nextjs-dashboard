'use client';

import { lusitana } from '@/app/ui/fonts';
import {
  UserIcon,
  MapPinIcon,
  PhoneIcon,
  UsersIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from '@/app/ui/button';
import { useActionState } from 'react';
import { registerUser } from '@/app/lib/actions';
import { useSearchParams } from 'next/navigation';

export default function RegisterForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';

  const [errorMessage, formAction, isPending] = useActionState(
    registerUser,
    undefined,
  );

  return (
    <form action={formAction} className="space-y-3">
      <div className="flex-1 rounded-lg bg-green-50 px-6 pb-4 pt-8">
        <h1 className={`${lusitana.className} mb-3 text-2xl`}>
          Create an account
        </h1>

        {/* First Name */}
        <label
          className="mb-3 mt-5 block text-xs font-medium text-green-900"
          htmlFor="firstName"
        >
          First Name
        </label>
        <div className="relative">
          <input
            className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm placeholder:text-gray-500 outline-2"
            id="firstName"
            name="firstName"
            type="text"
            placeholder="Enter your first name"
            required
          />
          <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
        </div>

        {/* Last Name */}
        <label
          className="mb-3 mt-5 block text-xs font-medium text-green-900"
          htmlFor="lastName"
        >
          Last Name
        </label>
        <div className="relative">
          <input
            className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm placeholder:text-gray-500 outline-2"
            id="lastName"
            name="lastName"
            type="text"
            placeholder="Enter your last name"
            required
          />
          <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
        </div>

        {/* Address */}
        <label
          className="mb-3 mt-5 block text-xs font-medium text-green-900"
          htmlFor="address"
        >
          Address
        </label>
        <div className="relative">
          <input
            className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm placeholder:text-gray-500 outline-2"
            id="address"
            name="address"
            type="text"
            placeholder="Enter your address"
            required
          />
          <MapPinIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
        </div>

        {/* Phone */}
        <label
          className="mb-3 mt-5 block text-xs font-medium text-green-900"
          htmlFor="phone"
        >
          Phone
        </label>
        <div className="relative">
          <input
            className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm placeholder:text-gray-500 outline-2"
            id="phone"
            name="phone"
            type="tel"
            placeholder="Enter your phone number"
            required
          />
          <PhoneIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
        </div>

        {/* Number of Adults */}
        <label
          className="mb-3 mt-5 block text-xs font-medium text-green-900"
          htmlFor="adults"
        >
          Number of Adults
        </label>
        <div className="relative">
          <select
            className="block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2"
            id="adults"
            name="adults"
            required
          >
            {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
          <UsersIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
        </div>

        {/* Number of Children */}
        <label
          className="mb-3 mt-5 block text-xs font-medium text-green-900"
          htmlFor="children"
        >
          Number of Children
        </label>
        <div className="relative">
          <select
            className="block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2"
            id="children"
            name="children"
            required
          >
            {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
          <UsersIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
        </div>

        <input type="hidden" name="redirectTo" value={callbackUrl} />

        {/* Email */}
        <label
          className="mb-3 mt-5 block text-xs font-medium text-green-900"
          htmlFor="email"
        >
          Email
        </label>
        <div className="relative">
          <input
            className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm placeholder:text-gray-500 outline-2"
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            required
          />
          <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
        </div>

        {/* Password */}
        <label
          className="mb-3 mt-5 block text-xs font-medium text-green-900"
          htmlFor="password"
        >
          Password
        </label>
        <div className="relative">
          <input
            className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm placeholder:text-gray-500 outline-2"
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            required
          />
          <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
        </div>

        {/* Confirm Password */}
        <label
          className="mb-3 mt-5 block text-xs font-medium text-green-900"
          htmlFor="confirmPassword"
        >
          Confirm Password
        </label>
        <div className="relative">
          <input
            className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm placeholder:text-gray-500 outline-2"
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Re-enter your password"
            required
          />
          <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
        </div>

        <Button className="mt-4 w-full" aria-disabled={isPending}>
          Sign up <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
        </Button>

        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {errorMessage ? (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{errorMessage}</p>
            </>
          ) : null}
        </div>
      </div>
    </form>
  );
}