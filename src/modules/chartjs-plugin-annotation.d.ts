// src/modules/chartjs-plugin-annotation.d.ts
declare module 'chartjs-plugin-annotation' {
  export interface AnnotationOptions {
    type: 'line' | 'box';
    xMin?: number | string;
    xMax?: number | string;
    yMin?: number | string;
    yMax?: number | string;
    backgroundColor?: string;
    borderColor?: string;
    borderWidth?: number;
    label?: {
      content: string;
      enabled: boolean;
      position?: 'center' | 'top' | 'left' | 'right';
    };
  }

  const annotationPlugin: any;
  export default annotationPlugin;
}
