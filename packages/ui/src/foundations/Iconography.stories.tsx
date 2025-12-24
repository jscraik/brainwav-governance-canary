import type { Meta, StoryObj } from "@storybook/react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  CornerDownLeft,
  CornerDownRight,
  ChevronsLeft,
  ChevronsRight,
  ExternalLink,
  MoreHorizontal,
  Plus,
  Minus,
  X,
  Check,
  Search,
  Menu,
  Grid2x2,
  LayoutGrid,
  PanelLeft,
  PanelRight,
  PanelBottom,
  PanelsTopLeft,
  Filter,
  SortAsc,
  SlidersHorizontal,
  Settings,
  Cog,
  Wrench,
  Key,
  Shield,
  ShieldCheck,
  Lock,
  Unlock,
  Bug,
  MessageSquare,
  MessagesSquare,
  Send,
  Sparkles,
  Wand2,
  Bot,
  Cpu,
  Terminal,
  Code2,
  FileText,
  FolderTree,
  ClipboardPaste,
  Copy,
  Wand,
  RefreshCw,
  RotateCw,
  Play,
  Pause,
  Square,
  Mic,
  Camera,
  Image,
  NotebookPen,
  BookOpen,
  Star,
  Heart,
  Tag,
  Pin,
  Bell,
  AlertTriangle,
  Info,
  HelpCircle,
  Eye,
  EyeOff,
  Globe,
  Link2,
  Share2,
  Calendar,
  Clock,
  User,
  Users,
  UserCircle,
  UserPlus,
  UserMinus,
  LogIn,
  LogOut,
  Github,
  Apple,
  Windows,
  Chrome,
  Smartphone,
  Monitor,
  Laptop,
} from "lucide-react";

const meta: Meta = {
  title: "Foundations/Iconography",
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj;

type IconItem = { name: string; Icon: React.ComponentType<{ className?: string }> };

type Section = { title: string; items: IconItem[] };

const sections: Section[] = [
  {
    title: "Arrows",
    items: [
      { name: "ArrowUp", Icon: ArrowUp },
      { name: "ArrowDown", Icon: ArrowDown },
      { name: "ArrowRight", Icon: ArrowRight },
      { name: "ArrowLeft", Icon: ArrowLeft },
      { name: "CornerDownRight", Icon: CornerDownRight },
      { name: "CornerDownLeft", Icon: CornerDownLeft },
      { name: "ChevronUp", Icon: ChevronUp },
      { name: "ChevronDown", Icon: ChevronDown },
      { name: "ChevronRight", Icon: ChevronRight },
      { name: "ChevronLeft", Icon: ChevronLeft },
      { name: "ChevronsRight", Icon: ChevronsRight },
      { name: "ChevronsLeft", Icon: ChevronsLeft },
      { name: "ExternalLink", Icon: ExternalLink },
    ],
  },
  {
    title: "Interface",
    items: [
      { name: "MoreHorizontal", Icon: MoreHorizontal },
      { name: "Plus", Icon: Plus },
      { name: "Minus", Icon: Minus },
      { name: "X", Icon: X },
      { name: "Check", Icon: Check },
      { name: "Search", Icon: Search },
      { name: "Menu", Icon: Menu },
      { name: "Grid2x2", Icon: Grid2x2 },
      { name: "LayoutGrid", Icon: LayoutGrid },
      { name: "PanelLeft", Icon: PanelLeft },
      { name: "PanelRight", Icon: PanelRight },
      { name: "PanelBottom", Icon: PanelBottom },
      { name: "PanelsTopLeft", Icon: PanelsTopLeft },
      { name: "Filter", Icon: Filter },
      { name: "SortAsc", Icon: SortAsc },
      { name: "SlidersHorizontal", Icon: SlidersHorizontal },
      { name: "ClipboardPaste", Icon: ClipboardPaste },
      { name: "Copy", Icon: Copy },
      { name: "RefreshCw", Icon: RefreshCw },
      { name: "RotateCw", Icon: RotateCw },
      { name: "Eye", Icon: Eye },
      { name: "EyeOff", Icon: EyeOff },
      { name: "Info", Icon: Info },
      { name: "HelpCircle", Icon: HelpCircle },
      { name: "AlertTriangle", Icon: AlertTriangle },
      { name: "Bell", Icon: Bell },
    ],
  },
  {
    title: "Settings",
    items: [
      { name: "Settings", Icon: Settings },
      { name: "Cog", Icon: Cog },
      { name: "Wrench", Icon: Wrench },
      { name: "Key", Icon: Key },
      { name: "Shield", Icon: Shield },
      { name: "ShieldCheck", Icon: ShieldCheck },
      { name: "Lock", Icon: Lock },
      { name: "Unlock", Icon: Unlock },
      { name: "Bug", Icon: Bug },
    ],
  },
  {
    title: "Chat, Canvas & Dall·E",
    items: [
      { name: "MessageSquare", Icon: MessageSquare },
      { name: "MessagesSquare", Icon: MessagesSquare },
      { name: "Send", Icon: Send },
      { name: "Sparkles", Icon: Sparkles },
      { name: "Wand", Icon: Wand },
      { name: "Wand2", Icon: Wand2 },
      { name: "Bot", Icon: Bot },
      { name: "Cpu", Icon: Cpu },
      { name: "Terminal", Icon: Terminal },
      { name: "Code2", Icon: Code2 },
      { name: "FileText", Icon: FileText },
      { name: "FolderTree", Icon: FolderTree },
      { name: "Play", Icon: Play },
      { name: "Pause", Icon: Pause },
      { name: "Square", Icon: Square },
      { name: "Mic", Icon: Mic },
      { name: "Camera", Icon: Camera },
      { name: "Image", Icon: Image },
      { name: "NotebookPen", Icon: NotebookPen },
    ],
  },
  {
    title: "Miscellaneous",
    items: [
      { name: "BookOpen", Icon: BookOpen },
      { name: "Star", Icon: Star },
      { name: "Heart", Icon: Heart },
      { name: "Tag", Icon: Tag },
      { name: "Pin", Icon: Pin },
      { name: "Globe", Icon: Globe },
      { name: "Link2", Icon: Link2 },
      { name: "Share2", Icon: Share2 },
      { name: "Calendar", Icon: Calendar },
      { name: "Clock", Icon: Clock },
    ],
  },
  {
    title: "Account & User",
    items: [
      { name: "User", Icon: User },
      { name: "Users", Icon: Users },
      { name: "UserCircle", Icon: UserCircle },
      { name: "UserPlus", Icon: UserPlus },
      { name: "UserMinus", Icon: UserMinus },
      { name: "LogIn", Icon: LogIn },
      { name: "LogOut", Icon: LogOut },
    ],
  },
  {
    title: "Platform",
    items: [
      { name: "Github", Icon: Github },
      { name: "Apple", Icon: Apple },
      { name: "Windows", Icon: Windows },
      { name: "Chrome", Icon: Chrome },
      { name: "Monitor", Icon: Monitor },
      { name: "Laptop", Icon: Laptop },
      { name: "Smartphone", Icon: Smartphone },
    ],
  },
];

export const PublicComponents: Story = {
  render: () => (
    <div className="min-h-dvh bg-[#f7f7f7] text-black" style={{ fontFamily: "var(--cg-font-family-web)" }}>
      <div className="mx-auto max-w-[1200px] px-10 py-12">
        <div className="flex items-center gap-3 text-sm font-semibold tracking-wide uppercase">
          <span>Iconography</span>
        </div>
        <div className="mt-3 h-px w-full bg-black" />

        <div className="mt-6 text-4xl font-semibold">Iconography</div>

        <div className="mt-10 text-xs font-semibold uppercase tracking-widest">Public component(s)</div>
        <div className="mt-3 h-px w-full bg-black" />

        <div className="mt-8 space-y-8">
          {sections.map((section) => (
            <section key={section.title}>
              <div className="text-base font-semibold">{section.title}</div>
              <div className="mt-4 grid grid-cols-6 gap-4 md:grid-cols-10">
                {section.items.map(({ name, Icon }) => (
                  <div key={name} className="flex items-center justify-center">
                    <Icon className="h-5 w-5" />
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  ),
};
