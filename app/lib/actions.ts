// This file contains server actions for user registration and invoice management.

'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import postgres from 'postgres';
import { redirect } from 'next/navigation';
import bcrypt from 'bcryptjs';


const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

// REGISTER USER

// 1. Define a schema for the signup fields
const RegisterSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  address: z.string().min(1),
  phone: z.string().min(1),
  adults: z.coerce.number().min(1).max(10),
  children: z.coerce.number().min(1).max(10),
  email: z.string().email(),
  password: z.string().min(6),
});

// 2. Implement the registerUser server action
export async function registerUser(_state: unknown, formData: FormData) {
  // Parse formData using the schema
  const {
    firstName,
    lastName,
    address,
    phone,
    adults,
    children,
    email,
    password,
  } = RegisterSchema.parse({
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    address: formData.get('address'),
    phone: formData.get('phone'),
    adults: formData.get('adults'),
    children: formData.get('children'),
    email: formData.get('email'),
    password: formData.get('password'),
  });

  // Check if a user with this email already exists
  const existingUser = await sql`
    SELECT id FROM users WHERE email = ${email} LIMIT 1
  `;
  if (existingUser.count) {
    throw new Error('A user with this email already exists.');
  }

  // Hash the password before storing
  const hashedPassword = await bcrypt.hash(password, 10);

  // 3. Insert a new user record
  try {
    await sql`
      INSERT INTO users (
        first_name,
        last_name,
        address,
        phone,
        number_of_adults,
        number_of_children,
        email,
        password
      ) VALUES (
        ${firstName},
        ${lastName},
        ${address},
        ${phone},
        ${adults},
        ${children},
        ${email},
        ${hashedPassword}
      )
    `;
  } catch (error) {
    console.error('Failed to register new user:', error);
    throw new Error('Failed to register user.');
  }

  // Optionally revalidate a specific path and redirect
  revalidatePath('/login');
  redirect('/login');
}
export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

// INVOICES
// Define the schema for the invoice form using zod

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(),
  status: z.enum(['pending', 'paid']),
  date: z.string(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });
const UpdateInvoice = FormSchema.omit({ id: true, date: true });

export async function createInvoice(formData: FormData) {
    const { customerId, amount, status } = CreateInvoice.parse({
      customerId: formData.get('customerId'),
      amount: formData.get('amount'),
      status: formData.get('status'),
    });
   
    const amountInCents = amount * 100;
    const date = new Date().toISOString().split('T')[0];
   
    try {
      await sql`
        INSERT INTO invoices (customer_id, amount, status, date)
        VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
      `;
    } catch (error) {
      // We'll log the error to the console for now
      console.error(error);
    }
   
    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
  }

  export async function updateInvoice(id: string, formData: FormData) {
    const { customerId, amount, status } = UpdateInvoice.parse({
      customerId: formData.get('customerId'),
      amount: formData.get('amount'),
      status: formData.get('status'),
    });
   
    const amountInCents = amount * 100;
   
    try {
      await sql`
          UPDATE invoices
          SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
          WHERE id = ${id}
        `;
    } catch (error) {
      // We'll log the error to the console for now
      console.error(error);
    }
   
    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
  }

  export async function deleteInvoice(id: string) {

    await sql`DELETE FROM invoices WHERE id = ${id}`;
    revalidatePath('/dashboard/invoices');
  }