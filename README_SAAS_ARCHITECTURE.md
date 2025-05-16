# SaaS Chatbot Widget: Client Key & User Management Architecture

This document outlines the architecture for managing clients (users/customers) and controlling access to the SaaS Chatbot Widget using Client Keys.

## Table of Contents

1.  [Overview](#overview)
2.  [The Client Key](#the-client-key)
    - [Purpose](#purpose)
    - [Characteristics](#characteristics)
3.  [System Components](#system-components)
    - [A. User Database](#a-user-database)
    - [B. Client Key Generation](#b-client-key-generation)
    - [C. Customer Dashboard (SaaS Frontend)](#c-customer-dashboard-saas-frontend)
    - [D. Backend API (Validation & Configuration)](#d-backend-api-validation--configuration)
    - [E. Subscription & Payment Management](#e-subscription--payment-management)
    - [F. Chatbot Widget (Client-Side)](#f-chatbot-widget-client-side)
4.  [Workflow Examples](#workflow-examples)
    - [New User Signup (Free Plan)](#new-user-signup-free-plan)
    - [Widget Initialization on Customer's Site](#widget-initialization-on-customers-site)
    - [User Upgrades to Paid Plan](#user-upgrades-to-paid-plan)
    - [Subscription Becomes Inactive](#subscription-becomes-inactive)
5.  [Technology Stack Considerations](#technology-stack-considerations)
6.  [Security Notes](#security-notes)
7.  [Configurable Rule-Based Conversation Flow Management (Non-AI)](#configurable-rule-based-conversation-flow-management-non-ai)

## 1. Overview

To provide the chatbot as a SaaS product, we need a robust system to:

- Uniquely identify each customer.
- Authorize widget usage based on their subscription status (free, paid, trial, etc.).
- Potentially deliver customer-specific configurations or features.

This is achieved primarily through the use of a **Client Key** that each customer embeds with the widget script on their website.

## 2. The Client Key

### Purpose

The Client Key serves multiple functions:

- **Identification:** Allows our backend to identify which customer is making a request via the widget.
- **Authorization:** Our backend validates the key to confirm the customer's subscription status and right to use the widget.
- **Configuration:** Enables the backend to serve customer-specific settings or feature flags to the widget.
- **Usage Tracking (Optional):** Can be used to log widget interactions per client for analytics or metered billing.

### Characteristics

- **Unique:** Each customer (or distinct website deployment) receives a unique Client Key.
- **String Format:** Typically a long, cryptographically secure random string.
  - Example: `widget_live_xxxxRandomStringxxxx`
- **Publicly Visible (by Design):** The key is included in the embed script on the customer's website. Its security relies on backend validation, not on the key itself being a secret.

## 3. System Components

The overall system comprises the following interconnected components:

### A. User Database

A central database to store customer information.

- **Key Fields:**
  - `user_id` (PK)
  - `email` (for login, communication)
  - `hashed_password` (for dashboard login)
  - `client_key` (the unique widget identifier for this user)
  - `subscription_plan_id` (e.g., "free_tier", "pro_monthly")
  - `subscription_status` (e.g., "active", "trialing", "past_due", "canceled")
  - `subscription_current_period_end` (for recurring subscriptions)
  - `feature_flags` (JSON or relational table for plan-specific features)
  - `created_at`, `updated_at`
- **Technology Examples:** PostgreSQL, MySQL, MongoDB, FaunaDB, Supabase, AWS DynamoDB, Google Cloud Firestore.

### B. Client Key Generation

A secure process for creating unique Client Keys.

- **Trigger:** Typically occurs upon new user registration.
- **Method:** Generate a sufficiently long and random string. Ensure uniqueness within the database.
- **Storage:** The generated key is stored in the User Database associated with the new user.

### C. Customer Dashboard (SaaS Frontend)

The web application where your customers manage their accounts.

- **Functionality:**
  - User registration and login.
  - Display of their unique Client Key and widget embedding instructions.
  - Subscription plan selection and management.
  - Billing information management (integrated with a payment gateway).
  - (Optional) Widget customization settings that are saved to the User Database.
  - (Optional) Usage analytics.
- **Technology Examples:** React, Vue, Angular, Next.js, or any web framework.

### D. Backend API (Validation & Configuration)

A secure API endpoint that the Chatbot Widget calls upon initialization.

- **Endpoint Example:** `POST /api/v1/widget/validate` or `GET /api/v1/widget/config`
- **Request Payload (from widget):**
  ```json
  {
    "clientKey": "CUSTOMER_PROVIDED_CLIENT_KEY"
  }
  ```
- **Backend Logic:**
  1.  Receive the `clientKey`.
  2.  Look up the key in the User Database.
  3.  **If key found:**
      - Verify `subscription_status` (e.g., is it "active"?).
      - If valid: Respond with a success status (e.g., HTTP 200) and potentially a configuration object for the widget (e.g., enabled features, theming information based on their plan).
      - If invalid (e.g., subscription expired): Respond with an error status (e.g., HTTP 401/403) or a specific payload indicating the widget should not load or should display a message.
  4.  **If key not found:** Respond with an error status (e.g., HTTP 401/404).
- **CORS:** Must be configured to allow requests from the domains where the widget will be embedded.
- **Technology Examples:** Node.js (Express/Fastify), Python (Flask/Django), Ruby on Rails, Go, or serverless functions (AWS Lambda, Google Cloud Functions, Vercel/Netlify Functions).

### E. Subscription & Payment Management

Handles the financial aspects of the SaaS.

- **Payment Gateway Integration:** Use a third-party service like Stripe, PayPal, Paddle, Braintree.
  - Handles secure payment processing, PCI compliance.
  - Manages recurring billing and subscription plans.
- **Webhooks:** The payment gateway sends webhooks (HTTP callbacks) to your Backend API upon events like:
  - `checkout.session.completed`
  - `invoice.payment_succeeded`
  - `invoice.payment_failed`
  - `customer.subscription.updated`
  - `customer.subscription.deleted`
- **Your Backend's Role:**
  - Securely receive and verify webhooks.
  - Update the `subscription_plan_id`, `subscription_status`, `subscription_current_period_end`, etc., in your User Database based on webhook data.

### F. Chatbot Widget (Client-Side)

The JavaScript and CSS code deployed via Vercel/Netlify (as per previous discussions).

- **Initialization:** When embedded on a customer's site, it calls the Backend API (Component D) with its configured `clientKey`.
- **Rendering:** Based on the API response:
  - If valid: Renders the full chatbot UI, potentially applying configurations received from the API.
  - If invalid: Renders nothing, or displays an error/disabled message.

## 4. Workflow Examples

### New User Signup (Free Plan)

1.  User registers on the Customer Dashboard (SaaS Frontend).
2.  SaaS Frontend calls a registration API on your main backend.
3.  Main backend:
    - Validates user input.
    - Creates a new record in the User Database.
    - Generates a unique Client Key.
    - Sets `subscription_plan_id` to "free_tier" and `subscription_status` to "active".
    - Stores the Client Key with the user record.
4.  Customer Dashboard displays the new Client Key and embed instructions to the user.

### Widget Initialization on Customer's Site

1.  A visitor loads the customer's webpage containing the widget embed script.
2.  The widget's JavaScript (`chatbot-widget.umd.js`) executes.
3.  The widget's `init()` function (from `widget-loader.tsx`) makes an API call to your Backend API's validation endpoint, sending the `clientKey`.
4.  Backend API:
    - Looks up the `clientKey` in the User Database.
    - Confirms `subscription_status` is "active".
    - Responds with `{ "valid": true, "config": { /* free tier settings */ } }`.
5.  Widget JavaScript receives the success response and renders the chatbot.

### User Upgrades to Paid Plan

1.  User selects a paid plan on the Customer Dashboard.
2.  Customer Dashboard initiates a checkout process with the Payment Gateway (e.g., Stripe Checkout).
3.  User completes payment.
4.  Payment Gateway sends a webhook (e.g., `invoice.payment_succeeded`) to your Backend API.
5.  Backend API webhook handler:
    - Verifies the webhook.
    - Updates the user's record in the User Database: `subscription_plan_id` = "paid_tier_id", `subscription_status` = "active", updates `subscription_current_period_end`.
6.  Next time the widget on their site initializes, it will receive configurations appropriate for the paid plan.

### Subscription Becomes Inactive

1.  User cancels their subscription, or a recurring payment fails.
2.  Payment Gateway sends a webhook (e.g., `customer.subscription.deleted` or `invoice.payment_failed` after retries).
3.  Backend API webhook handler:
    - Verifies the webhook.
    - Updates the user's record in the User Database: `subscription_status` = "canceled" or "past_due".
4.  Next time the widget on their site initializes, the Backend API validation will fail (or return a status indicating restricted access), and the widget will not load fully or will display an appropriate message.

## 5. Technology Stack Considerations

- **Frontend Widget:** React (as currently built), bundled with Vite.
- **Widget Asset Hosting:** Vercel, Netlify, AWS S3+CloudFront, Google Cloud Storage+CDN.
- **Customer Dashboard:** Any modern web framework (React/Next.js, Vue/Nuxt, etc.).
- **Backend API & Main Backend Logic:**
  - Serverless: AWS Lambda, Google Cloud Functions, Vercel/Netlify Functions (Node.js, Python, Go).
  - Traditional Server: Node.js (Express), Python (Django/Flask), Ruby on Rails.
- **User Database:** PostgreSQL, MySQL, MongoDB, FaunaDB, Supabase, DynamoDB, Firestore.
- **Payment Gateway:** Stripe (highly recommended for SaaS), PayPal, Paddle.

## 6. Security Notes

- **Client Key is an Identifier, Not a Secret:** The primary security check is the backend validation against the database.
- **Secure Backend API:** Protect your API endpoints (authentication/authorization if needed for management APIs, rate limiting, input validation).
- **Webhook Security:** Verify the authenticity of webhooks received from payment gateways (e.g., using signature verification).
- **Database Security:** Follow best practices for securing your database (strong credentials, network security, regular backups).
- **HTTPS Everywhere:** Ensure all communications (widget assets, API calls, customer dashboard) use HTTPS.

## 7. Configurable Rule-Based Conversation Flow Management (Non-AI)

To provide a versatile chatbot solution adaptable to various businesses without relying on AI, the system will support client-configurable, rule-based conversation flows. This allows each client to define their own structured dialogues, questions, and pre-set user response options.

### Core Components & Workflow:

1.  **Client-Specific Flows:**

    - Each client (identified by their `client_key`) can create and manage one or more distinct conversation flows tailored to their business needs (e.g., sales inquiries, FAQs, support).

2.  **Database Structure for Flows:**

    - The User Database will be extended with tables/collections to store these flows:
      - `ConversationFlows`: Links flows to clients and defines a starting point (`start_node_id`).
      - `ConversationNodes`: Represents individual steps or messages from the bot within a flow. Each node contains the bot's message and its type (e.g., greeting, question with options).
      - `UserOptions`: Defines clickable button responses for "question" nodes. Each option includes display text and dictates the next `ConversationNode` to transition to, or provides a direct answer.

3.  **Customer Dashboard - Flow Builder:**

    - Clients will use a dedicated section in the Customer Dashboard (SaaS Frontend) to:
      - Visually or through forms, construct their conversation flows: define bot messages, create user reply buttons, and link them to subsequent bot messages/nodes or final answers.
      - Manage multiple flows, edit existing ones, and define start/end points.
      - The number of nodes/questions per flow can be limited based on the client's subscription plan.

4.  **Backend API - Serving Flows:**

    - A new API endpoint (e.g., `GET /api/widget/conversation-flow?clientKey=<CLIENT_KEY>`) will allow the widget to fetch the client's active/default conversation flow.
    - The backend retrieves the structured flow (nodes, options) from the database based on the validated `clientKey` and returns it as JSON to the widget.

5.  **Chatbot Widget - Flow Execution:**
    - Upon initialization, the widget fetches the conversation flow JSON from the backend.
    - It maintains the current state (e.g., `currentNodeId`).
    - It renders the `bot_message` for the current node.
    - If the node has `UserOptions`, it renders them as clickable buttons.
    - When a user clicks an option, the widget:
      - Displays the user's selection.
      - Transitions to the `next_node_id` specified by the selected option (or displays a `direct_answer`).
      - Re-renders with the content of the new current node.
    - The widget navigates this pre-defined tree/graph structure without any AI or NLP.

### Benefits:

- **High Customization:** Each business can create highly relevant, guided conversations.
- **No AI Dependency:** Simpler to build, predictable behavior, and lower operational costs initially.
- **Client Self-Service:** Clients manage their own chatbot content ("manual prompting") via the dashboard.
- **Controlled Complexity:** Conversation depth/breadth can be tied to subscription tiers.
