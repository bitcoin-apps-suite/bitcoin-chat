// Simplified icon themes for bitcoin-chat
import { 
  Wallet, 
  Mail, 
  Music, 
  FileText, 
  HardDrive, 
  Globe, 
  Calendar, 
  Search, 
  Briefcase, 
  Table, 
  Store,
  Code2,
  TrendingUp,
  Video,
  Camera,
  MapPin,
  MessageCircle,
  Users,
  Gamepad2,
  BookOpen,
  Box,
  Palette,
  GraduationCap,
  UserCheck,
  Sparkles,
  Monitor,
  Shield,
  Building2
} from 'lucide-react'

export interface IconMapping {
  lucide: any
}

export const iconMappings: { [key: string]: IconMapping } = {
  'bitcoin-wallet': { lucide: Wallet },
  'bitcoin-email': { lucide: Mail },
  'bitcoin-music': { lucide: Music },
  'bitcoin-writer': { lucide: FileText },
  'bitcoin-code': { lucide: Code2 },
  'bitcoin-drive': { lucide: HardDrive },
  'bitcoin-calendar': { lucide: Calendar },
  'bitcoin-exchange': { lucide: TrendingUp },
  'bitcoin-search': { lucide: Search },
  'bitcoin-spreadsheet': { lucide: Table },
  'bitcoin-video': { lucide: Video },
  'bitcoin-photos': { lucide: Camera },
  'bitcoin-maps': { lucide: MapPin },
  'bitcoin-chat': { lucide: MessageCircle },
  'bitcoin-social': { lucide: Users },
  'bitcoin-games': { lucide: Gamepad2 },
  'bitcoin-books': { lucide: BookOpen },
  'bitcoin-domains': { lucide: Globe },
  'bitcoin-3d': { lucide: Box },
  'bitcoin-jobs': { lucide: Briefcase },
  'bitcoin-paint': { lucide: Palette },
  'bapps-store': { lucide: Store },
  'bitcoin-education': { lucide: GraduationCap },
  'bitcoin-identity': { lucide: UserCheck },
  'bitcoin-os': { lucide: Monitor },
  
  // Desktop icons
  'wallet': { lucide: Wallet },
  'email': { lucide: Mail },
  'music': { lucide: Music },
  'writer': { lucide: FileText },
  'drive': { lucide: HardDrive },
  'calendar': { lucide: Calendar },
  'exchange': { lucide: TrendingUp },
  'spreadsheet': { lucide: Table },
  'search': { lucide: Search },
  'identity': { lucide: UserCheck },
  'jobs': { lucide: Briefcase },
  'video': { lucide: Video },
  'education': { lucide: GraduationCap },
  'code': { lucide: Code2 },
  'paint': { lucide: Palette },
  'domains': { lucide: Globe },
  '3d': { lucide: Box },
  'photos': { lucide: Camera },
  'maps': { lucide: MapPin },
  'chat': { lucide: MessageCircle },
  'social': { lucide: Users },
  'games': { lucide: Gamepad2 },
  'books': { lucide: BookOpen },
  'senseii': { lucide: Sparkles },
  'cashboard': { lucide: TrendingUp },
  'bapps-store-right': { lucide: Store },
  'os': { lucide: Monitor },
}

export const getThemedIcon = (iconId: string, theme: string = 'lucide') => {
  const mapping = iconMappings[iconId]
  if (!mapping) {
    return Monitor // Default icon
  }
  return mapping.lucide
}

export const getCurrentTheme = (): string => {
  if (typeof window === 'undefined') return 'lucide'
  return 'lucide' // Always use lucide for simplicity
}