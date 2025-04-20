// Types for Supabase database tables


// This type matches the insert operation (omits auto-generated fields)
export type ContactSubmissionInsert = Omit<ContactSubmission, 'id' | 'created_at'>;
