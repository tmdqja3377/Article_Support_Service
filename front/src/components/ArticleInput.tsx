import { useState } from "react";
import { Link, FileText, Upload, Sparkles } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Label } from "./ui/label";

interface ArticleInputProps {
  onAnalyze: (content: string, type: 'url' | 'text') => void;
  isLoading?: boolean;
}

export function ArticleInput({ onAnalyze, isLoading = false }: ArticleInputProps) {
  const [urlInput, setUrlInput] = useState('');
  const [textInput, setTextInput] = useState('');

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (urlInput.trim()) {
      onAnalyze(urlInput.trim(), 'url');
    }
  };

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (textInput.trim()) {
      onAnalyze(textInput.trim(), 'text');
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center space-x-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <span>기사 분석하기</span>
        </CardTitle>
        <CardDescription>
          기사 URL을 입력하거나 텍스트를 직접 붙여넣어 AI 분석을 받아보세요
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="url" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="url" className="flex items-center space-x-2">
              <Link className="h-4 w-4" />
              <span>URL 입력</span>
            </TabsTrigger>
            <TabsTrigger value="text" className="flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <span>텍스트 입력</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="url" className="space-y-4">
            <form onSubmit={handleUrlSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="url-input">기사 URL</Label>
                <Input
                  id="url-input"
                  type="url"
                  placeholder="https://example.com/article"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              <Button 
                type="submit" 
                className="w-full" 
                disabled={!urlInput.trim() || isLoading}
              >
                {isLoading ? (
                  <>
                    <Upload className="mr-2 h-4 w-4 animate-spin" />
                    분석 중...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    AI 분석 시작
                  </>
                )}
              </Button>
            </form>
          </TabsContent>
          
          <TabsContent value="text" className="space-y-4">
            <form onSubmit={handleTextSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="text-input">기사 텍스트</Label>
                <Textarea
                  id="text-input"
                  placeholder="분석하고 싶은 기사 내용을 여기에 붙여넣으세요..."
                  rows={8}
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              <Button 
                type="submit" 
                className="w-full" 
                disabled={!textInput.trim() || isLoading}
              >
                {isLoading ? (
                  <>
                    <Upload className="mr-2 h-4 w-4 animate-spin" />
                    분석 중...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    AI 분석 시작
                  </>
                )}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}