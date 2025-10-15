import { useState } from "react";
import { Clock, Tag, BookOpen, CheckCircle, FileText, MessageCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ScrollArea } from "./ui/scroll-area";
import { ArticleChat } from "./ArticleChat";
import { ImportantWords } from "./ImportantWords";
import { TextSelectionPopup } from "./TextSelectionPopup";

interface ImportantWord {
  word: string;
  frequency: number;
  importance: 'high' | 'medium' | 'low';
  context: string;
}

interface AnalysisData {
  title: string;
  summary: string;
  fullText: string;
  keyPoints: string[];
  keywords: string[];
  importantWords: ImportantWord[];
  readingTime: number;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  sentiment: 'positive' | 'neutral' | 'negative';
}

interface AnalysisResultProps {
  data: AnalysisData;
  onTextSelection: (text: string) => void;
  selectedTextForQuestion: string;
  onClearSelectedText: () => void;
}

export function AnalysisResult({ 
  data, 
  onTextSelection, 
  selectedTextForQuestion, 
  onClearSelectedText 
}: AnalysisResultProps) {
  const [localSelectedText, setLocalSelectedText] = useState("");
  const [selectionPosition, setSelectionPosition] = useState({ x: 0, y: 0 });
  const [currentTab, setCurrentTab] = useState("summary");

  const handleTextSelect = (e: React.MouseEvent<HTMLDivElement>) => {
    const selection = window.getSelection();
    const selectedText = selection?.toString().trim();
    
    if (selectedText && selectedText.length > 0) {
      const range = selection?.getRangeAt(0);
      const rect = range?.getBoundingClientRect();
      
      if (rect) {
        setLocalSelectedText(selectedText);
        setSelectionPosition({
          x: rect.left + rect.width / 2,
          y: rect.top
        });
      }
    }
  };

  const handleAskQuestion = () => {
    if (localSelectedText) {
      onTextSelection(localSelectedText);
      setLocalSelectedText("");
      setCurrentTab("chat");
    }
  };

  const handleClosePopup = () => {
    setLocalSelectedText("");
    window.getSelection()?.removeAllRanges();
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'hard': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getDifficultyValue = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 30;
      case 'medium': return 60;
      case 'hard': return 90;
      default: return 50;
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'bg-green-100 text-green-800';
      case 'negative': return 'bg-red-100 text-red-800';
      case 'neutral': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* 기본 정보 */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="mb-2">{data.title}</CardTitle>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{data.readingTime}분 독서</span>
                </div>
                <Badge variant="outline">{data.category}</Badge>
                <Badge className={getSentimentColor(data.sentiment)}>
                  {data.sentiment === 'positive' ? '긍정적' : 
                   data.sentiment === 'negative' ? '부정적' : '중립적'}
                </Badge>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">독해 난이도</span>
                <span className="text-sm text-muted-foreground">
                  {data.difficulty === 'easy' ? '쉬움' : 
                   data.difficulty === 'medium' ? '보통' : '어려움'}
                </span>
              </div>
              <Progress value={getDifficultyValue(data.difficulty)} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 탭 컨텐츠 */}
      <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="summary" className="flex items-center space-x-2">
            <BookOpen className="h-4 w-4" />
            <span>AI 요약</span>
          </TabsTrigger>
          <TabsTrigger value="fulltext" className="flex items-center space-x-2">
            <FileText className="h-4 w-4" />
            <span>전문보기</span>
          </TabsTrigger>
          <TabsTrigger value="chat" className="flex items-center space-x-2">
            <MessageCircle className="h-4 w-4" />
            <span>질문하기</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="summary" className="space-y-6 mt-6">
          {/* AI 요약 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5 text-primary" />
                <span>AI 요약</span>
              </CardTitle>
              <CardDescription>
                기사의 핵심 내용을 간단히 정리했습니다. 텍스트를 드래그하여 AI에게 질문할 수 있습니다
              </CardDescription>
            </CardHeader>
            <CardContent onMouseUp={handleTextSelect}>
              <p className="leading-relaxed select-text cursor-text">{data.summary}</p>
            </CardContent>
          </Card>

          {/* 주요 포인트 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span>주요 포인트</span>
              </CardTitle>
              <CardDescription>
                기사에서 꼭 기억해야 할 핵심 내용입니다
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {data.keyPoints.map((point, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-sm font-medium text-primary mt-0.5">
                      {index + 1}
                    </div>
                    <p className="leading-relaxed">{point}</p>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* 중요 단어 */}
          <ImportantWords words={data.importantWords} />

          {/* 키워드 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Tag className="h-5 w-5 text-primary" />
                <span>키워드</span>
              </CardTitle>
              <CardDescription>
                기사의 주요 키워드를 추출했습니다
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {data.keywords.map((keyword, index) => (
                  <Badge key={index} variant="secondary" className="text-sm">
                    {keyword}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fulltext" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-primary" />
                <span>기사 전문</span>
              </CardTitle>
              <CardDescription>
                원본 기사의 전체 내용을 확인하세요. 텍스트를 드래그하여 AI에게 질문할 수 있습니다
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px] w-full rounded-md border p-4">
                <div className="space-y-4" onMouseUp={handleTextSelect}>
                  {data.fullText.split('\\n\\n').map((paragraph, index) => (
                    <p key={index} className="leading-relaxed select-text cursor-text">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="chat" className="mt-6">
          <ArticleChat 
            articleTitle={data.title} 
            initialQuestion={selectedTextForQuestion}
            onQuestionUsed={onClearSelectedText}
          />
        </TabsContent>
      </Tabs>

      <TextSelectionPopup
        selectedText={localSelectedText}
        position={selectionPosition}
        onAskQuestion={handleAskQuestion}
        onClose={handleClosePopup}
      />
    </div>
  );
}
