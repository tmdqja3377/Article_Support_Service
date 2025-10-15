import { useState } from "react";
import { Header } from "./components/Header";
import { KeywordExplorer } from "./components/KeywordExplorer";
import { ArticleInput } from "./components/ArticleInput";
import { AnalysisResult } from "./components/AnalysisResult";
import { ArticleHistory } from "./components/ArticleHistory";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { toast } from "sonner@2.0.3";

// Mock data for demonstration
const mockAnalysisData = {
  title: "인공지능이 바꾸는 미래의 교육",
  summary:
    "인공지능 기술이 교육 분야에 혁신을 가져오고 있습니다. 맞춤형 학습, 자동 평가, 가상 튜터 등의 기능을 통해 학습자 개개인의 수준과 속도에 맞는 교육이 가능해지고 있으며, 교사들의 업무 효율성도 크게 향상되고 있습니다. 하지만 기술 도입 과정에서 발생할 수 있는 문제점들도 함께 고려해야 할 필요가 있습니다.",
  fullText: `인공지능이 바꾸는 미래의 교육

교육 현장에서 인공지능(AI) 기술의 도입이 본격화되면서, 전통적인 교육 방식에 혁신적인 변화가 일어나고 있다. 특히 맞춤형 학습, 자동화된 평가 시스템, 그리고 가상 AI 튜터의 등장은 교육의 패러다임을 근본적으로 바꾸고 있다.

가장 주목받는 변화는 맞춤형 학습 시스템이다. AI는 학습자 개개인의 학습 패턴, 이해도, 학습 속도를 실시간으로 분석하여 최적화된 학습 경로를 제공한다. 예를 들어, 수학 문제를 풀 때 학생이 어떤 부분에서 어려움을 겪는지 파악하고, 그에 맞는 추가 문제나 설명을 자동으로 제공하는 것이다. 이는 획일적인 교육에서 벗어나 진정한 개별 맞춤 교육을 가능하게 한다.

자동화된 평가 시스템 또한 교육 현장에 큰 변화를 가져오고 있다. AI는 객관식뿐만 아니라 서술형 답안까지 정확하게 채점할 수 있게 되었다. 이는 교사들의 업무 부담을 크게 줄여주는 동시에, 학생들에게는 즉각적인 피드백을 제공한다. 더 나아가 AI는 단순한 정답 여부뿐만 아니라 학습자의 사고 과정까지 분석하여 더욱 구체적이고 유용한 피드백을 제공할 수 있다.

가상 AI 튜터의 등장은 또 다른 혁신이다. 24시간 언제든지 학습자의 질문에 답변하고, 개별 학습 계획을 세우며, 학습 동기를 유지할 수 있도록 도와주는 AI 튜터들이 개발되고 있다. 이들은 인간 교사의 역할을 대체하는 것이 아니라, 보완하는 역할을 하며 더욱 풍부한 학습 환경을 제공한다.

하지만 이러한 기술적 진보에도 불구하고 여러 과제들이 남아있다. 데이터 개인정보 보호 문제는 가장 시급한 과제 중 하나다. 학습자의 모든 학습 데이터가 AI 시스템에 저장되고 분석되는 과정에서 개인정보 유출의 위험이 있기 때문이다. 또한 AI 기술에 대한 접근성 격차로 인해 디지털 교육 불평등이 심화될 수 있다는 우려도 있다.

기술적 한계도 여전히 존재한다. AI는 정량적 데이터 분석에는 뛰어나지만, 창의성이나 비판적 사고와 같은 고차원적 사고 능력을 평가하고 교육하는 데는 한계가 있다. 따라서 AI 기술의 도입과 함께 인간 교사의 역할 재정의와 새로운 교육 방법론의 개발이 필요하다.

결론적으로, AI 기술은 교육 분야에 놀라운 가능성을 제시하고 있지만, 성공적인 도입을 위해서는 기술적 완성도 향상과 함께 윤리적, 사회적 고려사항들을 신중하게 다뤄야 할 것이다. 미래의 교육은 AI와 인간이 협력하는 새로운 모델로 발전해 나갈 것으로 전망된다.`,
  keyPoints: [
    "AI 기반 맞춤형 학습 시스템이 학습자의 개별 수준을 파악하여 최적화된 학습 경로를 제공합니다",
    "자동화된 평가 시스템으로 교사의 업무 부담이 줄어들고 실시간 피드백이 가능해집니다",
    "가상 AI 튜터가 24시간 학습 지원을 제공하여 언제든지 도움을 받을 수 있습니다",
    "데이터 개인정보 보호와 기술 격차 해소 등의 과제가 여전히 남아있습니다",
  ],
  keywords: [
    "인공지능",
    "교육혁신",
    "맞춤형학습",
    "자동평가",
    "가상튜터",
    "에듀테크",
    "디지털교육",
  ],
  importantWords: [
    {
      word: "인공지능",
      frequency: 8,
      importance: "high" as const,
      context: "교육 분야의 핵심 기술로 언급됨",
    },
    {
      word: "맞춤형학습",
      frequency: 5,
      importance: "high" as const,
      context: "AI 교육의 주요 혜택으로 강조됨",
    },
    {
      word: "패러다임",
      frequency: 3,
      importance: "medium" as const,
      context: "교육 방식의 근본적 변화를 설명",
    },
    {
      word: "디지털전환",
      frequency: 4,
      importance: "medium" as const,
      context: "교육계의 기술 도입 과정",
    },
    {
      word: "자동화",
      frequency: 3,
      importance: "medium" as const,
      context: "평가 시스템의 주요 특징",
    },
    {
      word: "피드백",
      frequency: 4,
      importance: "low" as const,
      context: "AI 시스템의 장점으로 언급",
    },
    {
      word: "개인정보보호",
      frequency: 2,
      importance: "low" as const,
      context: "AI 교육 도입의 과제로 제시",
    },
    {
      word: "창의성",
      frequency: 2,
      importance: "low" as const,
      context: "AI의 한계로 언급된 영역",
    },
  ],
  readingTime: 8,
  difficulty: "medium" as const,
  category: "교육/기술",
  sentiment: "positive" as const,
};

const mockHistoryItems = [
  {
    id: "1",
    title: "인공지능이 바꾸는 미래의 교육",
    category: "교육/기술",
    analyzedAt: "2024-12-20",
    readingTime: 8,
    difficulty: "medium" as const,
    url: "https://example.com/ai-education",
  },
  {
    id: "2",
    title: "기후변화와 지속가능한 발전",
    category: "환경/과학",
    analyzedAt: "2024-12-19",
    readingTime: 12,
    difficulty: "hard" as const,
    url: "https://example.com/climate-change",
  },
  {
    id: "3",
    title: "소상공인을 위한 디지털 마케팅 전략",
    category: "비즈니스",
    analyzedAt: "2024-12-18",
    readingTime: 6,
    difficulty: "easy" as const,
  },
];

export default function App() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasAnalysis, setHasAnalysis] = useState(false);
  const [currentAnalysis, setCurrentAnalysis] = useState(mockAnalysisData);
  const [historyItems, setHistoryItems] = useState(mockHistoryItems);
  const [activeTab, setActiveTab] = useState("home");
  const [selectedTextForQuestion, setSelectedTextForQuestion] =
    useState<string>("");

  const handleAnalyze = async (content: string, type: "url" | "text") => {
    setIsAnalyzing(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setCurrentAnalysis(mockAnalysisData);
      setHasAnalysis(true);
      setActiveTab("result");
      toast.success("분석이 완료되었습니다!");
    } catch (error) {
      toast.error("분석 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleArticleSelect = (title: string) => {
    setCurrentAnalysis({ ...mockAnalysisData, title });
    setHasAnalysis(true);
    setActiveTab("analyze");
    toast.success("기사가 선택되었습니다! 분석을 진행해보세요.");
  };

  const handleHistoryItemClick = (id: string) => {
    const item = historyItems.find((item) => item.id === id);
    if (item) {
      setCurrentAnalysis(mockAnalysisData);
      setHasAnalysis(true);
      setActiveTab("result");
    }
  };

  const handleHistoryItemDelete = (id: string) => {
    setHistoryItems((prev) => prev.filter((item) => item.id !== id));
    toast.success("기록이 삭제되었습니다.");
  };

  const handleTextSelection = (selectedText: string) => {
    setSelectedTextForQuestion(selectedText);
    setActiveTab("result");
    toast.success("선택한 텍스트가 질문하기로 전달되었습니다!");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* 상단 영역 */}
      <Header />
      <KeywordExplorer onArticleSelect={handleArticleSelect} />

      {/* 메인 콘텐츠 */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="mb-2">AI 기사 독해 서비스</h2>
            <p className="text-muted-foreground">
              어려운 기사도 쉽게! AI가 도와주는 스마트 독해
            </p>
          </div>

          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-4 max-w-lg mx-auto mb-8">
              <TabsTrigger value="home">홈</TabsTrigger>
              <TabsTrigger value="analyze">분석하기</TabsTrigger>
              <TabsTrigger value="result" disabled={!hasAnalysis}>
                결과보기
              </TabsTrigger>
              <TabsTrigger value="history">기록</TabsTrigger>
            </TabsList>

            {/* ✅ 홈 탭에서 중복된 KeywordExplorer 제거 */}
            <TabsContent value="home" className="space-y-6">
              <div className="text-center text-muted-foreground py-8">
                <p>관심 있는 키워드를 선택하거나 분석 탭으로 이동해보세요.</p>
              </div>
            </TabsContent>

            <TabsContent value="analyze" className="space-y-6">
              <ArticleInput onAnalyze={handleAnalyze} isLoading={isAnalyzing} />
            </TabsContent>

            <TabsContent value="result" className="space-y-6">
              {hasAnalysis ? (
                <AnalysisResult
                  data={currentAnalysis}
                  onTextSelection={handleTextSelection}
                  selectedTextForQuestion={selectedTextForQuestion}
                  onClearSelectedText={() => setSelectedTextForQuestion("")}
                />
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <p>먼저 기사를 분석해주세요.</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="history" className="space-y-6">
              <ArticleHistory
                items={historyItems}
                onItemClick={handleHistoryItemClick}
                onItemDelete={handleHistoryItemDelete}
              />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
