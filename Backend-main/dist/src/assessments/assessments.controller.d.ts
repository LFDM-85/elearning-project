/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { AssessmentsService } from './assessments.service';
import { CreateAssessmentDto } from './dto/create-assessment.dto';
import { UpdateAssessmentDto } from './dto/update-assessment.dto';
export declare class AssessmentsController {
    private readonly assessmentsService;
    constructor(assessmentsService: AssessmentsService);
    create(createAssessmentDto: CreateAssessmentDto): Promise<import("mongoose").Document<unknown, any, import("./schema/assessments.schema").AssessmentDocument> & Omit<import("./schema/assessments.schema").Assessment & Document & Required<{
        _id: string;
    }>, never>>;
    findAll(): import("mongoose").Query<(import("mongoose").Document<unknown, any, import("./schema/assessments.schema").AssessmentDocument> & Omit<import("./schema/assessments.schema").Assessment & Document & Required<{
        _id: string;
    }>, never>)[], import("mongoose").Document<unknown, any, import("./schema/assessments.schema").AssessmentDocument> & Omit<import("./schema/assessments.schema").Assessment & Document & Required<{
        _id: string;
    }>, never>, {}, import("./schema/assessments.schema").AssessmentDocument>;
    update(id: string, updateAssessmentDto: UpdateAssessmentDto): Promise<import("mongoose").Document<unknown, any, import("./schema/assessments.schema").AssessmentDocument> & Omit<import("./schema/assessments.schema").Assessment & Document & Required<{
        _id: string;
    }>, never>>;
    addAssessment(userId: string, assessmentId: string): Promise<import("mongoose").Document<unknown, any, import("./schema/assessments.schema").AssessmentDocument> & Omit<import("./schema/assessments.schema").Assessment & Document & Required<{
        _id: string;
    }>, never>>;
    removeAssessment(userId: string, assessmentId: string): Promise<import("mongoose").Document<unknown, any, import("./schema/assessments.schema").AssessmentDocument> & Omit<import("./schema/assessments.schema").Assessment & Document & Required<{
        _id: string;
    }>, never>>;
    getAssessment(assessmentId: string): Promise<import("mongoose").Document<unknown, any, import("./schema/assessments.schema").AssessmentDocument> & Omit<import("./schema/assessments.schema").Assessment & Document & Required<{
        _id: string;
    }>, never>>;
    remove(id: string): Promise<import("mongodb").DeleteResult>;
}
