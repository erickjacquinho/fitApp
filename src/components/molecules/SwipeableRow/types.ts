import { LucideIcon } from 'lucide-react-native';
import { ThemeColors } from '@/tokens/theme';
import { Trash2, Pencil, Archive, Share2, Copy, Pin } from 'lucide-react-native';

export type SwipeFeature = 'delete' | 'edit' | 'archive' | 'share' | 'duplicate' | 'pin';

export type ThemeColorToken = Exclude<keyof ThemeColors, 'chartSeries'>;

export interface FeatureRegistryEntry {
  icon: LucideIcon;
  label: string;
  bgToken: ThemeColorToken;
  fgToken: ThemeColorToken;
  autoTrigger?: boolean;
  closeOnAutoTrigger?: boolean;
}

export const FEATURE_REGISTRY: Record<SwipeFeature, FeatureRegistryEntry> = {
  delete:    { icon: Trash2,    label: 'Excluir',    bgToken: 'error',   fgToken: 'textInverse', autoTrigger: true },
  edit:      { icon: Pencil,    label: 'Editar',     bgToken: 'primary', fgToken: 'textInverse' },
  archive:   { icon: Archive,   label: 'Arquivar',   bgToken: 'warning', fgToken: 'textInverse' },
  share:     { icon: Share2,    label: 'Compartilhar', bgToken: 'info', fgToken: 'textInverse' },
  duplicate: { icon: Copy,      label: 'Duplicar',   bgToken: 'success', fgToken: 'textInverse' },
  pin:       { icon: Pin,       label: 'Fixar',      bgToken: 'warning', fgToken: 'textInverse' },
};

export const ACTION_WIDTH = 72;
export const AUTO_TRIGGER_PX = 200;
