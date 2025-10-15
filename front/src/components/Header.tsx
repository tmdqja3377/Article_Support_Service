import { BookOpen, User, Settings, Home } from "lucide-react";
import { Button } from "./ui/button";

export function Header() {
  return (
    <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-primary" />
            <div>
              <h1 className="font-semibold text-xl">AI Reader</h1>
              <p className="text-sm text-muted-foreground">똑똑한 기사 독해 도우미</p>
            </div>
          </div>
          
          <nav className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="flex items-center space-x-2">
              <Home className="h-4 w-4" />
              <span>홈</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex items-center space-x-2">
              <Settings className="h-4 w-4" />
              <span>설정</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span>프로필</span>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}