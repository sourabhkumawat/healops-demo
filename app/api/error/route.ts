import { NextResponse } from 'next/server';

export async function GET() {
    // Realistic error: Null reference error - common developer mistake
    // Simulating a scenario where user data is expected but not properly checked
    const userId = null; // Simulating missing user ID from request
    const user = getUserById(userId); // Returns null/undefined

    // Realistic mistake: Developer assumes user exists and tries to access nested property
    // This will throw: TypeError: Cannot read property 'profile' of null
    return NextResponse.json({
        success: true,
        user: user.profile.name
    });
}

// Helper function that simulates a common pattern
function getUserById(id: string | null) {
    if (!id) {
        // Developer forgot to handle null case properly
        return null;
    }

    // Simulating database lookup that returns null
    const users: Record<string, any> = {};
    return users[id]; // Returns undefined if not found
}
