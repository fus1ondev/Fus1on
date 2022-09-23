import type { Root } from 'hast';
import type { Plugin } from 'unified';

import { visit } from 'unist-util-visit';

import path from 'path';

import { getOptimizedImageSrc } from './getOptimizedImageSrc';

import sharp_service from '../../node_modules/@astrojs/image/dist/loaders/sharp.js';

interface RehypeAstroImageProps {
  maxHeight?: number;
  maxWidth?: number;
}

export const rehypeAstroImageMd: Plugin<
  [RehypeAstroImageProps | never],
  Root
> = ({ maxHeight, maxWidth }) => {
  return async (tree, file) => {
    // HACK: This is a hack that heavily relies on `getImage`'s internals :(
    globalThis.astroImage = {
      loader: sharp_service ?? globalThis.astroImage?.loader,
    };

    let imgNodes: any[] = [];
    visit(tree, (node: any) => {
      if (node.tagName === 'img') {
        imgNodes.push(node);
      }
    });

    await Promise.all(
      imgNodes.map(async (node) => {
        const slug = path.dirname(file.path).match(/(?<=content\/).*/)![0];
        node.properties.src = getOptimizedImageSrc(slug, node.properties.src, maxWidth, maxHeight);
      })
    );
  };
};
