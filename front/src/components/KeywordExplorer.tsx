import { useState } from "react";
import { Hash } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "./ui/badge";

interface KeywordCategory {
  name: string;
  icon: string;
  keywords: string[];
  color: string;
}

interface KeywordExplorerProps {
  onArticleSelect: (keyword: string) => void;
}

const keywordCategories: KeywordCategory[] = [
  {
    name: "기술/AI",
    icon: "🤖",
    keywords: [
      "인공지능",
      "머신러닝",
      "딥러닝",
      "ChatGPT",
      "자율주행",
      "블록체인",
      "메타버스",
      "NFT",
    ],
    color: "bg-blue-200 text-blue-900 hover:bg-blue-300",
  },
  {
    name: "경제/비즈니스",
    icon: "💼",
    keywords: [
      "주식",
      "투자",
      "스타트업",
      "경제성장",
      "금리",
      "부동산",
      "cryptocurrency",
      "ESG",
    ],
    color: "bg-green-200 text-green-900 hover:bg-green-300",
  },
  {
    name: "사회/정치",
    icon: "🏛️",
    keywords: [
      "정치개혁",
      "사회변화",
      "청년정책",
      "복지",
      "교육",
      "의료",
      "환경정책",
      "국제관계",
    ],
    color: "bg-purple-200 text-purple-900 hover:bg-purple-300",
  },
  {
    name: "문화/엔터",
    icon: "🎭",
    keywords: [
      "K-POP",
      "드라마",
      "영화",
      "게임",
      "웹툰",
      "한류",
      "문화콘텐츠",
      "OTT",
    ],
    color: "bg-pink-200 text-pink-900 hover:bg-pink-300",
  },
  {
    name: "과학/환경",
    icon: "🔬",
    keywords: [
      "기후변화",
      "신재생에너지",
      "우주",
      "바이오",
      "의학",
      "환경보호",
      "탄소중립",
      "지속가능성",
    ],
    color: "bg-emerald-200 text-emerald-900 hover:bg-emerald-300",
  },
  {
    name: "라이프스타일",
    icon: "🌟",
    keywords: [
      "건강",
      "운동",
      "요리",
      "여행",
      "패션",
      "뷰티",
      "반려동물",
      "취미",
    ],
    color: "bg-orange-200 text-orange-900 hover:bg-orange-300",
  },
];

export function KeywordExplorer({ onArticleSelect }: KeywordExplorerProps) {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  return (
    <div className="sticky top-[64px] z-40 bg-white border-b shadow-sm">
      {/* 상단 카테고리 바 */}
      <nav className="flex justify-center flex-wrap gap-x-20 gap-y-4 py-4 text-[15px] font-medium text-gray-700">
        {keywordCategories.map((category) => (
          <div
            key={category.name}
            className="relative group"
            onMouseEnter={() => setHoveredCategory(category.name)}
            onMouseLeave={() => setHoveredCategory(null)}
          >
            <button className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 hover:text-primary transition">
              <span className="text-lg">{category.icon}</span>
              <span>{category.name}</span>
            </button>

            {/* ✅ 애니메이션 적용된 드롭다운 */}
            <AnimatePresence>
              {hoveredCategory === category.name && (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute left-1/2 -translate-x-1/2 mt-3 bg-white border border-gray-200 rounded-xl shadow-lg p-4 z-50 flex flex-wrap justify-center gap-3 w-max max-w-[600px]"
                  style={{ backgroundColor: "rgba(255, 255, 255, 1)" }}
                >
                  {category.keywords.map((keyword) => (
                    <Badge
                      key={keyword}
                      className={`cursor-pointer px-3 py-1 text-sm ${category.color}`}
                      onClick={() => onArticleSelect(keyword)}
                    >
                      <Hash className="h-3 w-3 mr-1" />
                      {keyword}
                    </Badge>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </nav>
    </div>
  );
}
