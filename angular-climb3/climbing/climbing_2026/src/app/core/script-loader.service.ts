import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ScriptLoaderService {
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly scripts = new Map<string, Promise<void>>();

  load(id: string, src: string): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) {
      return Promise.resolve();
    }

    const existing = this.document.getElementById(id) as HTMLScriptElement | null;
    if (existing) {
      return Promise.resolve();
    }

    const cached = this.scripts.get(id);
    if (cached) {
      return cached;
    }

    const promise = new Promise<void>((resolve, reject) => {
      const script = this.document.createElement('script');
      script.id = id;
      script.src = src;
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error(`Could not load ${src}`));
      this.document.body.appendChild(script);
    });

    this.scripts.set(id, promise);
    return promise;
  }
}
