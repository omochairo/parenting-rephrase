export interface RephraseItem {
  id: number;
  category: string;
  situation: string;
  before: string;
  after: {
    empathy: string; // 共感：感情の受容
    action: string;  // 行動促進：ポジティブな動機づけ
    logic: string;   // 論理説明：理性への働きかけ
  };
  reason: string;
  tags: string[];
  targetAges: string[];
  moods: string[];
}

export type Category =
  | '日常の言葉かけ'
  | '叱る場面'
  | '褒める場面'
  | '感情の受け止め'
  | '行動の促し'
  | '危険回避';
