-- Fyndo reviews table — run this ONCE in Supabase:
-- supabase.com → your project → SQL Editor → paste all of this → Run

create table public.reviews (
  id uuid primary key default gen_random_uuid(),
  spot_id text not null,
  name text not null check (char_length(name) between 1 and 60),
  rating int not null check (rating between 1 and 5),
  text text not null check (char_length(text) between 3 and 1000),
  approved boolean not null default false,
  created_at timestamptz not null default now()
);

-- Row Level Security: visitors can submit reviews and read APPROVED ones.
-- Nobody can edit or delete through the website — only you, from the
-- Supabase dashboard (Table Editor), where you also approve new reviews
-- by ticking the "approved" box.

alter table public.reviews enable row level security;

create policy "Public can read approved reviews"
  on public.reviews for select
  using (approved = true);

create policy "Anyone can submit an unapproved review"
  on public.reviews for insert
  with check (approved = false);
