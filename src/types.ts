export interface RephraseItem {
  id: number;
  category: string;
  situation: string;
  before: string;
  after: string;
  reason: string;
  tags: string[];
}

export type Category =
  | '日常の言葉かけ'
  | '叱る場面'
  | '褒める場面'
  | '感情の受け止め'
  | '行動の促し'
  | '危険回避';
