import { defineConfig } from 'astro/config';

import image from "@astrojs/image";
import compress from "astro-compress";

import copy from 'rollup-plugin-copy';

import math from 'remark-math';
import emoji from 'remark-emoji';
// import codeTitle from 'remark-code-titles';
import katex from 'rehype-katex';
import { rehypeAstroImageMd } from './src/utils/rehype-astro-image-md';

// https://astro.build/config
export default defineConfig({
  integrations: [image(), compress()],
  vite: {
    plugins: [
      copy({
        hook: 'options',
        flatten: false,
        targets: [
          {
            src: ['content/**/*', '!**/*.md'],
            dest: 'public/images',
            expandDirectories: true,
            onlyFiles: true,
          }
        ],
        verbose: true
      })
    ]
  },
  markdown: {
    remarkPlugins: [math, /*emoji, codeTitle*/],
    rehypePlugins: [
      katex, 
      [
        rehypeAstroImageMd,
        {
          maxHeight: 768,
          maxWidth: 768,
        }
      ],
    ],
    syntaxHighlight: 'prism',
    extendDefaultPlugins: true
  },
});
