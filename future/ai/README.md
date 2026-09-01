# Future AI integration

Phase 1 uses `MockCustomerResponseService` only. A future provider must implement
`CustomerResponseService`; the chat UI and session workflow must not import an AI SDK.

Expected environment switch: `AI_PROVIDER=mock|openai|anthropic`. Before enabling an
external provider, add anonymisation, server-side field allowlists, audit logging, and
human review for generated evaluations.
