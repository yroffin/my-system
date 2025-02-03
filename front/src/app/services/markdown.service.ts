import { Injectable } from '@angular/core';
import MarkdownIt from 'markdown-it';

@Injectable({
    providedIn: 'root'
})
export class MarkdownService {
    private md: MarkdownIt;

    constructor() {
        this.md = new MarkdownIt(); // Vous pouvez passer des options à MarkdownIt ici
        // Exemple d'ajout de plugins (optionnel) :
        // this.md.use(require('markdown-it-emoji'));
        // this.md.use(require('markdown-it-highlightjs'));
    }

    render(markdown: string): string {
        return this.md.render(markdown);
    }
}
