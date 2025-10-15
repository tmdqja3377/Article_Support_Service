import { useState } from "react";
import { Lightbulb, Info } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { WordDetail, getWordInfo } from "./WordDetail";

interface ImportantWord {
  word: string;
  frequency: number;
  importance: 'high' | 'medium' | 'low';
  context: string;
}

interface ImportantWordsProps {
  words: ImportantWord[];
}

export function ImportantWords({ words }: ImportantWordsProps) {
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [isWordDetailOpen, setIsWordDetailOpen] = useState(false);

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'high': return 'bg-red-100 text-red-800 hover:bg-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 hover:bg-green-200';
      default: return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };

  const getImportanceLabel = (importance: string) => {
    switch (importance) {
      case 'high': return '핵심';
      case 'medium': return '중요';
      case 'low': return '참고';
      default: return '일반';
    }
  };

  const handleWordClick = (word: string) => {
    const wordInfo = getWordInfo(word);
    if (wordInfo) {
      setSelectedWord(word);
      setIsWordDetailOpen(true);
    }
  };

  const selectedWordInfo = selectedWord ? getWordInfo(selectedWord) : null;

  // 중요도별로 단어 그룹화
  const groupedWords = words.reduce((acc, wordData) => {
    if (!acc[wordData.importance]) {
      acc[wordData.importance] = [];
    }
    acc[wordData.importance].push(wordData);
    return acc;
  }, {} as Record<string, ImportantWord[]>);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Lightbulb className="h-5 w-5 text-primary" />
            <span>중요 단어</span>
          </CardTitle>
          <CardDescription>
            기사에서 추출한 중요 단어들입니다. 단어를 클릭하면 자세한 설명과 관련 기사를 볼 수 있습니다
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* 핵심 단어 */}
            {groupedWords.high && (
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Badge variant="destructive" className="text-xs">핵심</Badge>
                  <span className="text-sm text-muted-foreground">
                    반드시 이해해야 할 중요한 개념들
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {groupedWords.high.map((wordData, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      className={`${getImportanceColor(wordData.importance)} border-2 border-transparent hover:border-current transition-all cursor-pointer`}
                      onClick={() => handleWordClick(wordData.word)}
                    >
                      <span className="flex items-center space-x-1">
                        <span>{wordData.word}</span>
                        <span className="text-xs opacity-70">({wordData.frequency}회)</span>
                        <Info className="h-3 w-3 opacity-50" />
                      </span>
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* 중요 단어 */}
            {groupedWords.medium && (
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Badge className="bg-yellow-100 text-yellow-800 text-xs">중요</Badge>
                  <span className="text-sm text-muted-foreground">
                    내용 이해에 도움이 되는 단어들
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {groupedWords.medium.map((wordData, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      className={`${getImportanceColor(wordData.importance)} border-2 border-transparent hover:border-current transition-all cursor-pointer`}
                      onClick={() => handleWordClick(wordData.word)}
                    >
                      <span className="flex items-center space-x-1">
                        <span>{wordData.word}</span>
                        <span className="text-xs opacity-70">({wordData.frequency}회)</span>
                        <Info className="h-3 w-3 opacity-50" />
                      </span>
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* 참고 단어 */}
            {groupedWords.low && (
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Badge className="bg-green-100 text-green-800 text-xs">참고</Badge>
                  <span className="text-sm text-muted-foreground">
                    추가로 알아두면 좋은 단어들
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {groupedWords.low.map((wordData, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      className={`${getImportanceColor(wordData.importance)} border-2 border-transparent hover:border-current transition-all cursor-pointer`}
                      onClick={() => handleWordClick(wordData.word)}
                    >
                      <span className="flex items-center space-x-1">
                        <span>{wordData.word}</span>
                        <span className="text-xs opacity-70">({wordData.frequency}회)</span>
                        <Info className="h-3 w-3 opacity-50" />
                      </span>
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <WordDetail
        isOpen={isWordDetailOpen}
        onClose={() => setIsWordDetailOpen(false)}
        wordInfo={selectedWordInfo}
      />
    </>
  );
}