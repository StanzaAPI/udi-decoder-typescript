"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UdiDecoderClient = void 0;





class UdiDecoderClient {
  constructor(config = {}) {
    this.apiKey = config.apiKey || (typeof process !== 'undefined' ? process.env?.STANZA_API_KEY || process.env?.API_KEY || '' : '');
    this.timeoutMs = config.timeoutMs || 15000;
    this.tier = config.tier || 'sandbox';
    this.baseUrl = config.baseUrl || 'https://api.stanzaapi.com/udi-decoder';
    this.validateEndpoint = '/api/v1/decode';
    this.parseEndpoint = '/api/v1/decode';
    this.toolUrl = 'https://stanzaapi.com/tools/udi-decoder';
  }

  async request(endpoint, options = {}) {
    const cleanBase = this.baseUrl.replace(/\/+$/, '');
    const cleanPath = endpoint.replace(/^\/+/, '');
    const url = `${cleanBase}/${cleanPath}`;

    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...(this.apiKey ? { 'x-api-key': this.apiKey, 'Authorization': `Bearer ${this.apiKey}` } : {}),
      ...(options.headers || {})
    };

    let signal = options.signal;
    if (!signal && typeof AbortSignal !== 'undefined' && AbortSignal.timeout) {
      signal = AbortSignal.timeout(this.timeoutMs);
    }

    try {
      const response = await fetch(url, { ...options, headers, signal });
      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        data = {
          success: false,
          error: `HTTP ${response.status}: ${response.statusText || text.slice(0, 180)}`,
          code: response.status === 429 ? 'RATE_LIMITED' : response.status === 413 ? 'PAYLOAD_TOO_LARGE' : 'HTTP_ERROR',
        };
      }
      if (typeof data === 'object' && data !== null) {
        data.tool_url = data.tool_url || this.toolUrl;
        data.upgrade_url = data.upgrade_url || this.toolUrl;
      }
      return data;
    } catch (err) {
      const isTimeout = err?.name === 'TimeoutError';
      return {
        success: false,
        error: isTimeout ? `Request timed out after ${this.timeoutMs}ms` : (err?.message || 'Network request failed'),
        code: isTimeout ? 'TIMEOUT' : 'NETWORK_ERROR',
        tool_url: this.toolUrl,
        upgrade_url: this.toolUrl
      };
    }
  }

  async getHealth() {
    return this.request('/health', { method: 'GET' });
  }

  async validate(payload) {
    
    const body = typeof payload === 'string' ? JSON.stringify({ input: payload }) : JSON.stringify(payload);
    return this.request(this.validateEndpoint, {
      method: 'POST',
      body
    });
  }

  async parse(payload) {
    
    const body = typeof payload === 'string' ? JSON.stringify({ input: payload }) : JSON.stringify(payload);
    return this.request(this.parseEndpoint, {
      method: 'POST',
      body
    });
  }
}

exports.UdiDecoderClient = UdiDecoderClient;
exports.default = UdiDecoderClient;
