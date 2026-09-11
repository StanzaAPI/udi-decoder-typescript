# FDA & EU MDR Medical Device UDI Decoder — TypeScript / JavaScript SDK

[![npm version](https://img.shields.io/npm/v/@stanzaapi/udi-decoder.svg)](https://www.npmjs.com/package/@stanzaapi/udi-decoder)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Stanza API](https://img.shields.io/badge/Powered%20by-Stanza-blue)](https://stanzaapi.com)

> Parse GS1-128, HIBCC Modulo-43, and ICCBBA ISBT 128 medical device barcodes for FDA 21 CFR 801 & EU MDR compliance.

Official, zero-dependency Node.js and TypeScript client for **FDA & EU MDR Medical Device UDI Decoder**, powered by the [Stanza Micro-API Network](https://stanzaapi.com). Delivers deterministic, sub-5ms V8 isolate execution directly to your application without 3rd-party proxies.

* 🌐 **Live Web Sandbox:** [Try interactive queries online](https://stanzaapi.com/tools/udi-decoder)
* 📚 **API Reference:** [Read complete OpenAPI specification](https://stanzaapi.com/tools/udi-decoder)
* ⚡ **Platform Overview:** [Discover the Stanza Edge Portfolio](https://stanzaapi.com)

---

## 📦 Installation

```bash
npm install @stanzaapi/udi-decoder
# or
pnpm add @stanzaapi/udi-decoder
# or
yarn add @stanzaapi/udi-decoder
```

---

## 🚀 Quickstart

```typescript
import { UdiDecoderClient } from '@stanzaapi/udi-decoder';

// Initialize client (API key optional for sandbox tier evaluation)
const client = new UdiDecoderClient({
  apiKey: process.env.STANZA_API_KEY,
});

async function main() {
  const result = await client.parse('+H12345678901/$$3260101');

  if (result.success) {
    console.log('Verification Success:', result.data);
  } else {
    console.error('Validation Error:', result.error, result.code);
  }
}

main().catch(console.error);
```

---

## 📄 Example JSON Response

```json
{
  "success": true,
  "data": {
    "valid": true,
    "issuing_agency": "HIBCC",
    "di": "H12345678901",
    "lot": "3260101"
  }
}
```

---

## ⚙️ Client Configuration Options

| Option | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `apiKey` | `string` | `process.env.STANZA_API_KEY` | Your [Stanza API Key](https://stanzaapi.com). Required for high-throughput production tiers. |
| `baseUrl` | `string` | `https://api.stanzaapi.com/udi-decoder` | Public edge API base URL. |
| `timeoutMs` | `number` | `15000` | Request timeout in milliseconds (uses native `AbortSignal.timeout`). |


---

## 🛡️ Response Envelope & Error Handling

All responses return a typed envelope:

```typescript
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  code?: 'VALIDATION_ERROR' | 'UNAUTHORIZED' | 'PAYLOAD_TOO_LARGE' | 'RATE_LIMITED' | 'INTERNAL_ERROR';
}
```

---

## 🔗 Related Resources

* [FDA & EU MDR Medical Device UDI Decoder Interactive Playground](https://stanzaapi.com/tools/udi-decoder)
* [Stanza Microservices Directory](https://stanzaapi.com)
* [Report an Issue on GitHub](https://github.com/StanzaAPI/udi-decoder-typescript/issues)

## 📄 License

MIT © Stanza — Powered by [Stanza](https://stanzaapi.com).
