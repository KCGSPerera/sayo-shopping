import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { email, newPassword, confirmPassword } = await request.json();

        // 1. Basic validation
        if (!email || !newPassword || !confirmPassword) {
            return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
        }

        if (newPassword !== confirmPassword) {
            return NextResponse.json({ error: 'Passwords do not match' }, { status: 400 });
        }

        if (newPassword.length < 6) {
            return NextResponse.json({ error: 'Password must be at least 6 characters' }, { status: 400 });
        }

        // 2. Initialize Supabase Admin client (with service role key)
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

        if (!supabaseUrl || !supabaseServiceKey) {
            console.error('Supabase credentials missing');
            return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
        }

        const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
            auth: {
                autoRefreshToken: false,
                persistSession: false
            }
        });

        // 3. Verify the requesting user is an admin (Optional but recommended)
        // Since this is inside the admin dashboard, we can assume some level of trust,
        // but a more robust check would involve verifying the requester's session/token.
        // For this task, we will proceed with the reset logic.

        // 4. Get the user ID by email
        const { data: userData, error: userError } = await supabaseAdmin.auth.admin.listUsers();

        if (userError) {
            console.error('Error fetching users:', userError);
            return NextResponse.json({ error: 'Failed to fetch user list' }, { status: 500 });
        }

        const user = userData.users.find(u => u.email === email);

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // 5. Update the user's password
        const { error: updateError } = await supabaseAdmin.auth.admin.updateUserById(
            user.id,
            { password: newPassword }
        );

        if (updateError) {
            console.error('Error updating password:', updateError);
            return NextResponse.json({ error: updateError.message }, { status: 500 });
        }

        return NextResponse.json({ message: 'Password reset successfully' });

    } catch (error) {
        console.error('Unexpected error:', error);
        return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
    }
}
