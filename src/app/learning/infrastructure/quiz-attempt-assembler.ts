import { QuizAttempt } from '../domain/model/quiz-attempt.entity';
import { QuizAttemptStatus } from '../domain/model/quiz-attempt-status';
import { CreateQuizAttemptRequest } from '../domain/model/create-quiz-attempt.request';
import {
    CompleteQuizAttemptResource,
    CreateQuizAttemptResource,
    QuizAttemptResource,
} from './quiz-attempts-response';

export class QuizAttemptAssembler {
    toEntityFromResource(resource: QuizAttemptResource): QuizAttempt {
        return new QuizAttempt({
            id: resource.id,
            quizId: resource.quizId,
            learnerId: resource.learnerId,
            sessionId: resource.sessionId,
            answers: resource.answers ?? [],
            score: resource.score ?? 0,
            status: resource.status as QuizAttemptStatus,
            createdAt: resource.createdAt,
            updatedAt: resource.updatedAt,
        });
    }

    toEntitiesFromResources(resources: QuizAttemptResource[]): QuizAttempt[] {
        return resources.map((resource) => this.toEntityFromResource(resource));
    }

    toResourceFromCreateRequest(request: CreateQuizAttemptRequest): CreateQuizAttemptResource {
        return {
            quizId: request.quizId,
            learnerId: request.learnerId,
            sessionId: request.sessionId,
        };
    }

    toCompleteResourceFromAnswers(answers: number[]): CompleteQuizAttemptResource {
        return { answers };
    }
}