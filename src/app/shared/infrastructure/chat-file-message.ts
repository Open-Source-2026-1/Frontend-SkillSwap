
export type ChatFileType = 'image' | 'pdf' | 'other';

const FILE_PREFIX = '[FILE:';

export function buildFileMessage(fileType: ChatFileType, fileName: string, url: string): string {
    return `${FILE_PREFIX}${fileType}] ${fileName}|${url}`;
}

export function isFileMessage(content: string): boolean {
    return content.startsWith(FILE_PREFIX);
}

export function parseFileMessage(
    content: string,
): { fileType: ChatFileType; fileName: string; url: string } | null {
    const match = content.match(/^\[FILE:(image|pdf|other)]\s*([^|]*)\|(.+)$/);
    if (!match) return null;
    return { fileType: match[1] as ChatFileType, fileName: match[2], url: match[3] };
}