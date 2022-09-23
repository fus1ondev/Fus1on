import path from 'path';

/**
 * They need to be the same `getImage` with the same `globalThis` instance, thanks to the 'hack' workaround.
 */
import { getImage } from '../../node_modules/@astrojs/image';
import {getImageSize} from './get-image-size';
import {fileURLToPath} from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const getOptimizedImageSrc = async (slug: string, fileName: string, maxWidth: number | undefined, maxHeight: number | undefined) => {
  console.log(__dirname)
  const filePathDir = path.resolve(/*__dirname,*/ './public/images/', slug);

  // TODO: How should remote images be handled?
  const dimensions = getImageSize(fileName, filePathDir) || {
    height: undefined,
    width: undefined,
  };

  // TODO: Remote images?
  if (!dimensions.height || !dimensions.width) return;

  const imgRatioHeight = dimensions.height / dimensions.width;
  const imgRatioWidth = dimensions.width / dimensions.height;
  if (maxHeight && dimensions.height > maxHeight) {
    dimensions.height = maxHeight;
    dimensions.width = maxHeight * imgRatioWidth;
  }

  if (maxWidth && dimensions.width > maxWidth) {
    dimensions.width = maxWidth;
    dimensions.height = maxWidth * imgRatioHeight;
  }

  const imgProps = await getImage({
    src: `/images/${slug}/${fileName}`,
    height: dimensions.height,
    width: dimensions.width,
    format: 'webp',
  });

  return imgProps.src;
}
