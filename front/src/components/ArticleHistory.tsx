import { Calendar, Clock, ExternalLink, Trash2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

interface HistoryItem {
  id: string;
  title: string;
  category: string;
  analyzedAt: string;
  readingTime: number;
  difficulty: 'easy' | 'medium' | 'hard';
  url?: string;
}

interface ArticleHistoryProps {
  items: HistoryItem[];
  onItemClick: (id: string) => void;
  onItemDelete: (id: string) => void;
}

export function ArticleHistory({ items, onItemClick, onItemDelete }: ArticleHistoryProps) {
  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return '쉬움';
      case 'medium': return '보통';
      case 'hard': return '어려움';
      default: return '보통';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (items.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>분석 기록</CardTitle>
          <CardDescription>아직 분석한 기사가 없습니다</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>첫 번째 기사를 분석해보세요!</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>분석 기록</CardTitle>
        <CardDescription>
          이전에 분석한 기사들을 다시 확인할 수 있습니다
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="border rounded-lg p-4 hover:bg-muted/50 transition-colors cursor-pointer"
              onClick={() => onItemClick(item.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-2">
                  <h3 className="font-medium leading-tight line-clamp-2">
                    {item.title}
                  </h3>
                  
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(item.analyzedAt).toLocaleDateString('ko-KR')}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{item.readingTime}분</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-xs">
                      {item.category}
                    </Badge>
                    <Badge className={`${getDifficultyColor(item.difficulty)} text-xs`}>
                      {getDifficultyLabel(item.difficulty)}
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center space-x-2 ml-4">
                  {item.url && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(item.url, '_blank');
                      }}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onItemDelete(item.id);
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}