import { defineConfig } from 'astro/config';

import image from "@astrojs/image";
import compress from "astro-compress";

import math from 'remark-math';
import emoji from 'remark-emoji';
import codeTitle from 'remark-code-titles';
import katex from 'rehype-katex';

// https://astro.build/config
export default defineConfig({
  integrations: [image(), compress()],
  markdown: {
    remarkPlugins: [math, emoji, codeTitle],
    rehypePlugins: [katex],
    syntaxHighlight: 'prism',
    extendDefaultPlugins: true
  },
});
