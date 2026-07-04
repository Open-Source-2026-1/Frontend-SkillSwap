import { Quiz, QuizQuestion } from '../domain/model/quiz.entity';
import { CreateQuizRequest } from '../domain/model/create-quiz.request';
import { CreateQuizResource, QuestionResource, QuizResource } from './quizzes-response';

export class QuizAssembler {
    toEntityFromResource(resource: QuizResource): Quiz {
        return new Quiz({
            id: resource.id,
            title: resource.title,
            course: resource.course,
            createdBy: resource.createdBy,
            tutorId: resource.tutorId,
            questions: resource.questions.map(this.toQuestionFromResource),
            createdAt: resource.createdAt,
            updatedAt: resource.updatedAt,
        });
    }

    toEntitiesFromResources(resources: QuizResource[]): Quiz[] {
        return resources.map((resource) => this.toEntityFromResource(resource));
    }

    toResourceFromCreateRequest(request: CreateQuizRequest): CreateQuizResource {
        return {
            title: request.title,
            course: request.course,
            createdBy: request.createdBy,
            tutorId: request.tutorId ?? null,
            questions: request.questions.map(this.toQuestionResource),
        };
    }

    private toQuestionFromResource(resource: QuestionResource): QuizQuestion {
        return {
            text: resource.text,
            options: resource.options,
            correctIndex: resource.correctIndex,
        };
    }

    private toQuestionResource(question: QuizQuestion): QuestionResource {
        return {
            text: question.text,
            options: question.options,
            correctIndex: question.correctIndex,
        };
    }
}