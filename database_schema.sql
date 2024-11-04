create database kitten_adoption
    with owner postgres;

create table public.kittens
(
    id          serial
        primary key,
    name        varchar(255)          not null,
    age         integer,
    breed       varchar(255),
    description text,
    photo       varchar(255),
    adopted     boolean default false not null
);

alter table public.kittens
    owner to postgres;

create table public.adoption_requests
(
    id               serial
        primary key,
    kitten_id        integer                                          not null
        references public.kittens
        constraint fk_kitten_id
            references public.kittens,
    applicant_name   varchar(255)                                     not null,
    phone            varchar(20),
    email            varchar(255),
    message          text,
    status           varchar(20) default 'pending'::character varying not null,
    social_media_url varchar(255)
);

alter table public.adoption_requests
    owner to postgres;

create table public.admins
(
    id       serial
        primary key,
    username varchar(255) not null
        unique,
    password varchar(255) not null
);

alter table public.admins
    owner to postgres;

