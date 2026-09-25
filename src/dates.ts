// 日付の区切りは日本時間で揃える（UTC のままだと朝 9 時に「今日」が切り替わる）
const JST_OFFSET_MS = 9 * 60 * 60 * 1000;
const DAY_MS = 24 * 60 * 60 * 1000;

export function daysSinceEpochJST(now: Date = new Date()): number {
    return Math.floor((now.getTime() + JST_OFFSET_MS) / DAY_MS);
}

// 月曜始まりの週番号。1970-01-01 は木曜なので 3 日ずらす
export function weekIndexJST(now: Date = new Date()): number {
    return Math.floor((daysSinceEpochJST(now) + 3) / 7);
}

// 'YYYY-MM-DD'（日本時間）
export function dateKeyJST(now: Date = new Date()): string {
    return new Date(now.getTime() + JST_OFFSET_MS).toISOString().slice(0, 10);
}
