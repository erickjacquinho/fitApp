# Technical Design: Time Input Mask

## 1. Input Mask Logic

We will define a time formatter helper function `formatTimeInput` in `MenuScreen.tsx`:
```typescript
const formatTimeInput = (text: string): string => {
  const clean = text.replace(/\D/g, '');
  if (clean.length === 0) return '';

  let hours = clean.slice(0, 2);
  let minutes = clean.slice(2, 4);

  // Validate and clamp hour range
  if (hours.length === 2) {
    const hVal = parseInt(hours, 10);
    if (hVal > 23) {
      hours = '23';
    }
  }

  // Validate and clamp minute range
  if (minutes.length === 2) {
    const mVal = parseInt(minutes, 10);
    if (mVal > 59) {
      minutes = '59';
    }
  }

  if (clean.length > 2) {
    return `${hours}:${minutes}`;
  }
  return hours;
};
```

## 2. Event Handler Logic

We will bind a text change handler `handleTimeChange` to the input field in `MenuScreen.tsx`:
```typescript
const handleTimeChange = (text: string) => {
  // If the previous value ended in ':' and the user deleted one character, 
  // they deleted the colon. In that case, drop the colon and the preceding hour digit.
  if (editTime.endsWith(':') && text.length === editTime.length - 1) {
    setEditTime(text.slice(0, -1));
    return;
  }

  const formatted = formatTimeInput(text);
  setEditTime(formatted);
};
```

## 3. UI Component Integration

Modify the input field inside `MenuScreen.tsx`:
- Add `keyboardType="numeric"` (or `"number-pad"`).
- Set `maxLength={5}` to enforce the layout.
- Bind `onChangeText={handleTimeChange}` instead of the direct setter `setEditTime`.
- Ensure values pasted or keyed in comply with the sanitizer function.
