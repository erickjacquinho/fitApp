export interface FeedbackState {
  visible: boolean;
  title: string;
  description: string;
  isError: boolean;
}

export interface ControlledPopupState<T = string> {
  visible: boolean;
  targetId: T | null;
}

export interface BaseDialogProps {
  visible: boolean;
  onClose: () => void;
}
