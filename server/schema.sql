--
-- PostgreSQL database dump
--

-- Dumped from database version 13.0 (Debian 13.0-1.pgdg100+1)
-- Dumped by pg_dump version 13.1 (Ubuntu 13.1-1.pgdg18.04+1)

-- Started on 2020-12-21 17:27:03 UTC

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 4 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


--
-- TOC entry 3199 (class 0 OID 0)
-- Dependencies: 4
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- TOC entry 711 (class 1247 OID 16391)
-- Name: ActorType; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."ActorType" AS ENUM (
    'Tier1',
    'Tier2',
    'Bank',
    'Admin',
    'Anchor'
);


--
-- TOC entry 715 (class 1247 OID 16456)
-- Name: ApprovalStatus; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."ApprovalStatus" AS ENUM (
    'Approved',
    'Rejected',
    'Pending'
);


--
-- TOC entry 842 (class 1247 OID 25109)
-- Name: adjustmentstatus; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.adjustmentstatus AS ENUM (
    'Pending',
    'Done'
);


SET default_table_access_method = heap;

--
-- TOC entry 204 (class 1259 OID 16424)
-- Name: actor; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.actor (
    actorid integer NOT NULL,
    actortype public."ActorType" NOT NULL,
    actorinfo jsonb,
    username character varying(50),
    hash character varying,
    data jsonb,
    salt character varying
);


--
-- TOC entry 206 (class 1259 OID 16438)
-- Name: anchordebitnotes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.anchordebitnotes (
    "AnchorId" integer NOT NULL,
    "Tier1Id" integer NOT NULL,
    "DebitNoteId" character varying(50) NOT NULL,
    "DebitAmount" bigint,
    "DebitNoteDate" timestamp with time zone,
    "InvoiceId" character varying(50) NOT NULL
);


--
-- TOC entry 207 (class 1259 OID 16441)
-- Name: anchorgrn; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.anchorgrn (
    "AnchorId" integer NOT NULL,
    "Tier1Id" integer NOT NULL,
    "GRNId" character varying(50) NOT NULL,
    "InvoiceId" character varying(50) NOT NULL,
    "GRNDate" timestamp with time zone
);


--
-- TOC entry 205 (class 1259 OID 16435)
-- Name: anchorinvoice; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.anchorinvoice (
    "Tier1Id" integer NOT NULL,
    "InvoiceId" character varying(50) NOT NULL,
    "InvoiceDate" timestamp with time zone,
    "InvoiceAmount" bigint,
    "AnchorId" integer NOT NULL,
    "DueDate" date
);


--
-- TOC entry 210 (class 1259 OID 16461)
-- Name: anchortier2invoicemapping; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.anchortier2invoicemapping (
    "AnchorId" integer NOT NULL,
    "Tier1Id" integer NOT NULL,
    "AnchorInvoiceId" character varying(50) NOT NULL,
    "Tier2InvoiceId" character varying(50) NOT NULL,
    "Tier2Id" integer NOT NULL,
    "BankId" integer,
    "BankApprovalStatus" public."ApprovalStatus",
    "DiscountedAmount" bigint,
    "Tier1ReceivableEntry" public.adjustmentstatus,
    "Tier1PayableEntry" public.adjustmentstatus,
    "Tier2Entry" public.adjustmentstatus
);


--
-- TOC entry 203 (class 1259 OID 16422)
-- Name: books_actorid_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.books_actorid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3200 (class 0 OID 0)
-- Dependencies: 203
-- Name: books_actorid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.books_actorid_seq OWNED BY public.actor.actorid;


--
-- TOC entry 246 (class 1259 OID 17121)
-- Name: session; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.session (
    sid character varying NOT NULL,
    sess json NOT NULL,
    expire timestamp(6) without time zone NOT NULL
);


--
-- TOC entry 209 (class 1259 OID 16450)
-- Name: tier1tier2bufferdays; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tier1tier2bufferdays (
    "Tier1Id" integer NOT NULL,
    "Tier2Id" integer NOT NULL,
    "BufferDays" interval NOT NULL
);


--
-- TOC entry 208 (class 1259 OID 16444)
-- Name: tier2invoice; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tier2invoice (
    "Tier2Id" integer NOT NULL,
    "Tier1Id" integer NOT NULL,
    "InvoiceId" character varying(50) NOT NULL,
    "InvoiceAmount" bigint,
    "InvoiceDate" timestamp with time zone,
    "DueDate" timestamp with time zone,
    "GRNId" character varying(50)[],
    "ApprovalStatus" public."ApprovalStatus",
    "ReceivableAmount" bigint,
    "Tier2InvoiceDetails" jsonb,
    "CreationTimestamp" timestamp with time zone,
    " LastUpdateTimestamp" timestamp with time zone
);


--
-- TOC entry 247 (class 1259 OID 17142)
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1;


--
-- TOC entry 248 (class 1259 OID 17144)
-- Name: user; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."user" (
    id integer DEFAULT nextval('public.user_id_seq'::regclass) NOT NULL,
    username character varying(50) NOT NULL,
    hash character varying NOT NULL,
    data jsonb,
    salt character varying NOT NULL
);


--
-- TOC entry 3020 (class 2604 OID 16853)
-- Name: actor actorid; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.actor ALTER COLUMN actorid SET DEFAULT nextval('public.books_actorid_seq'::regclass);


--
-- TOC entry 3025 (class 2606 OID 17051)
-- Name: anchorinvoice AnchorInvoice_AnchorId_InvoiceId_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.anchorinvoice
    ADD CONSTRAINT "AnchorInvoice_AnchorId_InvoiceId_key" UNIQUE ("AnchorId", "InvoiceId");


--
-- TOC entry 3037 (class 2606 OID 16897)
-- Name: tier1tier2bufferdays Tier1Tier2BufferDays_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tier1tier2bufferdays
    ADD CONSTRAINT "Tier1Tier2BufferDays_pkey" PRIMARY KEY ("Tier1Id", "Tier2Id");


--
-- TOC entry 3029 (class 2606 OID 17060)
-- Name: anchordebitnotes anchorDebitNotes_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.anchordebitnotes
    ADD CONSTRAINT "anchorDebitNotes_pk" PRIMARY KEY ("AnchorId", "Tier1Id", "InvoiceId", "DebitNoteId");


--
-- TOC entry 3031 (class 2606 OID 17058)
-- Name: anchorgrn anchorgrn_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.anchorgrn
    ADD CONSTRAINT anchorgrn_pk PRIMARY KEY ("AnchorId", "Tier1Id", "InvoiceId", "GRNId");


--
-- TOC entry 3027 (class 2606 OID 17000)
-- Name: anchorinvoice anchorinvoice_primary; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.anchorinvoice
    ADD CONSTRAINT anchorinvoice_primary PRIMARY KEY ("Tier1Id", "AnchorId", "InvoiceId");


--
-- TOC entry 3023 (class 2606 OID 16855)
-- Name: actor books_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.actor
    ADD CONSTRAINT books_pkey PRIMARY KEY (actorid);


--
-- TOC entry 3039 (class 2606 OID 16938)
-- Name: anchortier2invoicemapping main; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.anchortier2invoicemapping
    ADD CONSTRAINT main PRIMARY KEY ("AnchorId", "Tier1Id", "Tier2Id", "AnchorInvoiceId", "Tier2InvoiceId");


--
-- TOC entry 3042 (class 2606 OID 17128)
-- Name: session session_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.session
    ADD CONSTRAINT session_pkey PRIMARY KEY (sid);


--
-- TOC entry 3033 (class 2606 OID 17049)
-- Name: tier2invoice tier2_unqiue; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tier2invoice
    ADD CONSTRAINT tier2_unqiue UNIQUE ("Tier2Id", "Tier1Id", "InvoiceId");


--
-- TOC entry 3035 (class 2606 OID 17017)
-- Name: tier2invoice tier2invoice_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tier2invoice
    ADD CONSTRAINT tier2invoice_pk PRIMARY KEY ("Tier2Id", "Tier1Id", "InvoiceId");


--
-- TOC entry 3044 (class 2606 OID 17152)
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- TOC entry 3040 (class 1259 OID 17129)
-- Name: IDX_session_expire; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "IDX_session_expire" ON public.session USING btree (expire);


--
-- TOC entry 3045 (class 2606 OID 16915)
-- Name: anchordebitnotes anchorId_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.anchordebitnotes
    ADD CONSTRAINT "anchorId_fk" FOREIGN KEY ("AnchorId") REFERENCES public.actor(actorid) NOT VALID;


--
-- TOC entry 3049 (class 2606 OID 17033)
-- Name: anchortier2invoicemapping anchorId_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.anchortier2invoicemapping
    ADD CONSTRAINT "anchorId_fk" FOREIGN KEY ("AnchorId") REFERENCES public.actor(actorid) NOT VALID;


--
-- TOC entry 3052 (class 2606 OID 17052)
-- Name: anchortier2invoicemapping anchorinvoice_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.anchortier2invoicemapping
    ADD CONSTRAINT anchorinvoice_fk FOREIGN KEY ("AnchorId", "AnchorInvoiceId") REFERENCES public.anchorinvoice("AnchorId", "InvoiceId");


--
-- TOC entry 3046 (class 2606 OID 16920)
-- Name: anchordebitnotes tier1Id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.anchordebitnotes
    ADD CONSTRAINT "tier1Id_fk" FOREIGN KEY ("Tier1Id") REFERENCES public.actor(actorid) NOT VALID;


--
-- TOC entry 3047 (class 2606 OID 16925)
-- Name: tier2invoice tier1Id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tier2invoice
    ADD CONSTRAINT "tier1Id_fk" FOREIGN KEY ("Tier1Id") REFERENCES public.actor(actorid) NOT VALID;


--
-- TOC entry 3050 (class 2606 OID 17038)
-- Name: anchortier2invoicemapping tier1Id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.anchortier2invoicemapping
    ADD CONSTRAINT "tier1Id_fk" FOREIGN KEY ("Tier1Id") REFERENCES public.actor(actorid) NOT VALID;


--
-- TOC entry 3048 (class 2606 OID 16932)
-- Name: tier2invoice tier2Id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tier2invoice
    ADD CONSTRAINT "tier2Id_fk" FOREIGN KEY ("Tier2Id") REFERENCES public.actor(actorid) NOT VALID;


--
-- TOC entry 3051 (class 2606 OID 17043)
-- Name: anchortier2invoicemapping tier2Id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.anchortier2invoicemapping
    ADD CONSTRAINT "tier2Id_fk" FOREIGN KEY ("Tier2Id") REFERENCES public.actor(actorid) NOT VALID;


-- Completed on 2020-12-21 17:27:08 UTC

--
-- PostgreSQL database dump complete
--

