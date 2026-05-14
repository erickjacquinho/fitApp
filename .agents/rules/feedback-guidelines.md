# Feedback Guidelines

Feedback must be clear, brief, and proportional to the user action.

## Loading
- Use skeletons for initial content loading.
- Use inline loading for local actions.
- Disable repeated submissions during async actions.

## Skeleton
- Skeleton layout must mirror final layout.
- Use low contrast neutral surfaces.
- Avoid skeletons for very short operations where pressed state is enough.

## Toast
- Use toast for non-blocking confirmation.
- Keep text short.
- Do not use toast as the only error explanation for form fields.

## Inline Error
- Use inline errors when the user can fix the problem in place.
- Error text must describe the fix.

## Success
- Use success feedback for completed actions, saved data, and completed goals.
- Avoid blocking success modals for repeated logging flows.

## Warning
- Use warning for near-limit or review-needed states.
- Warning is not danger. Use tomato for destructive or failed states.

## Offline
- Offline state must be calm and non-alarming.
- Explain whether data is still saved locally.

## Empty and Partial Data
- Empty state should provide next action.
- Partial data state should show available data and explain what is missing.
