export interface LogoPosition {
  id: string;
  file: File | null;
  prominence: 'small' | 'medium' | 'large';
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';
}

export interface ThumbnailText {
  id: string;
  text: string;
  size: 'small' | 'medium' | 'large';
  color: string;
  position: 'top' | 'middle' | 'bottom';
}