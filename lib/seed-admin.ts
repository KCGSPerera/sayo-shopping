import { createClient } from '@supabase/supabase-js';
import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

const prisma = new PrismaClient();
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const hasServiceKey = supabaseServiceKey && supabaseServiceKey !== 'your-service-role-key';

async function seedAdmin() {
    const adminEmail = 'admin@sayoshopping.com';
    const adminPassword = 'SayoshoppingAdmin2026!'; // Default temporary password

    console.log(`Attempting to seed admin: ${adminEmail}`);

    try {
        // 1. Create/Update user in Supabase Auth
        if (hasServiceKey && supabaseUrl) {
            const supabase = createClient(supabaseUrl, supabaseServiceKey);

            console.log('Checking Supabase Auth...');
            const { data: authData, error: authError } = await supabase.auth.admin.createUser({
                email: adminEmail,
                password: adminPassword,
                email_confirm: true
            });

            if (authError) {
                if (authError.message.includes('already registered') || authError.message.includes('Email address already registered')) {
                    console.log('User already exists in Supabase Auth. Resetting password...');

                    // Find the user to get their ID
                    const { data: users, error: listError } = await supabase.auth.admin.listUsers();
                    const existingUser = users?.users.find(u => u.email === adminEmail);

                    if (existingUser) {
                        const { error: updateError } = await supabase.auth.admin.updateUserById(
                            existingUser.id,
                            { password: adminPassword, email_confirm: true }
                        );

                        if (updateError) {
                            console.error('Error updating password:', updateError.message);
                        } else {
                            console.log('Successfully reset password and confirmed email for existing user.');
                        }
                    } else {
                        console.warn('Could not find existing user to update password in retrieved list.');
                    }
                } else {
                    console.error('Error creating auth user:', authError.message);
                }
            } else {
                console.log('Successfully created user in Supabase Auth.');
            }
        } else {
            console.warn('⚠️ SUPABASE_SERVICE_ROLE_KEY is missing or placeholder. Skipping Auth user creation.');
        }

        // 2. Insert into admins table using Prisma
        await prisma.admin.upsert({
            where: { email: adminEmail },
            update: { role: 'admin' },
            create: {
                email: adminEmail,
                role: 'admin'
            }
        });

        console.log('Successfully added/updated admins table via Prisma.');
    } catch (error) {
        console.error('Seeding failed:', error);
    } finally {
        await prisma.$disconnect();
        console.log('Seeding process complete.');
    }
}

seedAdmin();
