
const QUIZ_PREFIX = '[QUIZ:';
const QUIZ_RESULT_PREFIX = '[QUIZ_RESULT:';

export function buildQuizMessage(quizId: number, title: string): string {
    return `${QUIZ_PREFIX}${quizId}] ${title}`;
}

export function buildQuizResultMessage(quizId: number, score: number): string {
    return `${QUIZ_RESULT_PREFIX}${quizId}] Obtuvo ${score.toFixed(1)}/10`;
}

export function isQuizMessage(content: string): boolean {
    return content.startsWith(QUIZ_PREFIX);
}

export function isQuizResultMessage(content: string): boolean {
    return content.startsWith(QUIZ_RESULT_PREFIX);
}

export function parseQuizMessage(content: string): { quizId: number; title: string } | null {
    const match = content.match(/^\[QUIZ:(\d+)]\s*(.*)$/);
    if (!match) return null;
    return { quizId: +match[1], title: match[2] };
}

export function parseQuizResultMessage(
    content: string,
): { quizId: number; resultText: string } | null {
    const match = content.match(/^\[QUIZ_RESULT:(\d+)]\s*(.*)$/);
    if (!match) return null;
    return { quizId: +match[1], resultText: match[2] };
}