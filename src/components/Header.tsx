import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { Translations } from '../types';

interface Props {
  t: Translations;
  onSwitchLang: () => void;
  onExport: () => void;
  onSignOut?: () => void;
  onNavigateSkills?: () => void;
}

export default function Header({ t, onSwitchLang, onExport, onSignOut, onNavigateSkills }: Props) {
  return (
    <div className="bg-brand-navy px-5 pt-[22px] pb-[18px] text-white relative overflow-hidden">
      <div
        className="absolute top-0 right-0 bottom-0 w-1/2 pointer-events-none"
        style={{ background: 'linear-gradient(135deg, transparent 40%, rgba(189,217,191,0.07) 100%)' }}
      />
      <div className="relative z-10">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-[30px] font-display font-bold tracking-tight text-white m-0">
              SkillCheck
            </h1>
            <p className="text-[13px] text-brand-sage/70 font-body tracking-wide mt-0.5 mb-0">
              {t.tagline}
            </p>
          </div>

          {/* Desktop nav — hidden on mobile/tablet */}
          <div className="hidden lg:flex gap-2 items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={onSwitchLang}
              className="border border-white/20 text-white hover:bg-white/10 hover:text-white rounded-full font-bold text-[13px] font-body"
            >
              {t.langSwitch}
            </Button>
            <Button
              size="sm"
              onClick={onExport}
              className="bg-brand-amber text-brand-navy hover:bg-brand-amber/90 rounded-full font-bold text-[13px] font-body border-none"
            >
              PDF
            </Button>
            {onNavigateSkills && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onNavigateSkills}
                className="border border-white/20 text-white hover:bg-white/10 hover:text-white rounded-full font-bold text-[13px] font-body whitespace-nowrap uppercase"
              >
                {t.skillsRef}
              </Button>
            )}
            {onSignOut && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onSignOut}
                className="border border-white/20 text-white hover:bg-white/10 hover:text-white rounded-full font-bold text-[13px] font-body whitespace-nowrap uppercase"
              >
                {t.logout}
              </Button>
            )}
          </div>

          {/* Mobile/tablet nav — hamburger dropdown */}
          <div className="flex lg:hidden items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onSwitchLang}
              className="border border-white/20 text-white hover:bg-white/10 hover:text-white rounded-full font-bold text-[13px] font-body"
            >
              {t.langSwitch}
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="border border-white/20 text-white hover:bg-white/10 hover:text-white rounded-full p-2"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="bg-brand-navy border-white/20 text-white min-w-[160px]"
              >
                <DropdownMenuItem
                  onClick={onExport}
                  className="font-bold text-[13px] font-body text-brand-amber focus:bg-white/10 focus:text-brand-amber cursor-pointer"
                >
                  PDF
                </DropdownMenuItem>
                {onNavigateSkills && (
                  <>
                    <DropdownMenuSeparator className="bg-white/10" />
                    <DropdownMenuItem
                      onClick={onNavigateSkills}
                      className="font-bold text-[13px] font-body uppercase text-white focus:bg-white/10 focus:text-white cursor-pointer"
                    >
                      {t.skillsRef}
                    </DropdownMenuItem>
                  </>
                )}
                {onSignOut && (
                  <>
                    <DropdownMenuSeparator className="bg-white/10" />
                    <DropdownMenuItem
                      onClick={onSignOut}
                      className="font-bold text-[13px] font-body uppercase text-white focus:bg-white/10 focus:text-white cursor-pointer"
                    >
                      {t.logout}
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
}
