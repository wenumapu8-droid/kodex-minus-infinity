# KODEX−∞ PROVIDER ADAPTER CONTRACTS

Status: `CANONICAL INTERFACE SPECIFICATION / V0.1`

## Principle

Remote providers may enhance KODEX but never define whether the base experience works.

## Voice adapter

```ts
export interface VoiceRequest {
  id: string;
  nodeId: string;
  text: string;
  language: string;
  voiceProfile: 'SYSTEM' | 'ORACLE' | 'AUTHOR' | 'WITNESS' | 'CHORUS';
  speed?: number;
  pitch?: number;
  consent: boolean;
}

export interface VoiceResult {
  requestId: string;
  source: 'PRERECORDED' | 'SYSTEM_TTS' | 'REMOTE_TTS' | 'TEXT_ONLY';
  audioUrl?: string;
  durationMs?: number;
  captions: string;
  provider?: string;
  model?: string;
  generatedAt?: string;
  limitations: string[];
}

export interface VoiceProvider {
  id: string;
  available(): Promise<boolean>;
  speak(request: VoiceRequest): Promise<VoiceResult>;
  stop(): void;
}
```

Fallback order:

```text
captions
→ prerecorded canonical audio
→ system/browser TTS
→ remote TTS
```

Remote generation is never required to continue.

## Oracle adapter

```ts
export interface OracleRequest {
  id: string;
  nodeId: string;
  userText: string;
  admittedSourceIds: string[];
  admittedClaimIds: string[];
  publicSessionSummary: {
    visitedNodes: string[];
    decisions: string[];
  };
  language: string;
}

export interface OracleResponse {
  requestId: string;
  text: string;
  sourceIds: string[];
  claimIds: string[];
  truthClass: 'OBSERVED' | 'INTERPRETATION' | 'SPECULATION' | 'MYTHOPOETIC' | 'UNKNOWN';
  limitations: string[];
  provider?: string;
  model?: string;
}

export interface OracleProvider {
  id: string;
  available(): Promise<boolean>;
  respond(request: OracleRequest): Promise<OracleResponse>;
}
```

Rules:

- the adapter receives a bounded approved corpus, not raw Drive or Obsidian access;
- responses expose supporting source and claim IDs;
- `UNKNOWN` is valid;
- the Oracle must not diagnose the visitor;
- provider and model remain auditable when remote generation occurs;
- no secret belongs in client code.

## Commons adapter

```ts
export interface CommonsEntryDraft {
  type: 'TEXT' | 'DRAWING';
  text?: string;
  strokes?: unknown[];
  paletteToken: string;
  attribution: 'ANONYMOUS' | 'NAMED';
  displayName?: string;
  consent: {
    publicDisplay: boolean;
    rightsConfirmation: boolean;
    policyVersion: string;
  };
}

export interface CommonsSubmission {
  id: string;
  moderationStatus: 'PENDING' | 'APPROVED' | 'REJECTED';
  publicationStatus: 'PENDING' | 'PUBLIC' | 'HIDDEN';
  withdrawalToken?: string;
}

export interface CommonsProvider {
  submit(draft: CommonsEntryDraft): Promise<CommonsSubmission>;
  list(cursor?: string): Promise<{ entries: unknown[]; nextCursor?: string }>;
  report(entryId: string, reason: string): Promise<void>;
  withdraw(entryId: string, token: string): Promise<void>;
}
```

Local development uses an in-memory fixture provider. Production provider selection remains deferred.

## Environment variables

No provider is selected yet. Future deployment may define:

```text
KODEX_ORACLE_PROVIDER
KODEX_ORACLE_API_KEY
KODEX_TTS_PROVIDER
KODEX_TTS_API_KEY
KODEX_COMMONS_DATABASE_URL
KODEX_COMMONS_SERVICE_KEY
KODEX_MODERATION_PROVIDER
KODEX_MODERATION_API_KEY
```

These names are provisional contracts. Never commit their values.

## Failure states

```text
VOICE UNAVAILABLE → captions continue
ORACLE UNAVAILABLE → curated node content continues
COMMONS UNAVAILABLE → local private trace and export remain available
MODERATION UNAVAILABLE → submissions remain local; no silent publication
```
