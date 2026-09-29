-- GigFlow PostgreSQL schema
create extension if not exists pgcrypto;
create extension if not exists citext;

create type user_role as enum ('buyer','seller','moderator','admin');
create type gig_status as enum ('draft','published','paused','archived');
create type order_status as enum ('pending','accepted','in_progress','delivered','revision','completed','cancelled','disputed');
create type payment_status as enum ('created','authorized','captured','failed','refunded');

create table users (id uuid primary key default gen_random_uuid(), email citext not null unique, password_hash text not null, display_name varchar(80) not null, role user_role not null default 'buyer', bio text not null default '', avatar_url text, country varchar(2), timezone text not null default 'Africa/Lagos', email_verified_at timestamptz, created_at timestamptz not null default now(), updated_at timestamptz not null default now());
create table categories (id uuid primary key default gen_random_uuid(), parent_id uuid references categories(id), name varchar(80) not null, slug varchar(100) not null unique, description text not null default '', position integer not null default 0, is_active boolean not null default true);
create table gigs (id uuid primary key default gen_random_uuid(), seller_id uuid not null references users(id), category_id uuid not null references categories(id), title varchar(120) not null, slug varchar(150) not null unique, summary varchar(280) not null, description text not null, status gig_status not null default 'draft', base_price numeric(14,2) not null check(base_price>0), delivery_days integer not null check(delivery_days between 1 and 90), revision_count integer not null default 1 check(revision_count between 0 and 20), rating numeric(3,2) not null default 0, review_count integer not null default 0, created_at timestamptz not null default now(), updated_at timestamptz not null default now());
create table gig_packages (id uuid primary key default gen_random_uuid(), gig_id uuid not null references gigs(id) on delete cascade, name varchar(40) not null, description varchar(300) not null, price numeric(14,2) not null check(price>0), delivery_days integer not null check(delivery_days>0), revisions integer not null default 1, unique(gig_id,name));
create table orders (id uuid primary key default gen_random_uuid(), gig_id uuid not null references gigs(id), buyer_id uuid not null references users(id), seller_id uuid not null references users(id), status order_status not null default 'pending', subtotal numeric(14,2) not null, platform_fee numeric(14,2) not null, total numeric(14,2) not null, due_at timestamptz not null, completed_at timestamptz, revision_count integer not null default 0, created_at timestamptz not null default now(), updated_at timestamptz not null default now());
create table order_requirements (id uuid primary key default gen_random_uuid(), order_id uuid not null references orders(id) on delete cascade, prompt text not null, answer text not null default '', required boolean not null default true);
create table deliveries (id uuid primary key default gen_random_uuid(), order_id uuid not null references orders(id) on delete cascade, kind varchar(20) not null, message text not null default '', url text, file_id uuid, created_at timestamptz not null default now());
create table payments (id uuid primary key default gen_random_uuid(), order_id uuid not null references orders(id), buyer_id uuid not null references users(id), provider varchar(30) not null, provider_reference varchar(120) not null unique, status payment_status not null default 'created', amount numeric(14,2) not null, currency char(3) not null, authorized_at timestamptz, captured_at timestamptz, created_at timestamptz not null default now());
create table ledger_entries (id uuid primary key default gen_random_uuid(), user_id uuid not null references users(id), order_id uuid references orders(id), type varchar(30) not null, amount numeric(14,2) not null, currency char(3) not null, reference varchar(120) not null unique, created_at timestamptz not null default now());
create table conversations (id uuid primary key default gen_random_uuid(), created_at timestamptz not null default now(), updated_at timestamptz not null default now());
create table conversation_members (conversation_id uuid references conversations(id) on delete cascade, user_id uuid references users(id) on delete cascade, joined_at timestamptz not null default now(), primary key(conversation_id,user_id));
create table messages (id uuid primary key default gen_random_uuid(), conversation_id uuid not null references conversations(id) on delete cascade, sender_id uuid not null references users(id), body text not null check(length(body) between 1 and 5000), edited_at timestamptz, created_at timestamptz not null default now());
create table reviews (id uuid primary key default gen_random_uuid(), order_id uuid not null unique references orders(id), author_id uuid not null references users(id), target_id uuid not null references users(id), rating integer not null check(rating between 1 and 5), title varchar(100) not null default '', body text not null, created_at timestamptz not null default now(), updated_at timestamptz not null default now());
create table disputes (id uuid primary key default gen_random_uuid(), order_id uuid not null unique references orders(id), opened_by uuid not null references users(id), reason varchar(60) not null, summary text not null, status varchar(20) not null default 'open', decision text, opened_at timestamptz not null default now(), resolved_at timestamptz);
create table files (id uuid primary key default gen_random_uuid(), owner_id uuid not null references users(id), order_id uuid references orders(id), name varchar(255) not null, mime_type varchar(120) not null, size_bytes bigint not null check(size_bytes>0), storage_key text not null unique, scan_status varchar(20) not null default 'pending', created_at timestamptz not null default now());
create table notifications (id uuid primary key default gen_random_uuid(), user_id uuid not null references users(id) on delete cascade, kind varchar(40) not null, title varchar(120) not null, body varchar(500) not null, read_at timestamptz, metadata jsonb not null default '{}', created_at timestamptz not null default now());
create table favorites (user_id uuid not null references users(id) on delete cascade, gig_id uuid not null references gigs(id) on delete cascade, created_at timestamptz not null default now(), primary key(user_id,gig_id));
create table coupons (id uuid primary key default gen_random_uuid(), code citext not null unique, kind varchar(10) not null, value numeric(14,2) not null, min_spend numeric(14,2) not null default 0, max_discount numeric(14,2), starts_at timestamptz not null, ends_at timestamptz not null, usage_limit integer, used_count integer not null default 0);
create table coupon_redemptions (coupon_id uuid references coupons(id), user_id uuid references users(id), order_id uuid references orders(id), created_at timestamptz not null default now(), primary key(coupon_id,user_id));
create table audit_log (id uuid primary key default gen_random_uuid(), actor_id uuid references users(id), action varchar(80) not null, target_type varchar(40) not null, target_id uuid, reason text, metadata jsonb not null default '{}', created_at timestamptz not null default now());

create index gigs_search_idx on gigs using gin(to_tsvector('simple',title||' '||summary||' '||description));
create index gigs_seller_idx on gigs(seller_id,status,updated_at desc);
create index orders_buyer_idx on orders(buyer_id,created_at desc);
create index orders_seller_idx on orders(seller_id,status,created_at desc);
create index messages_conversation_idx on messages(conversation_id,created_at desc);
create index notifications_user_idx on notifications(user_id,read_at,created_at desc);
create index ledger_user_idx on ledger_entries(user_id,created_at desc);

create or replace function touch_updated_at() returns trigger language plpgsql as $$ begin new.updated_at=now(); return new; end $$;
create trigger users_touch before update on users for each row execute function touch_updated_at();
create trigger gigs_touch before update on gigs for each row execute function touch_updated_at();
create trigger orders_touch before update on orders for each row execute function touch_updated_at();
create trigger reviews_touch before update on reviews for each row execute function touch_updated_at();

create view seller_summary as select u.id,u.display_name,count(g.id) filter(where g.status='published') published_gigs,coalesce(avg(g.rating),0) average_rating,coalesce(sum(o.total) filter(where o.status='completed'),0) gross_sales from users u left join gigs g on g.seller_id=u.id left join orders o on o.seller_id=u.id group by u.id,u.display_name;
create view buyer_summary as select u.id,u.display_name,count(o.id) orders_count,coalesce(sum(o.total) filter(where o.status='completed'),0) completed_spend from users u left join orders o on o.buyer_id=u.id group by u.id,u.display_name;
