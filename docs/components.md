# Application Components

> Reference only. This file is a broad reminder list for possible components and is not an implementation rule. FitApp implementation rules live in `.agents/rules/`, especially `designsystem-guide.md` and the focused design system guideline files.

## Core Components (Every App)

### Navigation
- **Navbar** — Main navigation bar with logo, links, and actions
- **Sidebar** — Collapsible side menu for page navigation
- **BottomNav** — Bottom navigation for mobile apps

### Layout
- **Container** — Centered wrapper with maximum width
- **Card** — Container with borders, shadow, and padding for content
- **Divider** — Visual separator line
- **Header** — Page/section header
- **Footer** — Page/application footer

### Forms
- **Input** — Basic text field
- **Textarea** — Multi-line text field
- **Select/Dropdown** — Dropdown option list
- **Checkbox** — Selection checkbox
- **Radio** — Single selection within a group
- **Switch/Toggle** — On/off toggle button
- **Button** — Action button (primary, secondary, ghost)
- **Form** — Wrapper to group fields with validation

### Feedback
- **Alert/Toast** — Quick informative feedback message
- **Badge** — Numeric or text highlight indicator
- **Spinner/Loader** — Loading indicator
- **ProgressBar** — Progress bar

### Media
- **Avatar** — User profile picture
- **Image** — Image display with lazy load support
- **Icon** — Individual icon
- **IconButton** — Icon-only button

### Data
- **Table** — Data table with sorting and pagination
- **List** — Rendered item list
- **Pagination** — Pagination control

---

## Situational Components (When Needed)

### Authentication
- **LoginForm** — Login form
- **RegisterForm** — Registration form
- **ForgotPasswordForm** — Password recovery
- **PasswordInput** — Password field with visibility toggle

### User
- **ProfileCard** — Card with profile information
- **UserMenu** — Dropdown menu with user actions
- **AvatarUploader** — Profile picture upload

### Complex Data
- **DataTable** — Advanced table with filters and actions
- **Chart** — Chart for data visualization
- **Modal** — Overlay dialog for detailed actions
- **Drawer** — Sliding side panel
- **TreeView** — Navigable hierarchy

### Search & Filters
- **SearchInput** — Search field with icon
- **FilterBar** — Bar with applicable filters
- **DatePicker** — Date selection
- **RangeSlider** — Value range selector

### Content
- **Modal** — Dialog for actions/confirmations
- **ConfirmDialog** — Destructive action confirmation
- **Tooltip** — Contextual hint on hover
- **Popover** — Anchored floating content

### Special States
- **EmptyState** — State when there is no data
- **ErrorState** — Error state with message
- **LoadingState** — Loading state
- **404Page** — Page not found
- **OfflineBanner** — Offline connection indicator

### E-commerce (if applicable)
- **ProductCard** — Product card
- **Cart** — Shopping cart
- **CheckoutForm** — Checkout form
- **PriceDisplay** — Price display

### Chat/Messages (if applicable)
- **ChatBubble** — Message bubble
- **ChatList** — Conversation list
- **MessageInput** — Message input field

### Notifications
- **NotificationBell** — Notification icon with badge
- **NotificationPanel** — Notification list panel
- **PushPrompt** — Request push permission
