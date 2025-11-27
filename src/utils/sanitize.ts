import type { Config } from 'dompurify';

export interface SanitizeOptions {
  allowedTags?: string[];
  allowedAttr?: string[];
  allowDataAttr?: boolean;
  stripAll?: boolean;
}

export default class Sanitizer {

  private static readonly DEFAULT_ALLOWED_TAGS: string[] = [
    'p', 'br', 'span', 'div',
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'strong', 'em', 'b', 'i', 'u', 's', 'strike', 'del',
    'blockquote', 'code', 'pre',
    'ul', 'ol', 'li',
    'a', 'img',
    'table', 'thead', 'tbody', 'tr', 'th', 'td',
    'hr',
    'MarkdownHeader', 'MarkdownCodeBlock', 'MarkdownBlockquote', 
    'MarkdownFootnote', 'MarkdownImage', 'NuxtLink'
  ];

  private static readonly DEFAULT_ALLOWED_ATTR: string[] = [
    'href', 'src', 'alt', 'title', 'class', 'id',
    'text', 'level', 'lang', 'type', 'path', 'num', 'to'
  ];

  static async Sanitize(dirty: string, options?: SanitizeOptions): Promise<string> {
    if (!dirty || typeof dirty !== 'string') {
      return '';
    }

    if (typeof window === 'undefined') {
      return dirty;
    }

    if (options?.stripAll) {
      return this.StripAllHtml(dirty);
    }

    const { default: DOMPurify } = await import('dompurify');

    let config: Config = {
      ALLOWED_TAGS: options?.allowedTags || this.DEFAULT_ALLOWED_TAGS,
      ALLOWED_ATTR: options?.allowedAttr || this.DEFAULT_ALLOWED_ATTR,
      ALLOW_DATA_ATTR: options?.allowDataAttr ?? false,
      KEEP_CONTENT: true,
      RETURN_TRUSTED_TYPE: false,
      FORBID_TAGS: ['script', 'style', 'iframe', 'object', 'embed', 'link', 'base', 'meta', 'form'],
      FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover', 'onfocus', 'onblur', 'onchange', 'oninput'],
      ALLOW_UNKNOWN_PROTOCOLS: false,
      ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|xxx):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
    };

    try {
      return DOMPurify.sanitize(dirty, config);
    } catch (error) {
      console.error('Sanitization error:', error);
      return '';
    }
  }

  static async StripAllHtml(dirty: string): Promise<string> {
    if (!dirty || typeof dirty !== 'string') {
      return '';
    }

    if (typeof window === 'undefined') {
      return dirty;
    }

    const { default: DOMPurify } = await import('dompurify');

    const sanitized = DOMPurify.sanitize(dirty, {
      ALLOWED_TAGS: [],
      KEEP_CONTENT: true
    });

    const textarea = document.createElement('textarea');
    textarea.innerHTML = sanitized;
    return textarea.value;
  }
}