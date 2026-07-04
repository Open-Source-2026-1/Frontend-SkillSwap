import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ChatFileType } from './chat-file-message';

const CLOUDINARY_CLOUD_NAME = 'dgs2up2vz';
const CLOUDINARY_UPLOAD_PRESET = 'skillswap_unsigned';
const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/auto/upload`;

const MAX_FILE_SIZE_BYTES = 8 * 1024 * 1024; // 8MB
const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/webp', 'image/gif', 'application/pdf'];

interface CloudinaryResponse {
    secure_url: string;
    resource_type: string;
    format: string;
    original_filename: string;
}

export interface UploadedFile {
    url: string;
    fileType: ChatFileType;
    fileName: string;
}


@Injectable({
    providedIn: 'root',
})
export class CloudinaryUploadService {
    constructor(private http: HttpClient) {}

    validateFile(file: File): string | null {
        if (!ALLOWED_TYPES.includes(file.type)) {
            return 'Solo se permiten imágenes (PNG, JPG, WEBP, GIF) o archivos PDF.';
        }
        if (file.size > MAX_FILE_SIZE_BYTES) {
            return 'El archivo no puede pesar más de 8MB.';
        }
        return null;
    }

    upload(file: File): Observable<UploadedFile> {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

        return this.http.post<CloudinaryResponse>(CLOUDINARY_UPLOAD_URL, formData).pipe(
            map((response) => ({
                url: response.secure_url,
                fileType: this.resolveFileType(response),
                fileName: response.original_filename + (response.format ? `.${response.format}` : ''),
            })),
            catchError(() =>
                throwError(() => new Error('No se pudo subir el archivo. Intenta de nuevo.')),
            ),
        );
    }

    private resolveFileType(response: CloudinaryResponse): ChatFileType {
        if (response.resource_type === 'image') return 'image';
        if (response.format === 'pdf') return 'pdf';
        return 'other';
    }
}