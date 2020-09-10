/// <reference types="node" />
/// <reference types="react" />

// 扩展 NodeJS 的环境变量
declare namespace NodeJS {
  interface ProcessEnv {
    /**
     * 执行环境。
     */
    readonly NODE_ENV: 'development' | 'production' | 'test';
    /**
     * 公共url
     */
    readonly PUBLIC_URL: string;
  }
}

// 引入图片

declare module '*.bmp' {
  /**
   * bmp 图片路径
   */
  const src: string;
  export default src;
}

declare module '*.gif' {
  /**
   * gif 图片路径
   */
  const src: string;
  export default src;
}

declare module '*.jpg' {
  /**
   * jpg 图片路径
   */
  const src: string;
  export default src;
}

declare module '*.jpeg' {
  /**
   * jpeg 图片路径
   */
  const src: string;
  export default src;
}

declare module '*.png' {
  /**
   * png 图片路径
   */
  const src: string;
  export default src;
}

declare module '*.webp' {
  /**
   * webp 图片路径
   */
  const src: string;
  export default src;
}

// 引入模块 css

declare module '*.module.css' {
  /**
   * 模块 css 解析结果。
   */
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.module.scss' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.module.sass' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

// 引入 svg 图标
declare module '*.svg' {
  import * as React from 'react';

  export const ReactComponent: React.FunctionComponent<React.SVGProps<
    SVGSVGElement
  >>;

  const src: string;
  export default src;
}

interface WorkerLoader {
  new (): Worker;
}

/**
 * webworker模块
 */
declare module '*.worker.ts' {
  const workerLoader: WorkerLoader;

  export default workerLoader;
}

declare module '*.worker.js' {
  const workerLoader: WorkerLoader;

  export default workerLoader;
}
