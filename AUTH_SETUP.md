# Authentication System Setup

This authentication system provides a complete login/register interface for React Native/Expo apps using Supabase.

## Features

- ✅ Cross-platform (iOS, Android, Web)
- ✅ Secure authentication with Supabase
- ✅ User levels: admin, executive, manager, creator
- ✅ Form validation
- ✅ Password reset functionality
- ✅ Responsive UI with Tailwind CSS
- ✅ TypeScript-ready components
- ✅ Production-ready security

## Prerequisites

1. Supabase project with the provided database setup
2. Expo CLI installed
3. React Native development environment

## Database Setup

1. Go to your Supabase project's SQL Editor
2. Run the SQL commands from `supabase-setup.sql`
3. This will create:
   - `profiles` table with user levels
   - Row Level Security policies
   - Automatic profile creation trigger
   - Proper permissions

## Environment Configuration

Make sure your Supabase configuration in `lib/supabase.js` has the correct:
- Project URL
- Anonymous key
- Proper auth settings

## User Levels

The system supports 4 user levels with hierarchy:

1. **Creator** (Level 1) - Basic user with content creation abilities
2. **Manager** (Level 2) - Team management and project oversight  
3. **Executive** (Level 3) - Strategic oversight and decision making
4. **Admin** (Level 4) - Full system administration access

## Component Structure

```
components/
├── Auth.js                 # Main auth container
├── Login.js               # Login form
├── Register.js            # Registration form
├── Dashboard.js           # Post-auth dashboard
├── AuthProvider.js        # Authentication context
└── ui/shared/
    ├── Button.js          # Reusable button component
    ├── Input.js           # Reusable input component
    └── LoadingSpinner.js  # Loading component
```

## Security Features

- Server-side authentication with Supabase
- Row Level Security (RLS) policies
- Secure password requirements
- Email validation
- Session management
- Automatic token refresh

## Usage

The authentication system is automatically integrated into your app. Users will see:

1. **Login Screen** - Email/password with forgot password option
2. **Register Screen** - Email/password/confirm + user level selection
3. **Dashboard** - Simple authenticated user interface

## Password Requirements

- Minimum 6 characters
- At least one lowercase letter
- At least one uppercase letter
- At least one number

## Customization

You can customize:
- Logo (replace the placeholder in Login/Register components)
- Colors (update `tailwind.config.js`)
- User levels (modify `lib/constants.js`)
- Validation rules (update validation functions)

## Error Handling

All authentication errors are properly handled and displayed to users with appropriate error messages.

## Testing

1. Start the Expo development server: `expo start`
2. Test registration with different user levels
3. Test login with created accounts
4. Test password reset functionality
5. Verify proper authentication state management
