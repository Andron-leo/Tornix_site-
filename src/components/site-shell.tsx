import { Link, useRouterState } from "@tanstack/react-router";
import { Download, Menu, X } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Toaster } from "sonner";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Цех" },
  { to: "/cnc", label: "Послуги" },
  { to: "/orders", label: "Як замовити" },
  { to: "/eu", label: "ЄС" },
  { to: "/calculator", label: "Калькулятор" },
] as const;

export function SiteShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="flex min-h-dvh flex-col bg-background text-foreground">
      <Toaster
        theme="dark"
        position="top-center"
        toastOptions={{
          className: "bg-card text-foreground border-border",
        }}
      />
      <header className="sticky top-0 z-40 border-b border-border/80 bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
          <Link to="/" className="shrink-0" aria-label="TORNIX CNC turning and milling">
            <Logo />
          </Link>
          <nav className="hidden items-center gap-6 lg:flex">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "text-sm tracking-wide transition-opacity duration-150 hover:opacity-80",
                  pathname === item.to ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Button asChild size="sm" variant="outline" className="hidden sm:inline-flex">
              <a href="/tornix-cnc-site.zip" download="tornix-cnc-site.zip">
                <Download className="size-4" />
                Код
              </a>
            </Button>
            <Button asChild size="sm" className="hidden sm:inline-flex">
              <Link to="/quote">Заявка</Link>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="lg:hidden"
              aria-label={open ? "Закрити меню" : "Відкрити меню"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </Button>
          </div>
        </div>
        {open ? (
          <div className="border-t border-border bg-background px-4 py-4 lg:hidden">
            <nav className="flex flex-col gap-1">
              {NAV.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="flex min-h-11 items-center text-base text-foreground"
                >
                  {item.label}
                </Link>
              ))}
              <a
                href="/tornix-cnc-site.zip"
                download="tornix-cnc-site.zip"
                onClick={() => setOpen(false)}
                className="flex min-h-11 items-center text-base"
              >
                Завантажити код
              </a>
              <Link
                to="/quote"
                onClick={() => setOpen(false)}
                className="flex min-h-11 items-center text-base"
              >
                Заявка
              </Link>
            </nav>
          </div>
        ) : null}
      </header>
      <div className="flex-1">{children}</div>
      <footer className="border-t border-border bg-card">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-4">
          <div className="md:col-span-2">
            <Logo />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              ЧПУ по кресленню: токарка, фрезер 3 осі. Фланці, втулки, осі. Україна та DAP Польща.
            </p>
          </div>
          <div>
            <p className="font-display text-sm tracking-[0.16em] text-muted-foreground">ЦЕХ</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link to="/cnc" className="hover:text-primary">
                  Токарка і фрезер
                </Link>
              </li>
              <li>
                <Link to="/orders" className="hover:text-primary">
                  Як замовити
                </Link>
              </li>
              <li>
                <Link to="/eu" className="hover:text-primary">
                  Замовникам з ЄС
                </Link>
              </li>
              <li>
                <Link to="/calculator" className="hover:text-primary">
                  Калькулятор маси
                </Link>
              </li>
              <li>
                <Link to="/quote" className="hover:text-primary">
                  Заявка
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="font-display text-sm tracking-[0.16em] text-muted-foreground">КОНТАКТ</p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>Україна · виробництво ЧПУ</li>
              <li>Відвантаження: Україна, DAP Польща</li>
              <li>
                <Link to="/quote" className="hover:text-foreground">
                  Заявка з кресленням
                </Link>
              </li>
              <li>
                <a href="/tornix-cnc-site.zip" download="tornix-cnc-site.zip" className="hover:text-foreground">
                  Завантажити код (zip)
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border">
          <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-4 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <span>© {new Date().getFullYear()} TORNIX. Металообробка ЧПУ.</span>
            <span>Креслення PDF / STEP · відповідь робочим днем.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
