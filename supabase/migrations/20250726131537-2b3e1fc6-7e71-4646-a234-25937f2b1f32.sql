-- Add mode preference to profiles table
ALTER TABLE public.profiles 
ADD COLUMN preferred_mode TEXT DEFAULT 'business' CHECK (preferred_mode IN ('business', 'personal'));